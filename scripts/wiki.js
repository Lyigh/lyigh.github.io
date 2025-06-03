const header = document.querySelector(".wikiHeader")
const navLinks = document.querySelectorAll("a")

navLinks.forEach(element => {
    element.addEventListener('click', e => {
        const link = element.getAttribute("data-link")
        updateMainContainer(link)
    })
})

document.addEventListener('DOMContentLoaded', e => {
    const remainingSpace = header.getBoundingClientRect().height;
    const windowHeight = window.innerHeight;
    console.log(remainingSpace)
    console.log(windowHeight)
    document.getElementById("wikiContent").style.height = 10;

    updateMainContainer('main/overview.html')
})

function updateMainContainer(htmlPath) {
    fetch(htmlPath)
        .then(response => {
            return response.text()
        })
        .then(html => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, "text/html")
            const container = document.getElementById("wikiContent")
            const content = doc.querySelector("[data-content]")
            const title = doc.querySelector("title").innerText

            container.childNodes.forEach(x => {
                x.remove()
            })
            document.querySelector("title").innerHTML = `Dynamo Wiki | ${title}`
            container.append(content)
        })
}

function updateNavBar(folderPath) {

}

function goToElement(id) {
    const current = window.location.href;
    const newLink = current + id;
    window.location.replace(newLink)
}