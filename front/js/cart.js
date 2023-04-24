
const emptyCart = document.getElementById("cart__items");

// Récupération du localStorage
stockItem = localStorage;
let cart = JSON.parse(stockItem.getItem("products"));
let orderId = "";

// Mise à jour du panier
function getCart() {
  return JSON.parse(stockItem.getItem("products"));
}

// Affichage des produits du panier
function showCart() {
  
// Si le localstorage contient des produits
if (cart != null) {
  for (i = 0; i < cart.length; i++) {
    let id = cart[i][0]["id"];
    let color = cart[i][0]["color"];
    let quantity = cart[i][0]["quantity"];
    let url = "http://localhost:3000/api/products/" + id;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      emptyCart.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                  <div class="cart__item__img">
                      <img src="${data.imageUrl}" alt="${data.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__description">
                          <h2>${data.name}</h2>
                          <p>${color}</p>
                          <p>${data.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p> Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" data-id="${id}" data-color="${color}" min="1" max="100" value="${quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;
        listenItem();
        listenItemDelete();
    })
  }
  calcul();
  }
}
  showCart();


// Calcul du prix total et de la quantité totale
function calcul () {
  let cartUpdate = getCart();
  let price = 0;
  let totalQuantity = 0;
  if (cartUpdate.length == 0){
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
    document.querySelector("#totalPrice").innerHTML = price;
  }
      for (i = 0; i < cartUpdate.length; i++) {
        let id = cartUpdate[i][0]["id"];
        let quantity = cartUpdate[i][0]["quantity"];
        let url = "http://localhost:3000/api/products/" + id;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          price = price + parseInt(data.price * quantity);
          totalQuantity = totalQuantity + parseInt(quantity);
          document.querySelector("#totalQuantity").innerHTML = totalQuantity;
          document.querySelector("#totalPrice").innerHTML = price;
        })
      }
    }

  // Modification de la quantité
function listenItem() {
  let quantityIn = document.querySelectorAll(".itemQuantity");
  for (i = 0; i < quantityIn.length; i++) {
    quantityIn[i].addEventListener("change", (event) => {
      event.preventDefault();
      changeQuantity(event);
    }
 )}
}
function changeQuantity(event) {
    let cart = JSON.parse(stockItem.getItem("products"));
    const inputValue = event.target.value;
    const dataId = event.target.getAttribute("data-id");
    const dataColor = event.target.getAttribute("data-color");
  
    for(item of cart) {
      if (item[0].id === dataId && item[0].color === dataColor) {
        item[0].quantity = inputValue;
      }
    }
  
    // Mise à jour du localStorage
    let itemsString = JSON.stringify(cart);
    stockItem.setItem("products", itemsString);
    calcul();
  }
  
    // Suppression d'un article
    function listenItemDelete () {
        const deleteButtons = document.querySelectorAll(".deleteItem");
        deleteButtons.forEach((deleteButton) => {
          deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            deleteItem(event);
          });
        });
      }
      
      function deleteItem(event) {
        let articles = document.querySelectorAll(".cart__item");
        let cart = JSON.parse(stockItem.getItem("products"));
        const element = event.currentTarget.closest(".cart__item");
        const deleteId = element.getAttribute("data-id");
        const deleteColor = element.getAttribute("data-color");
        cart = cart.filter(
          (element) => !(element[0].id == deleteId && element[0].color == deleteColor)
        );
        element.remove();
        // Mise à jour du localStorage
        stockItem.setItem("products", JSON.stringify(cart));
        alert("Article supprimé du panier.");
        calcul();
      }
          //LE FORMULAIRE

// sélection du bouton Valider
const btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  /* GESTION DU FORMULAIRE */

  // Regex pour le contrôle des champs Prénom, Nom et Ville
  const regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  // Regex pour le contrôle du champ Adresse
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  // Regex pour le contrôle du champ Email
  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonctions de contrôle du champ Prénom:
  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      inputFirstName.style.backgroundColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      inputFirstName.style.backgroundColor = "#FF6F61";

      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ Prénom de formulaire invalide, ex: Jeanne";
      return false;
    }
  }

  // Fonctions de contrôle du champ Nom:
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (regExPrenomNomVille(nom)) {
      inputLastName.style.backgroundColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ Nom de formulaire invalide, ex: Dupont";
      return false;
    }
  }

  // Fonctions de contrôle du champ Adresse:
  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (regExAdresse(adresse)) {
      inputAddress.style.backgroundColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";

      document.querySelector("#addressErrorMsg").textContent =
        "Champ Adresse de formulaire invalide, ex: 10 rue de la paix";
      return false;
    }
  }

  // Fonctions de contrôle du champ Ville:
  function cityControl() {
    const ville = contact.city;
    let inputCity = document.querySelector("#city");
    if (regExPrenomNomVille(ville)) {
      inputCity.style.backgroundColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";

      document.querySelector("#cityErrorMsg").textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }
  }

  // Fonctions de contrôle du champ Email:
  function mailControl() {
    const courriel = contact.email;
    let inputMail = document.querySelector("#email");
    if (regExEmail(courriel)) {
      inputMail.style.backgroundColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputMail.style.backgroundColor = "#FF6F61";

      document.querySelector("#emailErrorMsg").textContent =
        "Champ Email de formulaire invalide, ex: example@adresse.fr";
      return false;
    }
  }

  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistrer le formulaire dans le local storage
    stockItem.setItem("contact", JSON.stringify(contact));

    document.querySelector("#order").value =
      " Passer commande !";
    sendToServer();
  } else {
     error("Veuillez vérifier le formulaire");
  }

  /* FIN GESTION DU FORMULAIRE */

  /* REQUÊTE DU SERVEUR ET POST DES DONNÉES */
  function sendToServer() {
    let cartUpdate = getCart();
    let products = [];
    for (let i = 0; i < cartUpdate.length; i++) {
      products.push(cartUpdate[i][0].id);
    }
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Récupération et stockage de la réponse de l'API (orderId)
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
      }).catch(function (err) {
      });

    // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId;
    }
  }
});

/* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES */

// Maintenir le contenu du localStorage dans le champs du formulaire

let dataFormulaire = JSON.parse(stockItem.getItem("contact"));

if (dataFormulaire) {
  document.querySelector("#firstName").value = dataFormulaire.firstName;
  document.querySelector("#lastName").value = dataFormulaire.lastName;
  document.querySelector("#address").value = dataFormulaire.address;
  document.querySelector("#city").value = dataFormulaire.city;
  document.querySelector("#email").value = dataFormulaire.email;
} else {
  console.log("Le formulaire est vide");
}



/*
const btnCommander = document.querySelector('#order')
btnCommander.addEventListener('click', (e) => commander(e))

const panier = [];



function recuperationProduits () {

    const nombreProduit = localStorage.length;
    for (let i = 0; i < nombreProduit; i++) {
        const produit = localStorage.getItem(localStorage.key(i));
        const produitObjet = JSON.parse(produit);
        panier.push(produitObjet)
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
    //retournerPrix(produit.id)
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
    console.log(produit.price)
    console.log(produit.color)

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
            return false
        }
        return true
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
}


*/





