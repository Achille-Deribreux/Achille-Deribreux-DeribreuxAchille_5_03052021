const productId = (new URL(document.location)).searchParams.get('id');
const productUrl= "http://localhost:3000/api/cameras".concat('/', productId);
const getCart = document.getElementById("number-to-insert"); // Récupère le span ou le nombre d'articles compris dans le panier va s'afficher 
//console.log(productUrl);

function main(){
    return fetch(productUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(produit){
            displayProduit(produit);
        }
        )
        .catch(function(err){
            alert(error)
        })
}

function displayProduit(produit){
    document.getElementById("insert-js").innerHTML += 
    `
        <div class="container">
            <div class="row m-2 mb-5">
                <div class="col-12 col-lg-6">
                    <img width=100% src="${produit.imageUrl}"/>
                </div>
                <div class="col-12 col-lg-6 text-center">
                    <h4 class="m-3">${produit.name}</h4>
                    <h5 class="m-4"><strong>${priceWithSpace(produit.price)}€</strong></h5>
                    <select id="select" class="m-3">
                        ${getLensesOptions(produit)}
                    </select>
                    <div class="m-2">
                        <button id="addToCartButton" class="btn-lg btn-secondary"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
                    </div>
                    <div>
                        <h5 class="m-4">Description</h5>
                        <p>${produit.description}</p>
                    </div>
                </div>
            </div>
            <div class="row m-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <h2><i class="fas fa-credit-card"></i></span> Paiement Sécurisé</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis accusamus praesentium eveniet ad unde doloremque ex officia eius ab quibusdam.</p>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <h2><i class="fas fa-truck"></i></span> Livraison Gratuite !</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, mollitia natus amet eligendi consequuntur. Veritatis ullam debitis voluptas repellat laboriosam.</p>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <h2><i class="fas fa-sync-alt"></i> Retour gratuit</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, error, itaque non vel architecto ratione obcaecati doloribus delectus illum harum?</p>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <h2><i class="fas fa-stopwatch"></i>Livraison en 24h Chrono !</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, nam voluptate accusantium nulla distinctio odit aliquam voluptatem ab. Earum, voluptatibus.</p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        `
        document.getElementById('addToCartButton').addEventListener('click', (event) => {
            let countArticles = parseInt(localStorage.getItem("nombreArticles")); 
            countArticles = countArticles+1; //incrémente le nb d'articles au panier
            localStorage.setItem("nombreArticles",countArticles);
            getCart.innerHTML = countArticles; //Ajoute le nb d'articles au panier près de la petite icone panier du header
            increaseQuantity(produit._id);
            localStorage.setItem("countArticles",countArticles);
    
        });
}
function increaseQuantity (item){
    let countQuantity = localStorage.getItem(item);
    countQuantity = parseInt(countQuantity);
    countQuantity = countQuantity+1;
    localStorage.setItem(item,countQuantity);
}
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};


function getLensesOptions(produit) {
    let result = '';
    for (let i = 0, size = produit.lenses.length; i < size; i++) {
      result += ` <option data-id="${i}">${produit.lenses[i]}</option>`;
    }
    return result;
  }

main();


//Activer le bouton Add to cart, faire la mise en forme et faire en sorte de passer l'indice du i avec pour pouvoir récupérer le bon objectif dans le panier






















/*let getProductSection = document.getElementById("insert-js");
let productId = (new URL(document.location)).searchParams.get('id');
let productUrl= "http://localhost:3000/api/cameras".concat('/', productId);
console.log(productUrl);

const fetchProduct = async() => {
    products = await fetch(productUrl).then(res=>res.json());
};

const showProductsOnHomePage = async() => {
    await fetchProduct();  
    getProductSection.innerHTML = (
        products
            .map(product => (
                
                `   
                <p>${product.name}</p>
                `
        )).join('')
    );
};

showProductsOnHomePage();*/