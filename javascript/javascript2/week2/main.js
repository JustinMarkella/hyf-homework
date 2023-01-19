console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);
function renderProducts(products) {
    const ul = document.querySelector('.resultUl');
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const html = `<h2>${product.name}</h2><span>price:${product.price}</span><br><span>Rating:${product.rating}</span>`
        const li = document.createElement('li');
        li.innerHTML = html;
        ul.appendChild(li);
    } 
}
renderProducts(products); 

// Searching for products
document.querySelector('.userInput').oninput = function() {
    let val = this.value.toLowerCase().trim();
    let searchItems = document.querySelectorAll('.resultUl li');
    if (val !== ' '.trim()) {
        searchItems.forEach(function(elem) {
            if (elem.children[0].innerText.toLowerCase().search(val) === -1 ) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        });
    }
    else {
        searchItems.forEach(function(elem) {
            elem.classList.remove('hide');
        });
    }
}

// Filter products based on max price
document.querySelector('.maxPrice').oninput = function() {
    let val = this.value.trim();
    console.log(val);
    let searchItems = document.querySelectorAll('.resultUl li');
    if (val !== ' '.trim()) {  //&& !isNaN(val)
        searchItems.forEach(function(elem) {
            if (parseInt(elem.children[1].innerText.split(':')[1], 10) > val) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        });
    }
    else {
        searchItems.forEach(function(elem) {
            elem.classList.remove('hide');
        });
    }
}
// Extra feature. Filter products based on min rate
document.querySelector('.minRate').oninput = function() {
    let val = this.value.trim();
    console.log(val);
    let searchItems = document.querySelectorAll('.resultUl li');
    if (val !== ' '.trim()) { 
        searchItems.forEach(function(elem) {
            console.log(elem.children[3].innerText.split(':')[1]);
            if (parseInt(elem.children[3].innerText.split(':')[1], 10) < val) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        });
    }
    else {
        searchItems.forEach(function(elem) {
            elem.classList.remove('hide');
        });
    }
}