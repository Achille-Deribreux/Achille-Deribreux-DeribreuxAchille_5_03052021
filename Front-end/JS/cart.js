//récupération des ID HTML
const getCart = document.getElementById("number-to-insert"); // Récupère le span ou le nombre d'articles compris dans le panier va s'afficher 
const getCartHead = document.getElementById("cart-head-insert");
const getCartBody = document.getElementById("cart-body-insert");
const getCartFoot = document.getElementById("cart-foot-insert");
const getFormSection = document.getElementById("insert-form");

// Récupération Formulaire
const getForm = document.getElementById("cartForm");
const getFormFirstName = document.getElementById("inputFirstName");
const getFormName = document.getElementById("inputName");
const getFormEmail = document.getElementById("inputEmail");
const getFormAdress1 = document.getElementById("inputAddress");
const getFormCity = document.getElementById("inputCity");
const getFormCgv = document.getElementById("inputCgv");
const getSubmitButton = document.getElementById("submitButton");

//Construction des Regex
const textRegex = new RegExp(/^[a-zA-Z\s,'-]*$/);
const mailRegex = new RegExp(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/);

//Déclaration des variables
let nbArticles = localStorage.getItem("nombreArticles");
let prixPanier = [];
let prixTotalPanier=0;
let products=[];

//___________________________________________________________________________________________________________________//

//Création du panier si au moins un article a été ajouté
if (nbArticles == 0){
    getCartHead.innerHTML = "<p class='text-center m-3 font-weight-bold'> Désolé, votre panier est vide </p>"
}else{
    listenInputs();
    main();
}

//_____________________FONCTIONS_________________________________________//

//Fonction main qui se connecte à l'api et apelle la fonction qui affiche le panier, écoute également pour les articles suprimés
function main(){
    //connexion à l'API
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response){
            return response.json()
        })
        .then(function(cameras){
            getCartBody.innerHTML ='';
            affichePanier(cameras); // Appel de la fonction qui va afficher les articles dans le panier
            getCart.innerHTML = localStorage.getItem("nombreArticles"); //Ajoute le nb d'articles au panier près de la petite icone panier du header
            getCartBody.querySelectorAll('.delete').forEach((item) => { //Ajoute l'écoute sur chaque icone .delete
                item.addEventListener('click', (event) => {  // Ecoute le "click" sur chaque icone poubelle
                    //Nb article total
                    nombreArticleInitial = parseInt(localStorage.getItem("nombreArticles"));
                    nombreItemInitial = parseInt(localStorage.getItem(item.getAttribute('id')));
                    nombreArticleFinal = nombreArticleInitial - nombreItemInitial;
                    localStorage.setItem("nombreArticles",nombreArticleFinal);
                    //FIN
                    localStorage.setItem(item.getAttribute('id'),0); //remet la quantité du produit sur 0 dans le localStorage
                    main(); //Rappelle la fonction main pour "actualiser" la page et ré afficher les bons éléments
                })
            });
        })
        .catch(function(err){
            alert(err) // Affiche l'erreur dans une alert si erreur 
        })
}

//Fonction triant les articles qui doivent être affichés dans le panier ou non, appelle également la fonction calculant le prix
function affichePanier(cameras) {
    prixPanier = [];
        for (camera of cameras){
            if (parseInt(localStorage.getItem(camera._id)) > 0){
                addToCart(camera);
                prixPanier.push((camera.price/100)*localStorage.getItem(camera._id));
            }
        }
        calculatePrice()     
}

//fonction calculant le prix total du panier et l'affichant dans l'ID souhaité, sous les articles
function calculatePrice(){
    prixTotalPanier = 0;
    for (i in prixPanier){
        prixTotalPanier += prixPanier[i];
    }
    prixTotalPanier = prixTotalPanier.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "); //Change l'affichage du prix
    document.getElementById('totalPrice').innerHTML = prixTotalPanier + "€"; // Affiche le prix total dans la page
}

