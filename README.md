# Vhmis-BB

Blue Building, named main building at ViethanIT campus.

Vhmis BB is Pure JS Template Engine.

**Work-in-progress**

## Goals

- Display data from ajax call on web app
- Generate static web (like Jekyll)
- No need to check syntax, be careful!

## Basic usage

Vhmis-BB uses ``{{ }}`` tag to add pure JS string value to template

    abc
    {{ Math.PI }}
    {{ "a" }}
    {{ new Date() }}
    abc

In Nodejs

    let str = `
        abc
        {{ Math.PI }}
        {{ "a" }}
        {{ new Date() }}
        abc
    `

    let bb = require('vhmis-bb')
    bb.render(str)

And output

    abc
    3.141592653589793
    a
    Mon Apr 24 2017 17:20:59 GMT+0700 (+07)
    abc

To use input value, add variable name to `{{ }}` and pass value as element of object

    let str = `
        abc
        {{ "Hello" + name }}
        abc
    `

    let bb = require('vhmis-bb')
    bb.render(str, {
        'name': 'Vhmis BB'
    })

    // output
    abc
    Hello Vhmis BB
    abc

or

    let str = `
        abc
        Hello {{ name }}
        abc
    `
    ...

Render/Compile

- Render : read template and output string (``render(string, data)`` or ``renderFile(file, data)``)
- Compile : read template and output js function to use render template later (``compile(string, options)``, ``compileFile(string, options)``)


    // Render
    let bb = require('vhmis-bb')
    bb.renderFile('index.bb', {
        'name': 'Vhmis BB',
        '_path': '/opt/project'
    });

    // Compile
    let template = bb.compileFile('index.bb', {
        'path': '/opt/project'
    });
    template({
        'name': 'Vhmis BB'
    })

## Built-in tag

### Control flow

if/else if/else

    {{ if product.instock > 6 }}
        Buy
    {{ else if product.instock > 1 }}
        Hurry up
    {{ else }}
        Out stock
    {{ endif }}

### Iteration

for/each

    {{ for character in 'VHMISBB' }}
        <li>{{ character }}</li>
    {{ endfor }}

    {{ each character in 'VHMISBB' }}
        <li>{{ character }}</li>
    {{ endeach }}

    // output ES6
    // <li>V</li>
    // <li>H</li>
    // <li>M</li>
    // <li>I</li>
    // <li>S</li>
    // <li>B</li>
    // <li>B</li>

``__key__`` and ``__count__`` in for/each

    {{ each character in 'VHMISBB' }}
        <li>{{ __key__ }} - {{ __count__ }} - {{ character }}</li>
    {{ endeach }}

    // output ES6
    // <li>0 - 1 - V</li>
    // <li>1 - 2 - H</li>
    // <li>2 - 3 - M</li>
    // <li>3 - 4 - I</li>
    // <li>4 - 5 - S</li>
    // <li>5 - 6 - B</li>
    // <li>6 - 7 - B</li>

## Layout

### Layout

Layout is BB template file with tag ``{{ __content__ }}``

    // layout.bb
    <html>
        <head>
        </head>
        <body>
        {{ __content__ }}
        </body>
    </html>

Other files use layout by add ``{{ layout layout-file }}`` in the first line

    // index.bb
    {{ layout layout.bb }}
    Hello Index

Output

    <html>
        <head>
        </head>
        <body>
            Hello Index
        </body>
    </html>

### Include

Bb template files can include content of other files by ``{{ include file }}`` tag

    // header.bb
    <title>{{ title }}</title>

    // footer.bb
    {{ year }} &copy; VHMISBB

    // layout.bb
    <html>
        <head>
            {{ include header.bb }}
        </head>
        <body>
        {{ __content__ }}
        {{ include footer.bb }}
        </body>
    </html>

### Path

Use option path to set root path of template folder

    // Folder
    // /project/template/template1
    //     /_layout
    //            /default.bb
    //            /news.bb
    //     /_include
    //              /google-analytics.bb
    //     /index.bb
    //     /about
    //           /contact.bb
    //           /member.bb

    // Set path
    let rootPath = '/project/template/template1'
    bb.renderFile('index.bb', {
        _path: rootPath
        ...
    })

    bb.renderFile('about/index.bb', {
        _path: rootPath
        ...
    })

Layout and include path based on path in option

    // Use layout
    {{ layout _layout/news.bb }}

    // Use include
    {{ include _include/google-analytics.bb }}
