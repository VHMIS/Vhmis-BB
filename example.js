const bb = require('./index.js');

let temp = `
<html>
    <head>
        <title>{{ title }}</title>
    </head>
    <body>
        <h1>Hello {{ name }}</h1>
        <p>Hava a nice day!</p>
        {{ if time < 12 }}
            morning
        {{ elseif time < 18 }}
            afternoon
        {{ else }}
            night
        {{ endif }}
        {{ each i in 'abcdefgh' }}
            {{ continue ___key < 2 }}
            {{ if i == 'g' }}
                {{ break }}
            {{ endif }}
            {{ i }} - {{ ___key }} - {{ ___count }} <br>
        {{ endeach }}
        {{ include copyright.bb }}
    </body>
</html>
`;
// {{ if fun }}
//     {{ break }}
// {{ endif }}
// Count {{ %count% }} {{ i }} {{ %k% }}

let data = {
    'title': 'Hello World',
    'name': 'Vhmis',
    'time': 10,
    'year': 2017
}

let template = bb.compile(temp);
console.log(template(data));

template = bb.compileFile('example.bb');
console.log(template(data));
