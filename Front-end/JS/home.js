// ---------------------------------------- AFFICHAGE DES PRODUITS SUR PAGE D'ACCUEIL ---------------------------------------- //

// Initialisation 
const getProductListDiv = document.getElementById("product-list"); //Récupère la div dans laquelle les produits vont s'afficher
const getCart = document.getElementById("number-to-insert"); // Récupère le span ou le nombre d'articles compris dans le panier va s'afficher 
localStorage.clear(); // remet le localstorage à 0


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
            if(parseInt(localStorage.getItem("nombreArticles")) > 0){
                getCart.innerHTML = localStorage.getItem("nombreArticles"); //Ajoute le nb d'articles au panier près de la petite icone panier du header
            }
            //querySelector reprenant chaque bouton ajouter au panier et forEach ajoutant un eventListener sur chacun
            getProductListDiv.querySelectorAll('.add-to-cart').forEach((item) => {
                if(!localStorage.getItem(item.getAttribute('id'))){
                    localStorage.setItem(item.getAttribute('id'),0);
                }
                if(!localStorage.getItem("nombreArticles")){
                    localStorage.setItem("nombreArticles",0);
                }
                item.addEventListener('click', (event) => {
                event.preventDefault() //Empeche la redirection du bouton
                countArticles = parseInt(localStorage.getItem("nombreArticles"))+1; //incrémente le nb d'articles au panier
                localStorage.setItem("nombreArticles",countArticles);
                getCart.innerHTML = localStorage.getItem("nombreArticles"); //Ajoute le nb d'articles au panier près de la petite icone panier du header
                increaseQuantity(item);
                ;})
            })
        })
        //Si erreur pour se connecter à l'api, nous affiche l'erreur
        .catch(function(err){
            alert(error)
        })
}

//Fonction permettant l'affichage du formulaire et la mise en forme des celulles dynamiquement, selon l'entrée de l'utilisateur
function increaseQuantity (item){
    let countQuantity = parseInt(localStorage.getItem(item.getAttribute('id')));
    countQuantity += 1;
    localStorage.setItem(item.getAttribute('id'),countQuantity);
}

//fonction affichant les appareils 1 par 1 sur la page d'accueil
function displayCameras(camera) {
    getProductListDiv.innerHTML += `
                <div class="col-md-4 col-sm-12 mb-4">      
                <div class="card">
                <a href="product.html?id=${camera._id}">
                    <img class="card-img-top imgC" src="${camera.imageUrl}" alt="Card image cap">
                </a>
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p>
                        <p class="card-text text-center"><strong>${priceWithSpace(camera.price)}€</strong></p>
                        <div class="text-center">
                            <a href="#" class="btn btn-secondary add-to-cart" id="${camera._id}"><i class="fas fa-cart-plus"></i> <br> Ajouter au panier</a>
                        </div>
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
