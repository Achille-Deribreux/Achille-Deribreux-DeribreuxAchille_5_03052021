confirmationData = localStorage.getItem("orderConfirmation");
totalPrice = localStorage.getItem("prixTotal");
confirmationObject = JSON.parse(confirmationData);

getEmailInsert = document.getElementById("mailInsert");
getOrderNumberInsert = document.getElementById("orderNumberInsert");
getPriceInsert = document.getElementById("priceInsert");
getAddress = document.getElementById("insertAddress");

getOrderNumberInsert.innerHTML = (confirmationObject.orderId)
getPriceInsert.innerHTML = (totalPrice)
getAddress.innerHTML=(confirmationObject.contact.address+" "+confirmationObject.contact.city)
getEmailInsert.innerHTML=(confirmationObject.contact.email)

localStorage.clear();