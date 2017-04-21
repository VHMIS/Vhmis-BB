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

let praserJS = function(code) {
    console.log(code);
    regexEndTag = /end(if|each)/g
    regexOpenTag = /(if|continue|break) (.*)|(each) (.*) in (.*)/g;

    let found = regexEndTag.exec(code);
    if (found !== null) {
        if (found[1] == 'if') return '}';
        if (found[1] == 'each') return '})';
    }

    found = regexOpenTag.exec(code);
    if (found !== null) {
        if (found[1] == 'if') return 'if(' + found[2] + ') {';
        if (found[1] == 'continue') return 'if(' + found[2] + ') {\n return true;\n}';
        if (found[1] == 'break') return 'if(' + found[2] + ') {\n return false;\n}';
        if (found[3] == 'each') return 'each(' + found[5] +', function(' + found[4] + ', ___key, ___count, ___obj) {';
    }

    if (code == 'break') return 'return false;';
    if (code == 'continue') return 'return true;';

    return '__temp += ' + code + ';';
}

let praser = function(string) {
    let regex = /{{ (.*?) }}/g;
    let cursor = 0;
    let left = '';
    let code = "let __temp = '';\nwith(__data||{}) {";

    while (found = regex.exec(string)) {
        left = string.slice(cursor, found.index);
        code += "__temp += `" + left + "`;\n";
        jsCode = praserJS(found[1]);
        code += jsCode + '\n';
        cursor = found.index + found[0].length;
    }

    let right = string.substr(cursor, string.length - cursor);
    code += "__temp += `" + right + "`;\n";

    code += '}\nreturn __temp;';
    return code;
}

let compile = function(string) {
    console.log(praser(string));
    return new Function('', each + '\ntemplate = function(__data) {\n' + praser(string) + '\n};return template;')();
}

module.exports = {
    compile: compile,
    each: each,
};
