//let getProductDiv = document.getElementById("product-list");

async function main(){
    const appareils = await getAppareils()
    for (appareil of appareils){
    displayAppareils(appareil)
    }
}

function getAppareils(){
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response){
            return response.json()
        })
        .then(function(appareils){
            return appareils
            //console.log(appareils);
        }
        )
        .catch(function(err){
            alert(error)
        })
}

function displayAppareils(camera) {
    document.getElementById("product-list").innerHTML += `
                <div class="col-md-4 col-sm-12 mb-4">      
                <div class="card">
                <a href="product.html?id=${camera._id}">
                    <img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
                </a>
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p>
                        <p class="card-text text-center"><strong>${priceWithSpace(camera.price)}€</strong></p>
                        <a href="#" class="btn btn-primary">Découvrir</a>
                    </div>
                </div>
            </div>
    `
}
function priceWithSpace(price){
    price = price/100;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
main();








/*
const fetchCameras = async() => {
    cameras = await fetch("http://localhost:3000/api/cameras").then(res=>res.json());
};



const showProductsOnHomePage = async() => {
    await fetchCameras();  
    getProductDiv.innerHTML = (
        cameras
            .map(camera => (
                
                `   
                <div class="col-md-4 col-sm-12 mb-4">      
                    <div class="card">
                    <a href="product.html?id=${camera._id}">
                        <img class="card-img-top" src="${camera.imageUrl}" alt="Card image cap">
                    </a>
                        <div class="card-body">
                            <h5 class="card-title">${camera.name}</h5>
                            <p class="card-text">${camera.description}</p>
                            <p class="card-text text-center"><strong>${priceWithSpace(camera.price)}€</strong></p>
                            <a href="#" class="btn btn-primary">Découvrir</a>
                        </div>
                    </div>
                </div>
                `
        )).join('')
    );
};*/

//showProductsOnHomePage();
