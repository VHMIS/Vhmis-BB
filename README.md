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
                <p>And happy</p>
            {{ endif }}
            {{ each work in works }}
                <div>
                    {{ ___count }}. - {{ ___key }} - {{ work }}
                    {{ if ___count == 5 }}
                        {{ break }}
                    {{ endif }}
                    {{ if ___count > 3 }}
                        {{ continue }}
                    {{ endif }}
                    (-- Morning work)<br>
                </div>
            {{ endeach }}
        </body>
    </html>
    `;

In Nodejs

    const bb = require('vhmis-bb')
    const template = bb.compile(temp)
    console.log(template({
        'title': 'Today works',
        'name': 'BB',
        'fun': true,
        'works': {
            'code01': Code 1,
            'code02': Code 2,
            'code03': Code 3,
            'code04': Code 4,
            'code05': Code 5,
            'code06': Code 6,
            'code07': Code 7,
        }
    })

And result

    <html>
        <head>
            <title>Today works</title>
        </head>
        <body>
            <h1>Hello BB</h1>
            <p>Hava a nice day!</p>
            <p>And happy</p>
            <div>
                1. - code01 - Code 1<br>
                (-- Morning work)<br>
            </div>
            <div>
                2. - code02 - Code 1<br>
                (-- Morning work)<br>
            </div>
            <div>
                3. - code03 - Code 3<br>
                (-- Morning work)<br>
            </div>
            <div>
                4. - code04 - Code 4<br>
            </div>
            <div>
                5. - code05 - Code 5<br>
            </div>
        </body>
    </html>
    `;
