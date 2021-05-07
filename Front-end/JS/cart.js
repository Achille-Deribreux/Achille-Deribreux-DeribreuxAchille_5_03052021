const getCartHead = document.getElementById("cart-head-insert");
const getCartBody = document.getElementById("cart-body-insert");
let nbArticles = localStorage.getItem("nombreArticles");

if (nbArticles == null){
    getCartHead.innerHTML = "<p> Désolé, votre panier est vide </p>"
}else{
    getCartHead.innerHTML = `
    <tr>
      <th scope="col">Quantité</th>
      <th scope="col">Photo</th>
      <th scope="col">Nom</th>
      <th scope="col">Objectif</th>
      <th scope="col">Prix</th>
      <th scope="col">Supprimer</th>
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
            }
        }
    };
}

function addToCart(camera) {
    getCartBody.innerHTML +=`
    <tr id="${camera._id}">
        <td scope="col">1</td>
        <td scope="col"><img width=70px src="${camera.imageUrl}"/></td>
        <td scope="col">${camera.name}</td>
        <td scope="col">Objectif</td>
        <td scope="col">${priceWithSpace(camera.price)}€</td>
        <td scope="col"><p class="text-center"><i class="fas fa-trash"></i></p></td>
    </tr>
    `
}

// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};
main();
}
/*
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

function letTest(e){
console.log(e);
}

function affichePanier(cameras) {
    let dataID="5be1ed3f1c9d44000030b061";
    for (camera of cameras){
        if (dataID == camera["_id"]){
            addToCart(camera);
        }
    }

}

function addToCart(camera) {
    getElementById("tableBody").innerHTML +=`
    <tr>
        <td scope="col">1</td>
        <td scope="col">${camera.imageUrl}</td>
        <td scope="col">${camera.name}</td>
        <td scope="col">Objectif</td>
        <td scope="col">${priceWithSpace(camera.price)}€</td>
        <td scope="col">Supprimer</td>
    </tr>
    `

}

// Fonction changeant la forme du prix (49900 => 499€)
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};
main();*/