
const emptyCart = document.getElementById("cart__items");

// Récupération du localStorage
stockItem = localStorage;
let cart = JSON.parse(stockItem.getItem("products"));
let orderId = "";
console.log(orderId)

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



