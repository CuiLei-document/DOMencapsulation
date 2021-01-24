const div = dom.create(`<div>newDiv</div>`)
console.log(div)
const text = dom.after(test, div)
const div2 = dom.create(`</span>before</span>`)
const before = dom.before(test, div2)

const div3 = dom.create(`<div>儿子</div>`)
dom.append(test,div3)

const div4 = dom.wrap(wrap, wrap2)

const remove = dom.remove(wrap)
console.log(remove)

const nodes = dom.empty(window.empty)
console.log(nodes)

const attr = dom.attr(empty, 'title', '你好我叫崔磊')
const attr1 = dom.attr(empty, `title`)
console.log(attr1)

 dom.text(empty, `你好，这个是新的内容`)
const text2 = dom.text(empty)
console.log(text2)

dom.style(empty, `border`, `1px solid red`)
console.log(dom.style(empty, `border`))
dom.style(empty, {color: `blue`})
dom.style(empty, `background`, `red`)

dom.class.add(empty, `red`)
dom.class.remove(empty, `red`)
dom.class.add(empty, 'blue')
console.log(dom.class.has(empty, `blue`))

dom.on(empty, `click`, fn)

const fn = ()=>{
    console.log(`我打印了几次`)
}
dom.off(empty,`click`,fn)

const emptyDiv = dom.find(`#empty`)[0]
console.log(emptyDiv)
dom.class.add(empty, `red`)
dom.class.add(fd, 'red')
const fd1 = dom.find('#fd')[0]
console.log(dom.find('.red',fd1)[0])

console.log(dom.siblings(dom.find('#s2')[0]))

console.log(dom.next(dom.find(`#s2`)[0]))

const s2 = dom.find('#s2')[0]

console.log(dom.previous(s2))

const es = dom.find('#each')[0]

dom.each(dom.children(es), (n)=> dom.style(n, 'color', 'blue'))

const e2 = dom.find('#e2')[0]
// console.log(e2)
console.log(dom.index(e2))

