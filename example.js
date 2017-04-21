const vhmisjstemp = require('./index.js');

const each = vhmisjstemp.each;

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
    </body>
</html>
`;
// {{ if fun }}
//     {{ break }}
// {{ endif }}
// Count {{ %count% }} {{ i }} {{ %k% }}

let template = vhmisjstemp.compile(temp);

console.log(template({
    'title': 'Hello World',
    'name': 'Vhmis',
    'time': 10,
    'abc': [
        'aaaa',
        'aaaa1',
        'fdjfjdfjd'
    ]
}));
