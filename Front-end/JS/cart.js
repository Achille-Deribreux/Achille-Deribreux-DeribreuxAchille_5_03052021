const getCartHead = document.getElementById("cart-head-insert");
const getCartBody = document.getElementById("cart-body-insert");
const getCartFoot = document.getElementById("cart-foot-insert");
const getCart = document.getElementById("number-to-insert"); // Récupère le span ou le nombre d'articles compris dans le panier va s'afficher 
let nbArticles = localStorage.getItem("nombreArticles");
let prixPanier = [];
let prixTotalPanier=0;



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
        for (i in prixPanier){
            prixTotalPanier += prixPanier[i];
        }
        prixTotalPanier = prixTotalPanier.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        document.getElementById('totalPrice').innerHTML =prixTotalPanier + "€";     
}

function addToCart(camera) {
    getCartBody.innerHTML +=`
    <tr>
        <td class="text-center" scope="col">${localStorage.getItem(camera._id)}</td>
        <td class="text-center" scope="col"><img width=70px src="${camera.imageUrl}"/></td>
        <td class="text-center" scope="col">${camera.name}</td>
        <td class="text-center" scope="col">${camera.lenses[0]}</td>
        <td class="text-center" scope="col">${priceWithSpace(camera.price)}€</td>
        <td class="text-center delete" id="${camera._id}" scope="col"><p class="text-center"><i class="fas fa-trash"></i></p></td>
    </tr>
    `
}

// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

getCartFoot.innerHTML = `
<tr class="mt-3">
  <td scope="col" class="text-center" colspan="2"><strong>Total :<strong/></td>
  <td scope="col" class="text-center" colspan="2"> <strong id="totalPrice"><strong/></td>
  <td scope="col" class="text-center" colspan="2"> <a class=" btn btn-secondary" href="#">Continuer</a></td>
</tr>`

main();
}

// Commenter un petit peu le code partout pour savoir quoi