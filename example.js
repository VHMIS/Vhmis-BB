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
        {{ if fun }}
            happy
        {{ endif }}
        {{ each i in abc }}
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
    'fun': true,
    'abc': [
        'aaaa',
        'aaaa1'
    ]
}));
