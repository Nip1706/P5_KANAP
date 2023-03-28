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
    const cardItemContentSettings = makeCardItemContentSettings(produit)
    article.appendChild(cardItemContentSettings)
    const deleteSettings = makeDeleteSettings(produit)
    article.appendChild(deleteSettings)
    displayArticle(article);
    displaytotalQuantity(produit)
}

function displaytotalQuantity(produit) {
    const totalQuantity = document.querySelector('#totalQuantity')
    totalQuantity.textContent = produit.quantity
}


function makeDeleteSettings() {
    const divContentSettings = document.createElement("div")
    const divDeleteSettings = document.createElement("div")
    divDeleteSettings.classList.add("cart__item__content__settings__delete")
    const p4 = document.createElement("p")
    p4.textContent = "Supprimer"
    divDeleteSettings.appendChild(p4)
    divContentSettings.appendChild(divDeleteSettings)
    return divContentSettings
}

function makeCardItemContentSettings(produit) {
    const divContentSettings = document.createElement("div")
    divContentSettings.classList.add("cart__item__content__settings")
    const divContentSettingsQuantity = document.createElement("div")
    divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
    const p3 = document.createElement("p")
    p3.textContent = "Qté : " +  produit.quantity
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = produit.quantity
    divContentSettings.appendChild(input)
    divContentSettingsQuantity.appendChild(p3)
    divContentSettings.appendChild(divContentSettingsQuantity)
    return divContentSettings
}

function makeCardItemContent(produit) {
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
    const divContentDescription = document.createElement("div")
    divContentDescription.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = produit.name
    const p = document.createElement("p")
    p.textContent = produit.color
    const p2 = document.createElement("p")
    p2.textContent = produit.price + "€"
    divContentDescription.appendChild(h2)
    divContentDescription.appendChild(p)
    divContentDescription.appendChild(p2)
    divContent.appendChild(divContentDescription)
    return divContent
}

function displayArticle(article) {
    document.querySelector('#cart__items').appendChild(article)
    
}

function makeArticle(produit) {
    const article = document.createElement('article')
    article.classList.add("cart__items")
    article.dataset.id = produit.id
    article.dataset.color = produit.color
    return article
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