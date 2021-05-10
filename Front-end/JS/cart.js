const getCartHead = document.getElementById("cart-head-insert");
const getCartBody = document.getElementById("cart-body-insert");
const getCartFoot = document.getElementById("cart-foot-insert");
let nbArticles = localStorage.getItem("nombreArticles");
let cartCounter;
if (nbArticles == null){
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
    
  function main(){
    //connexion à l'API
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response){
            return response.json()
        })
        .then(function(cameras){
            affichePanier(cameras);
        })
        .catch(function(err){
            alert(err)
        })
}

function affichePanier(cameras) {
    for (let i = 0; i <= nbArticles; i++ ){
        dataID= localStorage.getItem(i);
        for (camera of cameras){
            if (dataID == camera._id){
                addToCart(camera);
                totalPrice(camera);
            }
        }
    };
}

function addToCart(camera) {
    getCartBody.innerHTML +=`
    <tr id="${camera._id}">
        <td class="text-center" scope="col">${localStorage.getItem(camera._id)}</td>
        <td class="text-center" scope="col"><img width=70px src="${camera.imageUrl}"/></td>
        <td class="text-center" scope="col">${camera.name}</td>
        <td class="text-center" scope="col">Objectif</td>
        <td class="text-center" scope="col">${priceWithSpace(camera.price)}€</td>
        <td class="text-center" scope="col"><p class="text-center"><i class="fas fa-trash"></i></p></td>
    </tr>
    `
}

// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

function totalPrice(camera){
    
}

getCartFoot.innerHTML = `
<tr class="mt-3">
  <td scope="col" colspan="2"></td>
  <td scope="col" class="text-center" colspan="2"><strong>Total :<strong/></td>
  <td scope="col" class="text-center" colspan="2"> <strong>2199€<strong/></td>
</tr>`

main();
}