
//const demoElement = document.getElementById('demo')

//setTimeout(function() { customFunction('After!') }, 3000)

function customFunction(value) {
    demoElement.innerHTML = value;
    demoElement.classList.add('simpleAnimation')
    demoElement.style.backgroundColor = 'aquamarine'
}



/* About Promises
    Promises are objjects that manage asynchronous operations.
    PENDING => RESOLVED or REJECTED
    new Promise((resolve, reject) => {async code})
*/

// 1. WALK THE DOG
// 2. CLEAN THE KITCHEN
// 3. TAKE OUT THE TRASH

function walkDog(){

    return new Promise((resolve, reject) => {
    setTimeout(() => {

        const dogWalked = true;

        dogWalked ? resolve('You walk the dog') : reject('You didn\'t walk the dog')
    }, 1500);
    })
}

function cleanKitchen(){

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const kitchenCleaned = false;

            kitchenCleaned ? resolve('You clean the kitchen.') : reject('You didn\'t clean the kitchen.')
        }, 2500)
    })
}

function takeOutTrash(){

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const trashTaken = true;

            trashTaken ? resolve('You take out the trash.') : reject('You didn\'t take out the trash.')
        }, 500)
    })
}

walkDog().then(value => {console.log(value); return cleanKitchen()})
        .then(v => {console.log(v); return takeOutTrash()})
        .then(v => {console.log(v); console.log('You have completed the chores')})
        .catch(err => console.error(err));

// Method Chaining very good