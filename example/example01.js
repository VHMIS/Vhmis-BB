let str = `
    abc
    {{ Math.PI }}
    {{ "a" }}
    {{ new Date() }}
    abc
`

let bb = require('../')
console.log(bb.render(str))

str = `
    abc
    {{ "Hello " + name }}
    abc
`

console.log(bb.render(str, {
    'name': 'Vhmis BB'
}))

str = `
    {{ each character in 'VHMISBB' }}
        <li>{{ character }}</li>
    {{ endeach }}
`

console.log(bb.render(str))

str = `
    {{ each character in 'VHMISBB' }}
        <li>{{ __key__ }} - {{ __count__ }} - {{ character }}</li>
    {{ endeach }}
`

console.log(bb.render(str))
