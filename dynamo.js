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
        document.querySelector('title').textContent = `Dynamo's Respite | ${i.name}`
        switch (i.style) {
            case 'overview':
                i.items.forEach(item => {});
                break;

            case 'sectioned':
                i.items.forEach(item => {
                    console.log(item)
                });
                break;
        }
    })
    .catch(error => {
        console.log(`Error Caught: ${error}`)
    })
}

async function updateNavigation() {

}

function hyperfixationArticleInterpolater(item) {
        if (item.element != 'article' /*|| item != JSON*/) return error('wtf are you doing');
    const x = item.type;
    switch (x) {
        case 'table-of-contents':

    }
}

window.addEventListener('DOMContentLoaded', updateContent)
window.addEventListener('hashchange', updateContent)
