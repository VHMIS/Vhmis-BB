const bb = require('../');
const path = require('path');

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
            {{ continue __key__ < 2 }}
            {{ if i == 'g' }}
                {{ break }}
            {{ endif }}
            {{ i }} - {{ __key__ }} - {{ __count__ }} <br>
        {{ endeach }}
        {{ include copyright.bb }}
    </body>
</html>
`;

let data = {
    'title': 'Hello World',
    'name': 'Vhmis',
    'time': 10,
    'year': 2017
}

let template = bb.compile(temp, {
    path: path.dirname('./')
});

console.log(template(data));

template = bb.compileFile('example.bb');
console.log(template(data));

// Layout example
console.log(bb.renderFile(path.join(__dirname, '../example') + '/index.bb', {
    title: 'Title'
}));
