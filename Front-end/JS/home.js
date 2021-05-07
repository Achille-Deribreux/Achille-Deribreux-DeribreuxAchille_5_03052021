// ---------------------------------------- AFFICHAGE DES PRODUITS SUR PAGE D'ACCUEIL ---------------------------------------- //

// Initialisation 
const getProductListDiv = document.getElementById("product-list"); //Récupère la div dans laquelle les produits vont s'afficher
const getCart = document.getElementById("number-to-insert"); // Récupère le span ou le nombre d'articles compris dans le panier va s'afficher 
localStorage.clear(); // remet le localstorage à 0
var  countArticles = 0; // Initialise le nombre d'articles dans le panier

// Se connecte à l'API, affiche les appareils et ajoute un eventListener sur les boutons ajouter au panier
function main(){
    //connexion à l'API
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response){
            return response.json()
        })
        .then(function(cameras){
            //boucle appelant la fonction qui affihce les appareils sur la page d'accueil
            for (camera of cameras){
                displayCameras(camera);
            }
            //querySelector reprenant chaque bouton ajouter au panier et forEach ajoutant un eventListener sur chacun
            getProductListDiv.querySelectorAll('.add-to-cart').forEach((item) => {
                item.addEventListener('click', (event) => {
                event.preventDefault() //Empeche la redirection du bouton
                countArticles = countArticles+1; //incrémente le nb d'articles au panier
                localStorage.setItem("nombreArticles",countArticles);
                getCart.innerHTML = (countArticles); //Ajoute le nb d'articles au panier près de la petite icone panier du header
                localStorage.setItem(countArticles, item.getAttribute('data-id')); //Met le numéro d'article et data-id en storage
                ;})
            })
        })
        //Si erreur pour se connecter à l'api, nous affiche l'erreur
        .catch(function(err){
            alert(error)
        })
}

//fonction affichant les appareils 1 par 1 sur la page d'accueil
function displayCameras(camera) {
    getProductListDiv.innerHTML += `
                <div class="col-md-4 col-sm-12 mb-4">      
                <div class="card">
                <a href="product.html?id=${camera._id}">
                    <img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
                </a>
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p>
                        <p class="card-text text-center"><strong>${priceWithSpace(camera.price)}€</strong></p>
                        <a href="#" class="btn btn-secondary add-to-cart" data-id="${camera._id}" id="${camera._id}"><i class="fas fa-cart-plus"></i> <br> Ajouter au panier</a>
                    </div>
                </div>
            </div>
    `
}
// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};


//Appel de la fonction principale
main();
