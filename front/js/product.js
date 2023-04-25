

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













