

async function afficherListeProduits() {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            composant = data[i];
            document.querySelector('#items').innerHTML += `
            <a href="./product.html?id=${composant._id}">
            <article>
                <img src="${composant.imageUrl}" alt="${composant.altTxt}">
                <h3 class="productName">${composant.name}</h3>
                <p class="productDescription">${composant.description}</p>
            </article>
        </a>`;

        }
    })
    .catch((error) => {
        console.log('Erreur de connexion avec le serveur : ', error);
        window.alert('Connexion au serveur impossible !');
    });

}

afficherListeProduits();
