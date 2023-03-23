const url = new URL(window.location.href);
const urlBase = "http://localhost:3000/api/products/";
const id = url.searchParams.get("id");

async function afficherDetailProduit() {
    console.log(id);
    fetch(urlBase + id)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let nomProduit = document.getElementById("title");
        nomProduit.innerHTML = data.name
        let prixProduit = document.getElementById("price");
        prixProduit.innerHTML = data.price
        let descriptionProduit = document.getElementById("description");
        descriptionProduit.innerHTML = data.description

        for (let nb = 0; nb < data.colors.length; nb++) {
			choixCouleurProduit(data.colors[nb]);
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

document.getElementById('addToCart').addEventListener('click', controlQuantiteProduit);

function controlQuantiteProduit () {
    const quantiteProduit = document.getElementById('quantity').value;
    if (quantiteProduit != null) {
        if ( quantiteProduit < 0) document.getElementById('quantity').value = 0;
        if ( quantiteProduit > 100) document.getElementById ('quantity'). value = 100;
    }
}

controlQuantiteProduit();



