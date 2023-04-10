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
        if (color == null || color === "" || quantity == null || quantity == 0){
            event.preventDefault();
            alert("Merci de bien vouloir séléctionner la couleur et saisir une quantité valide (1-100)");
            return
        }
        enregistrerPanier (color, quantity);
        window.location.href = "cart.html"
    })    
}

function enregistrerPanier (color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id : id,
        color : color,
        quantity : Number (quantity),
        price : itemPrice,
        imageUrl : imgUrl,
        description : descriptproduit,
        name : altText
    }
    localStorage.setItem(key, JSON.stringify(data));  

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

  



    




















