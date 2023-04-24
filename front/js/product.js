

//Recupération d'un produit avec son ID depuis l'API
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");

//Affichage du produit sur la page produit
let requestProduct = function () {
    fetch("http://localhost:3000/api/products/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
 // Image
 let img = document.querySelector(".item__img");
 img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
 // Nom du produit et titre
 let name = document.getElementById("title");
 name.innerHTML = data.name;
 let title = document.querySelector("title");
 title.innerHTML = data.name;
 // Prix
 let price = document.getElementById("price");
 price.innerHTML = `${data.price}`;
 // Description
 let description = document.getElementById("description");
 description.innerHTML = data.description;
 // Couleurs
 let color = document.getElementById("colors");
 for (i = 0; i < data.colors.length; i++) {
   color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
 }
});
};
requestProduct();

//Bouton ajouter au panier
let cartButton = document.getElementById("addToCart");

//Ajout au panier au clic
cartButton.addEventListener('click',function(event) {
  if ((document.getElementById("colors").value == "") || (document.getElementById("quantity").value < 1) || (document.getElementById("quantity").value > 100)) {
    alert("Veuillez sélectionner une couleur ou une quantité entre 1 et 100");
    event.preventDefault(); 
  } else {
   // Création d'un array avec id, couleur et quantité
  let qty = document.getElementById("quantity").value;
  let color = document.getElementById("colors").value;
    let arrayItems = [{
      id: id,
      color: color,
      quantity: qty,
    }];

    // Récupération des données du localStorage
    stockItem = localStorage;
    let existingCart = JSON.parse(stockItem.getItem("products"));

    let loop = 0;
    
     if (existingCart === null ) {
      existingCart = [];
      existingCart.push(arrayItems);
      alert("Votre article a bien été ajouté au panier");
      event.preventDefault(); 
      stockItem.setItem("products", JSON.stringify(existingCart));
     } else {
        for (let i = 0; i < existingCart.length; i++) {
          if (existingCart[i][0]["id"] === id && existingCart[i][0]["color"] === color) {
            let newQty = parseInt(existingCart[i][0]["quantity"]) + parseInt(qty);
            if (newQty <= 100) {
              existingCart[i][0]["quantity"] = newQty;
              loop++;
              alert("Votre article a bien été ajouté au panier");
              event.preventDefault(); 
            } else {
              alert("Veuillez vérifier que la quantité totale du produit est comprise entre 1 et 100");
              event.preventDefault(); 
              return 0;
            }    
          } 
          }

      if (loop == 0) {
        existingCart.push(arrayItems);
        alert("Votre article a bien été ajouté au panier");
        event.preventDefault(); 
      } 
      stockItem.setItem("products", JSON.stringify(existingCart));
      }
  }
  })


