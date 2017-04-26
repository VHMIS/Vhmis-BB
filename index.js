var fs = require('fs');
var path = require('path');

let each = ` each = function(obj, func) {
    if (obj == null) {
        return obj;
    }

    let index = -1

    if (Array.isArray(obj)) {
        const length = obj.length
        let count = 1;
        while (++index < length) {
            if (func(obj[index], index, count) === false) {
                break;
            }
            count++;
        }
    }

    let key = Object.keys(obj)
    const length = key.length
    let count = 1;
    while (++index < length) {
        if (func(obj[key[index]], key[index], count) === false) {
            break;
        }
        count++;
    }
}`;

let parserJS = function(code, options) {
    // Parse code line has parameter
    let regex = /(if|elseif|continue|break|include) (.*)|(each) (.*) in (.*)/g;
    let found = regex.exec(code);
    if (found !== null) {
        if (found[1] == 'if') return 'if(' + found[2] + ') {';
        if (found[1] == 'elseif') return '} else if(' + found[2] + ') {';
        if (found[1] == 'continue') return 'if(' + found[2] + ') {\n return true;\n}';
        if (found[1] == 'break') return 'if(' + found[2] + ') {\n return false;\n}';
        if (found[3] == 'each') return 'each(' + found[5] + ', function(' + found[4] + ', __key__, __count__) {';
        if (found[1] == 'include') return parserInclude(found[2], options);
    }

    // Parse code line has only keyword
    if (code == 'break') return 'return false;';
    if (code == 'continue') return 'return true;';
    if (code == 'else') return '} else {';
    if (code == 'endif') return '}';
    if (code == 'endeach') return '})';
    if (code == '__content__') return '__content__';

    // String return
    return '__temp += ' + code + ';';
}

let parserInclude = function(filename, options) {
    let string = fs.readFileSync(path.join(options.path, filename), 'utf8');
    return parser(string, options);
}

let parser = function(string, options) {
    // Check layout
    // Layout must be declared {{ layout filename }} at first line of template file (or string)
    let firstNewLinePos = string.indexOf("\n");
    let firstLine = string.substring(0, firstNewLinePos);
    let regexBBLayout = /{{ layout (.*?) }}/g;
    let layout = regexBBLayout.exec(firstLine);
    if (layout != null) {
        layout = layout[1];
        string = string.substring(firstNewLinePos + 1);
    }

    // Parse main contain
    let regexBBTag = /{{ (.*?) }}/g;
    let cursor = 0;
    let left = '';
    let code = '';
    let found = null;
    while (found = regexBBTag.exec(string)) {
        left = string.slice(cursor, found.index);
        code += "__temp += `" + left + "`;\n";
        jsCode = parserJS(found[1], options);
        code += jsCode + '\n';
        cursor = found.index + found[0].length;
    }

    let right = string.substr(cursor, string.length - cursor);
    code += "__temp += `" + right + "`;\n";

    // Parse layout if available
    if (layout) {
        let layoutCode = parserInclude(layout, options);
        code = layoutCode.replace('__content__', code);
    }

    return code;
}

let compile = function(string, options = {}) {
    let fullcode = each + '\ntemplate = function(__data) {\nlet __temp = \'\';\nwith(__data||{}) {\n' + parser(string, options) + '}\nreturn __temp;\n};return template;';

    // Return pure js function of template
    return new Function('', fullcode)();
}

let compileFile = function(filename, options = {}) {
    if (!options.path) {
        options.path = path.dirname(filename)
        filename = path.basename(filename)
    }

    let string = fs.readFileSync(path.join(options.path, filename), 'utf8');

    return compile(string, options);
}

let render = function(string, data = {}) {
    if (!data._path) {
        data._path = './'
    }

    let engineOptions = {
        path: data._path
    }

    return compile(string, engineOptions)(data);
}

let renderFile = function(filename, data = {}) {
    if (!data._path) {
        data._path = path.dirname(filename)
        filename = path.basename(filename)
    }

    let engineOptions = {
        path: data._path
    }

    return compileFile(filename, engineOptions)(data);
}

module.exports = {
    compile: compile,
    compileFile: compileFile,
    render: render,
    renderFile: renderFile,
};
