let containerjs = document.getElementById('containerjs')
let checkboxes = document.getElementById('checkboxes')
let search = document.getElementById('searchbutton')
let texto = document.getElementById('searchinput')

async function fetchApi() {
    try {
        let res = await fetch('https://mh-amazing.herokuapp.com/amazing')
        let data = await res.json()
        let eventos = data.events
        renderCards(eventos)
        renderCheckBoxes(eventos)
        let checks = document.querySelectorAll("input[type='checkbox']")
        checks.forEach(checkCategory => {
            checkCategory.addEventListener('change', () => {
                filtrar(eventos)
            })
            texto.addEventListener('keyup', () => {
                filtrar(eventos)
            })
        })
    } catch (error) {
        console.error(error)
    }
}
fetchApi()

function renderCards(arrayData) {
    containerjs.innerHTML = ""
    if (arrayData.length > 0) {
        arrayData.forEach(card => {
            let div = document.createElement('div')
            div.className = 'card'
            div.style = 'width:18rem;'
            div.innerHTML = ` <a class="anchor" href="./pages/details.html?id=${card.id}">
                <img src="${card.image}" class="card-img-top image-size" alt="${card.name}">
                <div class="card-body bg-light anchor ">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <p>Date: ${card.date.slice(0,10)}</p>
                    <p>Price: $ ${card.price}</p>
                </div>  </a>
            `
            containerjs.appendChild(div)
        })      
    } else {
        let div = document.createElement('div')
        div.className = 'card error'
        div.style = 'width:18rem; height:12rem;'
        div.innerHTML = `<svg viewBox="-8 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm144 386.4V280c0-13.2-10.8-24-24-24s-24 10.8-24 24v151.4C315.5 447 282.8 456 248 456s-67.5-9-96-24.6V280c0-13.2-10.8-24-24-24s-24 10.8-24 24v114.4c-34.6-36-56-84.7-56-138.4 0-110.3 89.7-200 200-200s200 89.7 200 200c0 53.7-21.4 102.5-56 138.4zM205.8 234.5c4.4-2.4 6.9-7.4 6.1-12.4-4-25.2-34.2-42.1-59.8-42.1s-55.9 16.9-59.8 42.1c-.8 5 1.7 10 6.1 12.4 4.4 2.4 9.9 1.8 13.7-1.6l9.5-8.5c14.8-13.2 46.2-13.2 61 0l9.5 8.5c2.5 2.3 7.9 4.8 13.7 1.6zM344 180c-25.7 0-55.9 16.9-59.8 42.1-.8 5 1.7 10 6.1 12.4 4.5 2.4 9.9 1.8 13.7-1.6l9.5-8.5c14.8-13.2 46.2-13.2 61 0l9.5 8.5c2.5 2.2 8 4.7 13.7 1.6 4.4-2.4 6.9-7.4 6.1-12.4-3.9-25.2-34.1-42.1-59.8-42.1zm-96 92c-30.9 0-56 28.7-56 64s25.1 64 56 64 56-28.7 56-64-25.1-64-56-64z"/></svg>
            <p>Cards not found</p>`
        containerjs.appendChild(div)
    }
}

function searchText(texto, arrayDatos) {
    let arrayFiltrado = arrayDatos.filter(card => card.name.toLowerCase().includes(texto.toLowerCase()) || card.description.toLowerCase().includes(texto.toLowerCase()) || card.date.includes(texto))
    return arrayFiltrado
}

function renderCheckBoxes(array) {
    let categories = []
    array.forEach(eventos => {
        if (!categories.includes(eventos.category)) {
            categories.push(eventos.category)
        }
    })
    checkboxes.innerHTML = ''
    categories.forEach(categoria => {
        let checkBox = document.createElement('div')
        checkBox.className = 'form-check form-check-inline'
        checkBox.innerHTML = `<input class="form-check-input" type="checkbox" id="${categoria}" value="${categoria}">
        <label class="form-check-label" for="${categoria}">${categoria}</label>`
        checkboxes.appendChild(checkBox)
    })
}

function filterChecks(arrayDatos) {
    // let checksBoxes = document.querySelectorAll("input[type='checkbox']")
    // let arrayChecks = Array.from(checksBoxes)
    // let checksChecked = arrayChecks.filter(check => check.checked)
    // let categories = checksChecked.map(checkChecked => checkChecked.value)
    let categories = Array.from(document.querySelectorAll("input[type='checkbox']")).filter(check => check.checked).map(checkChecked => checkChecked.value)
    if (categories.length > 0) {
        let arrayFiltrado = arrayDatos.filter(card => categories.includes(card.category))
        return arrayFiltrado
    }
    return arrayDatos
}

function filtrar(array) {
    renderCards(filterChecks(searchText(texto.value, array)))
}


