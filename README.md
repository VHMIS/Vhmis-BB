# Vhmis-BB

Blue Building, named main building at ViethanIT campus.

Vhmis BB is Pure JS Template Engine.

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
