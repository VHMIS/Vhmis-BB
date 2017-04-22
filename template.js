var fs = require('fs');

let each = ` each = function(obj, func) {
    if (obj == null) {
        return obj;
    }

    let index = -1

    if (Array.isArray(obj)) {
        const length = obj.length
        let count = 1;
        while (++index < length) {
            if (func(obj[index], index, count, obj) === false) {
                break;
            }
            count++;
        }

        return obj;
    }

    let key = Object.keys(obj)
    const length = key.length
    let count = 1;
    while (++index < length) {
        if (func(obj[key[index]], key[index], count, obj) === false) {
            break;
        }
        count++;
    }

    return obj;
}`;

let parserJS = function(code) {
    // Parse code line has parameter
    let regex = /(if|elseif|continue|break|include) (.*)|(each) (.*) in (.*)/g;
    let found = regex.exec(code);
    if (found !== null) {
        if (found[1] == 'if') return 'if(' + found[2] + ') {';
        if (found[1] == 'elseif') return '} else if(' + found[2] + ') {';
        if (found[1] == 'continue') return 'if(' + found[2] + ') {\n return true;\n}';
        if (found[1] == 'break') return 'if(' + found[2] + ') {\n return false;\n}';
        if (found[3] == 'each') return 'each(' + found[5] + ', function(' + found[4] + ', ___key, ___count, ___obj) {';
        if (found[1] == 'include') return parserInclude(found[2]);
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

let parserInclude = function(filename) {
    let string = fs.readFileSync(filename, 'utf8');
    return parser(string);
}

let parser = function(string) {
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
        jsCode = parserJS(found[1]);
        code += jsCode + '\n';
        cursor = found.index + found[0].length;
    }

    let right = string.substr(cursor, string.length - cursor);
    code += "__temp += `" + right + "`;\n";

    // Parse layout if available
    if (layout) {
        let layoutCode = parserInclude(layout);
        code = layoutCode.replace('__content__', code);
    }

    return code;
}

let compile = function(string) {
    let fullcode = each + '\ntemplate = function(__data) {\nlet __temp = \'\';\nwith(__data||{}) {\n' + parser(string) + '}\nreturn __temp;\n};return template;';

    // Return pure js function of template
    return new Function('', fullcode)();
}

let compileFile = function(filename) {
    let string = fs.readFileSync(filename, 'utf8');
    return compile(string);
}

let render = function(string, data = {}) {
    return compile(string)(data);
}

let renderFile = function(filename, data = {}) {
    return compileFile(filename)(data);
}

module.exports = {
    compile: compile,
    compileFile: compileFile,
    render: render,
    renderFile: renderFile,
};
