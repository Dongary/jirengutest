var result = `/*
*你 好，我 是 X X X
*我将以动画的形式来介绍我自己
*但是只用文字介绍太单调了
*我就用代码来介绍自己吧
*首先准备一些基础样式
*/

*{
    transition: all 1s;
}
html{
    background: rgb(222,222,222);
    font-size：16px;
}
#code{
    border: 1px solid #FFFFFF;
    padding: 16px;
    background: rgb(242,242,242);
}
/* 页面没有颜色太枯燥了，让一些代码高亮起来 */

.token.selector {
    color: #690;
}

.token.property {
    color: #905;
}

.token.function {
    color: #DD4A68;
}
/* 也可以让页面转起来 */
#code{
    transform: rotate(360deg);
}
/* 进入正题，来创建一个窗口 */
`
var result2 = `
#code{
    position: fixed;
    left: 0;
    width: 50%;
}
#paper{
   position: fixed;
   right: 0;
   width: 50%;
   background: rgb(242,242,242);
   display: flex;
   align-items: center;
   padding: 5px;
   border: 1px solid #FFFFFF;
}
#paper > .content{
    background: background: rgb(128,128,128);
    width: 100%;
}
`
var md = `
# 自我介绍
我叫XXX
一个90后
自XXX学校毕业
接触前端半年有余
希望成为一名前端从业者
# 个人技能
熟练掌握
H5
CSS3
js
jquery 
vue
`
var result3 = result + result2

var result4 = `
/* 现在我们把markdown变为html,让浏览器可以识别 */
`
var converter = new showdown.Converter()
var MdHtml = converter.makeHtml(md)


writeCode('', result, () => {
    createPaper(() => {
        writeCode(result, result2, () => {
            writeMarkdown(md, () => {
                writeCode(result3, result4, () => {
                    ShowHtml(MdHtml)
                })
            })
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    var content = document.createElement('pre')
    paper.id = 'paper'
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function writeMarkdown(markdown, fn) {
    let dompaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        dompaper.innerHTML = markdown.substring(0, n)
        dompaper.scrollTop = dompaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function ShowHtml(MdHtml) {
    let dompaper = document.querySelector('#paper>.content')
    dompaper.innerHTML = MdHtml
}