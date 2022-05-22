import {expect} from 'chai'
import Bouture from '../bouture.js'

describe('Bouture.div', () => {
  it('should create an object', () => {
    const b = Bouture.div

    expect(Object(b)).to.equal(b)
  })
  it('should create a new element on each access', () => {
    expect(Bouture.div).to.not.equal(Bouture.div)
  })
})

describe('Bouture.div.getElement()', () => {
  it('should return an actual DOM node', () => {
    const b = Bouture.div.getElement()

    expect(b).to.be.an.instanceof(HTMLElement)
  })
})

describe(`Bouture.div('yo')`, () => {
  it(`should create a div with text 'yo'`, () => {
    const bdiv = Bouture.div('yo')

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('yo')
  })
})

describe(`Bouture.div(13)`, () => {
  it(`should create a div with text '13'`, () => {
    const bdiv = Bouture.div(13)

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('13')
  })
})

describe('Bouture.div(true)', () => {
  it('should create a div with empty string as text', () => {
    const bdiv = Bouture.div(true)

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('')
  })
})

describe(`Bouture.div(NaN)`, () => {
  it(`should create a div with empty string as text`, () => {
    const bdiv = Bouture.div(NaN)

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('')
  })
})

describe(`Bouture.div(undefined)`, () => {
  it(`should create a div with empty string as text`, () => {
    const bdiv = Bouture.div(undefined)

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('')
  })
})

describe(`Bouture.div(null)`, () => {
  it(`should create a div with empty string as text`, () => {
    const bdiv = Bouture.div(null)

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('')
  })
})

describe('Bouture.div(new Symbol())', () => {
  it('should create a div with empty string as text', () => {
    const bdiv = Bouture.div(Symbol('Oï'))

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('')
  })
})

describe('Bouture.a', () => {
  it('should create a <a>', () => {
    const a = Bouture.a

    expect(a.getElement()).to.be.an.instanceof(HTMLAnchorElement)
  })
})

describe('Bouture.h1', () => {
  it('should create a <h1>', () => {
    const h1 = Bouture.h1

    expect(h1.getElement()).to.be.an.instanceof(HTMLHeadingElement)
  })
})

describe('Bouture.bloublou', () => {
  it('should return undefined', () => {
    const bloublou = Bouture.bloublou

    expect(bloublou).to.be.undefined
  })
})

describe('Bouture.div({lang: "fr"})', () => {
  it('should create a div with a lang attribute', () => {
    const bdiv = Bouture.div({lang: 'fr'})

    expect(bdiv.getElement().getAttribute('lang')).to.equal('fr')
  })
})

describe('Bouture.div({hidden: true})', () => {
  it('should create a div with a hidden attribute set to the empty string', () => {
    const bdiv = Bouture.div({hidden: true})

    expect(bdiv.getElement().getAttribute('hidden')).to.equal('')
  })
})

describe('Bouture.div({hidden: false})', () => {
  it('should create a div with no hidden attribute', () => {
    const bdiv = Bouture.div({hidden: false})

    expect(bdiv.getElement().hasAttribute('hidden')).to.be.false
  })
})

describe('Bouture.div({hidden: undefined})', () => {
  it('should create a div with no hidden attribute', () => {
    const bdiv = Bouture.div({hidden: undefined})

    expect(bdiv.getElement().hasAttribute('hidden')).to.be.false
  })
})

describe('Bouture.div({hidden: null})', () => {
  it('should create a div with no hidden attribute', () => {
    const bdiv = Bouture.div({hidden: null})

    expect(bdiv.getElement().hasAttribute('hidden')).to.be.false
  })
})

describe('Bouture.div({hidden: Symbol()})', () => {
  it('should create a div with no hidden attribute', () => {
    const bdiv = Bouture.div({hidden: Symbol('yo')})

    expect(bdiv.getElement().hasAttribute('hidden')).to.be.false
  })
})

describe('Bouture.input({min: 12})', () => {
  it(`should create an input element with min attribute set to '12'`, () => {
    const bdiv = Bouture.input({min: 12})

    expect(bdiv.getElement().getAttribute('min')).to.equal('12')
  })
})

describe('Bouture.input({min: NaN})', () => {
  it(`should create an input element with no min attribute`, () => {
    const bdiv = Bouture.input({min: NaN})

    expect(bdiv.getElement().hasAttribute('min')).to.be.false
  })
})

describe(`Bouture.div({'data-bloublou': 'yoya'})`, () => {
  it('should create a div with a data attribute', () => {
    const bdiv = Bouture.div({'data-bloublou': 'yoya'})

    expect(bdiv.getElement().getAttribute('data-bloublou')).to.equal('yoya')
    expect(bdiv.getElement().dataset.bloublou).to.equal('yoya')
  })
})

