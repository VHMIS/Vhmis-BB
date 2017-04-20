# Vhmis-BB

Blue Building, named main building at ViethanIT campus.
Vhmis BB is Pure JS Template Engine.

## Goals

- [ ] No check syntax
- [ ] Support ``if``, ``each``
- [ ] Support ``layout`` and ``include`` 

## Example

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
                {{ ___count }} - {{ ___key }} - {{ i }}<br>
                {{ if ___count == 5 }}
                    {{ break }}
                {{ endif }}
                {{ if ___count > 3 }}
                    {{ continue }}
                {{ endif }}
                Smaller than 4<br>
            {{ endeach }}
        </body>
    </html>
    `;

