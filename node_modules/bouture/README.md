# Bouture

A thin wrapper around DOM APIs to create DOM branches to be appended.

Inspirations: [jQuery](https://api.jquery.com/), [voyeur.js](http://adriancooney.ie/voyeur.js/), [React.createElement](https://reactjs.org/docs/react-api.html#createelement)

This lib provides an API to create easily DOM branches to be appended. Only creation is supported, not removing, no tranversal, no edition. Creation is the only thing you need when you adhere to the React discipline.

## API

````js
// Creating element
const div = Bouture.div

// With text
const h1 = Bouture.h1('Best lib of all times')
const h2 = Bouture.h2('subheading')

// Attribute
const input = Bouture.input({type: 'tel'})

// Classes
const multiClassDiv = Bouture.div({class: ['yo', 'ya']})

// Attribute and text
const a = Bouture.a({href: 'https://github.com/DavidBruant/bouture'}, 'bouture.js');

// Nested creation with one child
const table = Bouture.table.tbody.tr

// Nested creation with children
const ul = Bouture.ul( ['abra', 'kadabra', 'alakazam'].map(Bouture.li) )

// Events
const b1 = Bouture.button({
  onClick: e => console.log('click', e),
  onceMousedown: e => console.log('mousedown', e),
})

// Custom Element
const ce = Bouture('custom-element', Bouture('paper-badge', {label: '3'}))

// append to actual DOM
document.body.append(h1.getElement())
````

## How to use Bouture?

By example, use [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) in your *html* file.

````html
<script type=module>
  import Bouture from 'https://cdn.jsdelivr.net/gh/DavidBruant/bouture@13cb6c683fa87e5feea574311dcda6353489bb3b/bouture.js'

  const html = Bouture.ul(['abra', 'kadabra', 'alakazam'].map(Bouture.li))
  document.querySelector('body').append(html.getElement())
</script>
````

You can also install *Bouture* with *npm*:

````js
$ npm install davidbruant/bouture
````

and playing with something like that:

````js
import Bouture from './node_modules/bouture/bouture.js'
````


## License

This project is licensed under the CC0 License - see the [License](./LICENSE) file for details.

## Cross-cutting concerns

- Any usage that is not documented should throw or return undefined
- Browser compatibility: Edge
