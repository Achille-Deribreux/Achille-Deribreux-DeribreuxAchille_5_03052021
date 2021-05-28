confirmationData = localStorage.getItem("orderConfirmation");
confirmationObject = JSON.parse(confirmationData);
totalPrice = 0;
for(let i = 0;i<confirmationObject.products.length;i++){
    totalPrice += parseInt(confirmationObject.products[i].price)/100
}
getEmailInsert = document.getElementById("mailInsert");
getOrderNumberInsert = document.getElementById("orderNumberInsert");
getPriceInsert = document.getElementById("priceInsert");
getAddress = document.getElementById("insertAddress");
console.log(confirmationObject);
getOrderNumberInsert.innerHTML = (confirmationObject.orderId)
getPriceInsert.innerHTML = (totalPrice)
getAddress.innerHTML=(confirmationObject.contact.address+" "+confirmationObject.contact.city)
getEmailInsert.innerHTML=(confirmationObject.contact.email)
localStorage.clear();