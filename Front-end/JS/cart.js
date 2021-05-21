const getCartHead = document.getElementById("cart-head-insert");
const getCartBody = document.getElementById("cart-body-insert");
const getCartFoot = document.getElementById("cart-foot-insert");
const getFormSection = document.getElementById("insert-form")
// Récupération Formulaire
const getForm = document.getElementById("cartForm");
const getFormFirstName = document.getElementById("inputFirstName");
const getFormName = document.getElementById("inputName");
const getFormEmail = document.getElementById("inputEmail");
const getFormAdress1 = document.getElementById("inputAddress");
const getFormCity = document.getElementById("inputCity");
const getFormCgv = document.getElementById("inputCgv");
const getSubmitButton = document.getElementById("submitButton");

//regex
const textRegex = new RegExp(/^[a-zA-Z\s,'-]*$/);
const mailRegex = new RegExp(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/);

const getCart = document.getElementById("number-to-insert"); // Récupère le span ou le nombre d'articles compris dans le panier va s'afficher 
let nbArticles = localStorage.getItem("nombreArticles");
let prixPanier = [];
let prixTotalPanier=0;

//SetPanier
let products=[];

//Création du panier si panier
if (nbArticles == 0){
    getCartHead.innerHTML = "<p> Désolé, votre panier est vide </p>"
}else{
    getCartHead.innerHTML = `
    <tr>
      <th class="text-center" scope="col">Quantité</th>
      <th class="text-center" scope="col">Photo</th>
      <th class="text-center" scope="col">Nom</th>
      <th class="text-center" scope="col">Objectif</th>
      <th class="text-center" scope="col">Prix</th>
      <th class="text-center" scope="col">Supprimer</th>
    </tr>`

    getCartFoot.innerHTML = `
    <tr class="mt-3">
    <td scope="col" class="text-center" colspan="3"><strong>Total :<strong/></td>
    <td scope="col" class="text-center" colspan="3"> <strong id="totalPrice"><strong/></td>
    </tr>`
    listenInputs();
    main();
}

// Déclaration des fonctions
function main(){
    //connexion à l'API
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response){
            return response.json()
        })
        .then(function(cameras){
            affichePanier(cameras);
            getCart.innerHTML = localStorage.getItem("nombreArticles"); //Ajoute le nb d'articles au panier près de la petite icone panier du header
            getCartBody.querySelectorAll('.delete').forEach((item) => {
                item.addEventListener('click', (event) => {
                    localStorage.setItem(item.getAttribute('id'),0);
                    location.reload();
                })
            });
        })
        .catch(function(err){
            alert(err)
        })
}

function affichePanier(cameras) {
        for (camera of cameras){
            if (parseInt(localStorage.getItem(camera._id)) > 0){
                addToCart(camera);
                prixPanier.push((camera.price/100)*localStorage.getItem(camera._id));
            }
        }
        calculatePrice()     
}

function calculatePrice(){
    for (i in prixPanier){
        prixTotalPanier += prixPanier[i];
    }
    prixTotalPanier = prixTotalPanier.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    localStorage.setItem("prixTotal", prixTotalPanier);
    document.getElementById('totalPrice').innerHTML =prixTotalPanier + "€";
}

function addToCart(camera) {
    for (let i = 0; i < localStorage.getItem(camera._id);i++){
        products.push(camera._id);
    }
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

function listen(){
    getCartBody.querySelectorAll('.qtyInput').forEach((item) => {
        item.addEventListener('change', (event)=>{
           localStorage.setItem(item.getAttribute('data-id'),item.value);
           location.reload();
        });
    });
}
// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

// Fonctions formulaire
function listenInputs(){
    getForm.classList.remove("hidden");
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
    getSubmitButton.addEventListener('click', (event) => {
        let checkConditions = true;
        submitForm(checkConditions);
    })
}

function submitForm(checkConditions){
    if(getFormFirstName.value == ""){// Check si prénom vide
        alert("Veuillez entrer un prénom");
    }else if(textRegex.test(getFormFirstName.value) != true){// Check si prénom valide
        alert("Veuillez entrer un prénom correct");
    }else if(getFormName.value == ""){//Check si nom vide
        alert("Veuillez entrer un nom");
    }else if(textRegex.test(getFormName.value) != true){//Check si nom valide
        alert("Veuillez entrer un nom correct");
    }else if(getFormEmail.value == ""){//Check si email vide
        alert("Veuillez entrer une adresse email");
    }else if(mailRegex.test(getFormEmail.value ) != true){//Check si email valide
        alert("Veuillez entrer une adresse mail correcte");
    }else if(getFormAdress1.value == ""){//Check si Adresse vide
        alert("Veuillez entrer une adresse");
    }else if(getFormCity.value == ""){//Check si ville vide
        alert("Veuillez entrer une ville");
    }else if(textRegex.test(getFormCity.value) != true){//Check si ville valide
        alert("Veuillez entrer une ville correcte");
    }else if(!getFormCgv.checked){//Check si les cgv sont acceptées
        alert("Veuillez accepter les cgv")
    }else{
        sendToApi();
    }
}

 //Envoyer l'objet à l'api ?? 
 function sendToApi(){
    //DEBUTS TESTS
    let postRequestUrl = 'http://localhost:3000/api/cameras/order';
let contact = 
{
    firstName: getFormFirstName.value,
    lastName: getFormName.value,
    address: getFormAdress1.value,
    city : getFormCity.value,
    email: getFormEmail.value,
}
let body = {contact, products}

    //FIN TESTS
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
