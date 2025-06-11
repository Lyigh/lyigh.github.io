
const contentBox = document.querySelector("[format-content]");

function returnPath() {
    const path = window.location.hash.replace('#', '') || 'home';
    return path;
}

async function updateContent() {
    const path = returnPath();
    fetch(`data/${path}.json`)
    .then(x => x.json())
    .then(y => {
        y.forEach(i => {
            const name = i.name
            document.querySelector('title').textContent = `C_Lyigh | ${name}`
            const newDiv = document.createElement('section')
            i.items.forEach(item => {
                if (item.element != 'article') {
                    const element = document.createElement(item.element)
                    const textContent = document.createTextNode(item.value)
                    element.append(textContent)
                    newDiv.append(element)
                } else {
                    const article = document.createElement('article')
                    if (item.type==='links') {
                        const links = item.value;
                        links.forEach(a => {
                            const link = document.createElement('a')
                            const textContent = document.createTextNode(a.text) 
                            link.append(textContent)
                            link.setAttribute("href", a.href)
                            article.append(link)
                            newDiv.append(article)
                        })
                    }
                }
            })

            contentBox.childNodes.forEach(x => {
                x.remove()
            })
            contentBox.append(newDiv)
        })
    })
}

window.addEventListener('DOMContentLoaded', updateContent)
window.addEventListener('hashchange', updateContent)
