const productId = (new URL(document.location)).searchParams.get('id');
const productUrl= "http://localhost:3000/api/cameras".concat('/', productId);
//console.log(productUrl);

function main(){
    return fetch(productUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(produit){
            displayProduit(produit);
            //console.log(produit);
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

    <div class="row">
        <div class="col-12 col-lg-6">
            <img width=100% src="${produit.imageUrl}"/>
        </div>

        <div class="col-12 col-lg-6">
            <h4>${produit.name}</h4>
            <h5><strong>${priceWithSpace(produit.price)}€</strong></h5>

            <select id="select">
                ${getLensesOptions(produit)}
            </select>

            <a class="btn btn-primary"><i class="fas fa-cart-plus"></i> Ajouter au panier</a>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <h5>Description</h5>
            <p>${produit.description}</p>
        </div>
    </div>

</div>
    `
    produit.lenses.forEach(item => {
        //console.log(item);
    });
}
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};


function getLensesOptions(produit) {
    let result = '';
    for (let i = 0, size = produit.lenses.length; i < size; i++) {
        console.log(produit.lenses[i]);
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