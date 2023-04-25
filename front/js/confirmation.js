//Recupération d'un produit avec son ID depuis l'API
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

//On vide le local storage après que la commande soit passée
localStorage.clear();