describe(`Bouture.div({class: ['yo', 'ya']})`, () => {
  it('should create a div with 2 classes', () => {
    const bdiv = Bouture.div({class: ['yo', 'ya']})

    expect(bdiv.getElement().classList.contains('yo')).to.be.true
    expect(bdiv.getElement().classList.contains('ya')).to.be.true
    expect(bdiv.getElement().classList.length).to.equal(2)
    expect(bdiv.getElement().getAttribute('class')).to.equal('yo ya')
  })
})

describe(`Bouture.div({class: ['yo', undefined]})`, () => {
  it('should create a div with 1 class', () => {
    const bdiv = Bouture.div({class: ['yo', undefined]})

    expect(bdiv.getElement().classList.contains('yo')).to.be.true
    expect(bdiv.getElement().classList.length).to.equal(1)
  })
})

describe(`Bouture.div({lang: 'en'}, 'to be yourself is all that you can do')`, () => {
  it('should create a div with an attribute and text as content', () => {
    const div = Bouture.div({lang: 'en'}, 'to be yourself is all that you can do').getElement()

    expect(div.getAttribute('lang')).to.equal('en')
    expect(div.textContent).to.equal('to be yourself is all that you can do')
  })
})

describe(`Bouture.table().tbody()`, () => {
  it('should create a table with one tbody child', () => {
    const table = Bouture.table().tbody().getElement()

    expect(table.parentNode).to.equal(null)
    expect(table.tagName.toLowerCase()).to.equal('table')

    expect(table.children.length).to.equal(1)
    expect(table.children[0].tagName.toLowerCase()).to.equal('tbody')
  })
})

describe(`Bouture.div().a(); Bouture.h1(); Bouture.div().div('').a('{href: 'http://bouture.com'}')`, () => {
  it('should create several Bouture and retrieve our children', () => {
    const divP = Bouture.div().p()
    const h1 = Bouture.h1()
    const divDivA = Bouture.div().div('').a(`{href: 'http://bouture.com'}`)

    expect(divP.getElement().tagName.toLowerCase()).to.equal('div')
    expect(h1.getElement().tagName.toLowerCase()).to.equal('h1')
    expect(divDivA.getElement().tagName.toLowerCase()).to.equal('div')

    expect(divP.getElement().children.length).to.equal(1)
    expect(h1.getElement().children.length).to.equal(0)
    expect(divDivA.getElement().children.length).to.equal(1)

    expect(divP.getElement().children[0].tagName.toLowerCase()).to.equal('p')
    expect(divDivA.getElement().children[0].children[0].tagName.toLowerCase()).to.equal('a')
  })
})

describe(`Bouture.table.tbody.tr.td`, () => {
  it('should create a table with one tbody child, one tr child and one td child', () => {
    const table = Bouture.table.tbody.tr.td.getElement()

    expect(table.parentNode).to.equal(null)
    expect(table.tagName.toLowerCase()).to.equal('table')

    expect(table.children.length).to.equal(1)
    expect(table.children[0].tagName.toLowerCase()).to.equal('tbody')
    expect(table.children[0].children[0].tagName.toLowerCase()).to.equal('tr')
    expect(table.children[0].children[0].children[0].tagName.toLowerCase()).to.equal('td')

  })
})

describe(`Bouture.ul( ['a', 'b', 'c'].map(text => Bouture.li(text)))`, () => {
  it('should create a ul with 3 li children with different texts', () => {
    const ul = Bouture.ul(['a', 'b', 'c'].map(text => Bouture.li(text))).getElement()

    expect(ul.parentNode).to.equal(null)
    expect(ul.tagName.toLowerCase()).to.equal('ul')

    expect(ul.children.length).to.equal(3)
    expect(ul.children[0].tagName.toLowerCase()).to.equal('li')
    expect(ul.children[0].textContent).to.equal('a')
  })
})

describe(`Bouture.button({onClick: e => { called = true }})`, () => {
  it('should create a button and bind with an onclick event', () => {
    let called = false
    const click = new MouseEvent('click')
    const button = Bouture.button({onClick: e => { called = true }}).getElement()
    button.dispatchEvent(click)

    expect(called).to.be.true
  })
})

describe(`Bouture.button({onClick: e => { state *= 2 }})`, () => {
  it('should create a button and bind a click event who can used twice', () => {
    let state = 9.25
    const click = new MouseEvent('click')
    const button = Bouture.button({onClick: e => { state *= 2 }}).getElement()
    button.dispatchEvent(click)

    expect(state).to.equal(18.5)

    button.dispatchEvent(click)

    expect(state).to.equal(37)
  })
})

describe(`Bouture.button({onceClick: e => { state *= 2 }})`, () => {
  it('should create a button and bind a click event who can only used once', () => {
    let state = 18.5
    const click = new MouseEvent('click')
    const button = Bouture.button({onceClick: e => { state *= 2 }}).getElement()
    button.dispatchEvent(click)

    expect(state).to.equal(37)

    button.dispatchEvent(click)

    expect(state).to.equal(37)
  })
})
