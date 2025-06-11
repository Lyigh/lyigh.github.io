const navBox = document.querySelector("[format-navigation]");
const contentBox = document.querySelector("[format-content]");

function returnPath() {
    const path = window.location.hash.replace('#', '') || 'overview';
    return path;
}

async function updateContent() {
    const path = returnPath();
    fetch(`dynamo/${path}.json`)
    .then(x => x.json())
    .then(i => {
        document.querySelector('title').textContent = `Dynamo's Respite | ${i.name}`;
        i.items.forEach(section => {
            contentBox.append(wikiInterpolator(section))
        })
    })
    .catch(error => {
        console.log(`Error Caught: ${error}`)
    })
}

async function updateNavigation() {
    
}

function wikiInterpolator(indivSection) {
    //instead, lets make this a helper function to process each individual section, that way we can use asynchronous loading later 
    /* 
    For each section we do the following:
    1. Find the section ID and the section name and process them through the navigation bar
    2. For each element in the "content" container, we will process them with our custom process
    3. All elements will be appended to the custom sections
    */
    const x = indivSection;
    const xID = x.id;
    const sectionTemplate = document.createElement("section")
    sectionTemplate.setAttribute("id", xID);
    x.content.forEach(e => {
        if (e.element != "article") {
            const newElement = document.createElement(`${e.element}`);
            newElement.innerHTML = e.value;
            sectionTemplate.append(newElement)

            if (e.post && e.post === "br") {
                sectionTemplate.append(document.createElement('br'))
            }

        } else {
            if (!e.type) return error("Error: Article Element is not formatted with a 'type' selector.");

            switch (e.type) {   
                case "table-of-contents":
                    const newTOC = returnCompleteTOC(e.value, "Table of Contents");
                    sectionTemplate.append(newTOC);
                    break;
                case "list":
                    const newList = returnCompleteList(e);
                    sectionTemplate.append(newList)
                default:
                    console.error("Error: Called for article but matchxing 'type' selector not found.");
            }
        }
    });
    contentBox.append(sectionTemplate)
}

function returnCompleteList(container) {
    const articleTemplate = document.createElement("article"); articleTemplate.classList.add("list")
    const header = document.createElement("h3"); header.append(document.createTextNode(container.title));
    articleTemplate.append(header)

    const ulTemplate = document.createElement("ul")
    container.value.forEach(i => {
        const liTemplate = document.createElement("li");
        const text = document.createTextNode(i.value);
        const element = document.createElement(i.element); element.append(text)
        liTemplate.append(element)
        ulTemplate.append(liTemplate)
        articleTemplate.append(ulTemplate)
    })
    return articleTemplate;
}

function returnCompleteTOC(list, title) {
    //return a new Article Element
    const articleTemplate = document.createElement("article"); articleTemplate.classList.add("table-of-contents")
    const header = document.createElement("h2"); header.append(document.createTextNode(title));
    articleTemplate.append(header)

    const ulTemplate = document.createElement("ul"); articleTemplate.append(ulTemplate);
    list.forEach(a => {
        const liTemplate = document.createElement("li")
        const aTemplate = document.createElement("a");
        aTemplate.setAttribute("href", a.href);
        aTemplate.textContent = a.text;

        liTemplate.append(aTemplate)
        ulTemplate.append(liTemplate);
    })
    return articleTemplate;
}





window.addEventListener('DOMContentLoaded', updateContent)
window.addEventListener('hashchange', updateContent)