//Construit le tableau products et crée l'article dans le panier
function addToCart(camera) {
    products = []
    for (let i = 0; i < localStorage.getItem(camera._id);i++){ //Envoie l'id des produits dans un tableau qui sera transmis à l'api
        products.push(camera._id); 
    }
    //Ajoute les éléments dans le panier en HTML/Bootstrap
    getCartBody.innerHTML +=` 
    <tr>
        <td class="text-center" scope="col"><input type="number" data-id="${camera._id}" class="text-center qtyInput" value="${localStorage.getItem(camera._id)}"/></td>
        <td class="text-center" scope="col"><img width=70px src="${camera.imageUrl}"/></td>
        <td class="text-center" scope="col">${camera.name}</td>
        <td class="text-center" scope="col">${camera.lenses[0]}</td>
        <td class="text-center" scope="col">${priceWithSpace(camera.price)}€</td>
        <td class="text-center delete" id="${camera._id}" scope="col"><p class="text-center"><i class="fas fa-trash"></i></p></td>
    </tr>
    `
    listen();
}

// Fonction permettant l'affichage du formulaire et la mise en forme des celulles dynamiquement, selon l'entrée de l'utilisateur
function listen(){
    getCartBody.querySelectorAll('.qtyInput').forEach((item) => {
        item.addEventListener('change', (event)=>{
            nombreItemInitial = parseInt(localStorage.getItem(item.getAttribute('data-id')));
            nombreArticleInitial = parseInt(localStorage.getItem("nombreArticles"));
            nombreArticleFinal = nombreArticleInitial + parseInt(item.value) - parseInt(nombreItemInitial);
            localStorage.setItem("nombreArticles",nombreArticleFinal);
            localStorage.setItem(item.getAttribute('data-id'),item.value);
            main()
        });
    });
}

// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

// Fonction écoutant le formulaire et ajoutant une mise en forme sur celui-ci, selon la donnée entrée (rouge mauvais, vert bon)
function listenInputs(){
    getForm.classList.remove("hidden");
    getCartFoot.classList.remove("hidden");
    getFormFirstName.addEventListener('input', (event) => {
        if (getFormFirstName.value != "" && textRegex.test(getFormFirstName.value) === true){
            getFormFirstName.classList.remove("is-invalid")
            getFormFirstName.classList.add("is-valid")
        }else{
            getFormFirstName.classList.remove("is-valid")
            getFormFirstName.classList.add("is-invalid")
        }
    })  
    getFormName.addEventListener('input', (event) => {
        if (getFormName.value != "" && textRegex.test(getFormName.value) === true){
            getFormName.classList.remove("is-invalid")
            getFormName.classList.add("is-valid")
        }else{
            getFormName.classList.remove("is-valid")
            getFormName.classList.add("is-invalid")
        }
    }) 
    getFormEmail.addEventListener('input', (event) => {
        if (getFormEmail.value != "" && mailRegex.test(getFormEmail.value) === true){
            getFormEmail.classList.remove("is-invalid")
            getFormEmail.classList.add("is-valid")
        }else{
            getFormEmail.classList.remove("is-valid")
            getFormEmail.classList.add("is-invalid")
        }
    })
    getFormAdress1.addEventListener('input', (event) => {
        if (getFormAdress1.value != ""){
            getFormAdress1.classList.remove("is-invalid")
            getFormAdress1.classList.add("is-valid")
        }else{
            getFormAdress1.classList.remove("is-valid")
            getFormAdress1.classList.add("is-invalid")
        }
    })
    getFormCity.addEventListener('input', (event) => {
        if (getFormCity.value != "" && textRegex.test(getFormCity.value) === true){
            getFormCity.classList.remove("is-invalid")
            getFormCity.classList.add("is-valid")
        }else{
            getFormCity.classList.remove("is-valid")
            getFormCity.classList.add("is-invalid")
        }
    })
}

//Fonction envoyant les données vers l'API et stockant la réponse dans le localStorage
function sendToApi(){
    let contact = 
    {
        firstName: getFormFirstName.value,
        lastName: getFormName.value,
        address: getFormAdress1.value,
        city : getFormCity.value,
        email: getFormEmail.value,
    }
    let body = {contact, products}

    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    })
   .then(response => response.json())
    .then((response) => {
        localStorage.setItem("orderConfirmation", JSON.stringify(response));
        window.location="./confirmation.html"
     })
      .catch(function(error) {
        alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      });
 }
