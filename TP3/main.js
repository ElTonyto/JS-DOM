const DRAGGABLE_ELEMENTS_WIDTH = 100
const DRAGGABLE_ELEMENTS_HEIGHT = 100

let currentContentWidth = null
let currentContentHeight = null

document.addEventListener('DOMContentLoaded', () => {
    onResize() // to initialize currentContentWidth / currentContentHeight
    renderDraggableElements()
    attachDragEvents()
})

function attachDragEvents() {

    let items = document.getElementsByClassName('draggableBox');
    let itemsArray = Array.from(items);

    itemsArray.forEach(element => {

        element.onmousedown = function (event) {

            // (1) prepare to moving: make absolute and on top by z-index
            element.style.position = 'absolute';
            element.style.zIndex = 1000;
            element.className = 'draggableBox'
            // move it out of any current parents directly into body
            // to make it positioned relative to the body
            document.getElementById('content').append(element);

            // centers the element at (pageX, pageY) coordinates
            function move(pageX, pageY) {
                element.style.left = pageX - element.offsetWidth / 2 + 'px';
                element.style.top = pageY - element.offsetHeight / 2 + 'px';
            }

            // move our absolutely positioned element under the pointer
            move(event.pageX, event.pageY);

            function onMouseMove(event) {
                move(event.pageX, event.pageY);
            }

            // (2) move the element on mousemove
            document.getElementById('content').addEventListener('mousemove', onMouseMove);

            // (3) drop the element, remove unneeded handlers
            element.onmouseup = function () {
                document.getElementById('content').removeEventListener('mousemove', onMouseMove);
                element.onmouseup = null;
            };
        };


    });
}

function renderDraggableElements() {
    const contentElement = document.getElementById('content')
    const maxLeft = currentContentWidth - DRAGGABLE_ELEMENTS_WIDTH
    const maxTop = currentContentHeight - DRAGGABLE_ELEMENTS_HEIGHT

    for (let i = 0; i <= 10; i++) {
        const divElement = document.createElement('div')
        divElement.className = 'draggableBox'
        divElement.appendChild(document.createTextNode(`Box nº${i}`))
        divElement.style.left = Math.floor(Math.random() * maxLeft) + 'px'
        divElement.style.top = Math.floor(Math.random() * maxTop) + 'px'
        contentElement.appendChild(divElement)
    }
}

window.addEventListener('optimizedResize', onResize)

function onResize() {
    const contentElement = document.getElementById('content')

    //-- Exercice Bonus 3: implémenter ici le repositionnement des box lorsque la fenêtre change de taille, les box doivent proportionnellement se retrouver à la même place

    currentContentWidth = contentElement.offsetWidth
    currentContentHeight = contentElement.offsetHeight
}

// See https://developer.mozilla.org/en-US/docs/Web/Events/resize
// Prevent resize event to be fired way too often, this means neither lags nor freezes
{
    function throttle(type, name, obj = window) {
        let running = false
        const event = new CustomEvent(name)
        obj.addEventListener(type, () => {
            if (running) return
            running = true
            requestAnimationFrame(() => {
                obj.dispatchEvent(event)
                running = false
            })
        })
    }

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');
}