/*
const url = new URL(window.location.href);
const urlBase = "http://localhost:3000/api/products/";
const id = url.searchParams.get("id");
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText
}


async function afficherDetailProduit() {
    console.log(id);
    fetch(urlBase + id)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let nomProduit = document.getElementById("title");
        nomProduit.innerHTML = data.name
        altText = data.name
        let prixProduit = document.getElementById("price");
        prixProduit.innerHTML = data.price
        itemPrice = data.price
        imgUrl = data.imageUrl
        let descriptionProduit = document.getElementById("description");
        descriptionProduit.innerHTML = data.description
        descriptproduit = data.description
        const imgProduit = document.createElement("img");
        document.querySelector(".item__img").appendChild(imgProduit);
        imgProduit.setAttribute("src", `${data.imageUrl}`)

        for (let i = 0; i < data.colors.length; i++) {
			choixCouleurProduit(data.colors[i]);
		}
    
    })

    .catch((error) => {
        console.log('Erreur de connexion avec le serveur : ', error);
        window.alert('Connexion au serveur impossible !');
    });

}

afficherDetailProduit();
function choixCouleurProduit(couleurChoix) {
	const couleurOption = document.createElement('option');
	couleurOption.value = couleurChoix;
	couleurOption.textContent = couleurChoix;
	const parent = document.querySelector('#colors');
	parent.appendChild(couleurOption)        
}


const button = document.querySelector("#addToCart");
if (button != null) {
    button.addEventListener("click", (event) => {
        const color = document.getElementById("colors").value
        const quantity = document.getElementById("quantity").value
        if (color === "" || quantity < 1 || quantity > 100 ){
            alert("Merci de bien vouloir séléctionner la couleur et saisir une quantité valide (1-100)");
            event.preventDefault();
        } else {
            enregistrerPanier (color, quantity);
        }
    })    
}

function enregistrerPanier (color, quantity, product) {
    const key = `${id}-${color}`
    const data = {
        id : id,
        color : color,
        quantity : Number (quantity),
        price : itemPrice,
        imageUrl : imgUrl,
        description : descriptproduit,
        name : altText,
    }
    

    localStorage.setItem(key, JSON.stringify(data));  

}



/*
const button = document.querySelector("#addToCart");
if (button != null) {
  button.addEventListener("click", (event) => {
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (color === "" || quantity < 1 || quantity > 100) {
      alert(
        "Merci de bien vouloir séléctionner la couleur et saisir une quantité valide (1-100)"
      );
      event.preventDefault();
    } else {
      enregistrerPanier(color, quantity);
    }
  });
}

let prixProduit;

async function getProductInfo(productId) {
  const response = await fetch(`/api/product/${productId}`);
  productInfo = await response.json();
}


function enregistrerPanier(color, quantity) {
  const id = url.searchParams.get("id"); 
  const key = `${id}-${color}`;
  const existingData = JSON.parse(localStorage.getItem(key));
  if (existingData) {
    existingData.quantity += Number(quantity);
    localStorage.setItem(key, JSON.stringify(existingData));
  } else {
    const data = {
      id: id,
      color: color,
      quantity: Number(quantity),
      price: prixProduit.price,
      imageUrl: imgUrl,
      description: descriptproduit,
      name: altText,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }
}

/*

function enregistrerPanier(id, color, quantity) {
    const key = `${id}-${color}`;
    const data = {
      id: id,
      color: color,
      quantity: Number(quantity)
    };
    let stockagePanier = localStorage;
    let produits = JSON.parse(stockagePanier.getItem("products"));
    if (produits == null) {
      produits = [];
      produits.push(data);
      produits.push(key);
      stockagePanier.setItem("products", JSON.stringify(produits));
      alert("Votre produit a bien été ajouté au panier !");
    } else {
      let quantite = quantity;
      for (let i = 0; i < produits.length; i++) {
        if (produits[i].id == id && produits[i].color == color) {
          let nouvelleQuantite =
            parseInt(produits[i].quantity) + parseInt(quantite);
          produits[i].quantity = nouvelleQuantite;
          stockagePanier.setItem("products", JSON.stringify(produits));
          alert("La quantité du panier a été mise à jour");
          break;
        } else {
          produits.push(data);
          produits.push(key);
          stockagePanier.setItem("products", JSON.stringify(produits));
          alert("Votre article a été ajouté au panier");
          break;
        }
      }
    }
  }
  



// Fonction qui permet de controler la quantité indiqué pas l'utilisateur
/*function controlQuantiteProduit () {
    const quantiteProduit = document.getElementById('quantity').value;
    if (quantiteProduit != null) {
        if ( quantiteProduit <= 0){
            window.alert('La quantité ne peut pas être inférieure à 0');    
        } 
        if ( quantiteProduit > 100) {
            window.alert('La quantité ne peut pas être supérieure à 100');        
        }
    }
}

*/

/*
const boutonAjouterProduitPanier = document.getElementById("addToCart");
boutonAjouterProduitPanier.addEventListener ("click", (event) => {
    let quantite = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;
    if (color == "" || quantite < 1 || quantite > 100) {
        alert("Merci de bien vouloir séléctionner la couleur et saisir une quantité valide (0-100)");
        event.preventDefault();
    } else {
        let produitPanier = [{
            id : id,
            color : color,
            quantity : quantite
        }]
        stockagePanier = localStorage
        let produits = JSON.parse(stockagePanier.getItem("products"))
        if ( produits == null){
            produits = []
            produits.push(produitPanier)
            stockagePanier.setItem("products", JSON.stringify(produits))
            alert("Votre article a été ajouté au panier");
        } else {
            for (let i = 0; i < produits.length; i++) {
                if (produits[i][0]["id"] == id && produits[i][0]["color"] == color){
                    let nouvelleQuantite = parseInt(produits[i][0]["quantity"]) + parseInt(quantite);
                    produits[i][0]["quantity"] = nouvelleQuantite
                    stockagePanier.setItem("products", JSON.stringify(produits))
                    alert("La quantité du panier a été mis à jour")
                } else {
                    produits.push(produitPanier)
                    alert("Votre article a été ajouté au panier");
                }
                
            }
            
        }
    }
    });

    */

  



    



















