document.addEventListener('DOMContentLoaded', () => {

    let items = document.getElementsByClassName('item')
    let itemArray = Array.from(items);
    let pinks = 0
    let reds = 0
    itemArray.forEach(element => {
        let content = element.innerHTML.split(/>|</)
        content.forEach(elementContent => {
            if (elementContent === "cible 1") {
                element.classList.remove('light-grey')
                element.classList.add('pink')
                pinks++
            }
            if (elementContent === "cible 2") {
                element.classList.remove('light-grey')
                element.classList.add('red')
                reds++
            }
        })
    });
    document.getElementsByClassName('target pink')[0].innerHTML = '<h3>cible 1</h3> <span class="pinks">' + pinks + '</span>'
    document.getElementsByClassName('target red')[0].innerHTML = '<h3>cible 2</h3> <span class="pinks">' + reds + '</span>'
})
