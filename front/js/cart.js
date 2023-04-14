
const btnCommander = document.querySelector('#order')
btnCommander.addEventListener('click', (e) => commander(e))

const panier = [];
console.log(panier)
function recuperationProduits () {
    const nombreProduit = localStorage.length;
    for (let i = 0; i < nombreProduit; i++) {
        const produit = localStorage.getItem(localStorage.key(i));
        const produitObjet = JSON.parse(produit);
        panier.push(produitObjet)
    }    
}
recuperationProduits();

panier.forEach((produit) => displayItem(produit))

function displayItem(produit) {
    const article = makeArticle(produit)
    const divImage = makeImageDiv(produit)
    article.appendChild(divImage)
    const cardItemContent = makeCardItemContent(produit)
    article.appendChild(cardItemContent)
    displayArticle(article);
    displayTotalQuantity();
    displaytotalPrice(produit)
}



function makeArticle(produit) {
    const article = document.createElement('article')
    article.classList.add("cart__item")
    article.dataset.id = produit.id
    article.dataset.color = produit.color
    return article
}

function displayArticle(article) {
    document.querySelector('#cart__items').appendChild(article)
    
}


function makeImageDiv(produit) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    const image = document.createElement('img')
    image.src = produit.imageUrl
    image.alt = produit.altTxt
    divImage.appendChild(image)
    return divImage
}

function makeCardItemContent(produit) {
    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content")
    const divContentDescription = document.createElement("div");
    divContentDescription.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = produit.name
    const p = document.createElement("p")
    p.textContent = produit.color
    const p2 = document.createElement("p")
    p2.textContent = produit.price + "€"
    const divContentSettings = document.createElement("div")
    divContentSettings.classList.add("cart__item__content__settings")
    const p3 = document.createElement("p")
    p3.textContent = "Qté : " 
    const divContentSettingsQuantity = document.createElement("div")
    divContentSettingsQuantity.appendChild(p3)
    divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
    const input = document.createElement("input")
    const divDeleteSettings = document.createElement("div")
    divDeleteSettings.classList.add("cart__item__content__settings__delete")
    divDeleteSettings.addEventListener("click", () => deleteProduit(produit) )
    const p4 = document.createElement("p")
    p4.textContent = "Supprimer"
    function deleteProduit(produit) {
        const produitDelete = panier.findIndex((product) => product.id === produit.id && product.color === produit.color)
        panier.splice(produitDelete, 1)
        displayTotalQuantity()
        displaytotalPrice()
        deleteDataFromCart(produit)
        deleteArticlefromPage(produit)
    }
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = produit.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(produit.id, input.value, produit))
    divContentDescription.appendChild(h2)
    divContentDescription.appendChild(p)
    divContentDescription.appendChild(p2)
    divContent.appendChild(divContentDescription)
    divContent.appendChild(divContentSettings)
    divContentSettingsQuantity.appendChild(p3)
    divContentSettingsQuantity.appendChild(input)
    divContentSettings.appendChild(divContentSettingsQuantity)   
    divContentSettings.appendChild(divContentSettingsQuantity)
    divDeleteSettings.appendChild(p4)
    divContentSettings.appendChild(divDeleteSettings)
    return divContent
}
/*
function makeCardItemContentSettings(produit) {
    const divContentSettings = document.createElement("div")
    divContentSettings.classList.add("cart__item__content__settings")
    const divContentSettingsQuantity = document.createElement("div")
    divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
    const p3 = document.createElement("p")
    p3.textContent = "Qté : " +  produit.quantity
    const input = document.createElement("input")
    const divDeleteSettings = document.createElement("div")
    divDeleteSettings.classList.add("cart__item__content__settings__delete")
    const p4 = document.createElement("p")
    p4.textContent = "Supprimer"
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = produit.quantity
    divContentSettings.appendChild(input)
    divContentSettingsQuantity.appendChild(p3)
    divContentSettings.appendChild(divContentSettingsQuantity)
    divDeleteSettings.appendChild(p4)
    divContentSettings.appendChild(divDeleteSettings)
    return divContentSettings
}
*/


function displaytotalPrice(produit) {
    let total = 0
    const totalPrice = document.querySelector('#totalPrice')
    panier.forEach(produit => {
        const totalUnitPrice = produit.price * produit.quantity
        total = total + totalUnitPrice
    })
    totalPrice.textContent = total

}

function displayTotalQuantity (produit) {
    let totalQ = 0
    const totalQuantity = document.querySelector('#totalQuantity')
    panier.forEach(produit => {
        const totalUnitQuantity = produit.quantity
        totalQ = totalQ + totalUnitQuantity
    })
    totalQuantity.textContent = totalQ
}

function updatePriceAndQuantity(id, newValue, produit) {
    const produitUpdate = panier.find((produit) => produit.id === id)
    produitUpdate.quantity = Number(newValue)
    produit.quantity = produitUpdate.quantity
    displayTotalQuantity()
    displaytotalPrice()
    saveNewData(produit)
}

function saveNewData(produit) {
    const dataSave = JSON.stringify(produit)
    const key = `${produit.id}-${produit.color}`
    localStorage.setItem(key, dataSave)
}

function deleteDataFromCart(produit) {
    const key = `${produit.id}-${produit.color}`
    localStorage.removeItem(key)
}

function deleteArticlefromPage(produit) {
    const articleToDelete = document.querySelector(`article[data-id="${produit.id}"][data-color="${produit.color}"]`)
    articleToDelete.remove()
}

function commander(e) {
    e.preventDefault()
    if (panier.length === 0) {
        alert("Merci d'ajouter des produits dans votre panier")
        return
    }

    if (invalidForm()) return
    if (emailInvalid()) return

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const orderId = data.orderId
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId 
    })
    .catch((err) => console.error(err))
}

function invalidForm() {
    const form = document.querySelector('.cart__order__form')
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Merci de remplir tout les champs")
            return true
        }
        return false
    })
}

function emailInvalid() {
    const email = document.querySelector('#email').value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Merci d'entrer une adresse email valide")
        return true
    } 
    return false
}

function makeRequestBody() {
    const form = document.querySelector('.cart__order__form')
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromStorage()
    }
    console.log(body)
    return body
}

function getIdsFromStorage() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}








