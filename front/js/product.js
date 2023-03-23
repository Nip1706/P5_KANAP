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

        for (let cpt = 0; cpt < data.colors.length; cpt++) {
			choixCouleurProduit(data.colors[cpt]);
		}
    
    })


    .catch((error) => {
        console.log('Erreur de connexion avec le serveur : ', error);
        window.alert('Connexion au serveur impossible !');
    });

}


afficherDetailProduit();
function choixCouleurProduit(varChoice) {
	const varOption = document.createElement('option');
	varOption.value = varChoice;
	varOption.textContent = varChoice;
	const parent = document.querySelector('#colors');
	parent.appendChild(varOption)
}
