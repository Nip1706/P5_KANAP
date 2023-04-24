//Recupération d'un produit avec son ID depuis l'API
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

//On vide le local storage après que la commande soit passée
localStorage.clear();

/*
const orderId = getOrderId()
displayOrderId(orderId)
deleteAllStorage()


function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}


function displayOrderId(orderId) {
    const elementOrderId = document.getElementById("orderId")
    elementOrderId.textContent = orderId
}

function deleteAllStorage() {
    const storage = window.localStorage
    storage.clear()
}
*/
