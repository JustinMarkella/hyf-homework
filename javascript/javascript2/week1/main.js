console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);
function renderProducts(products) {
    const ul = document.querySelector('ul');
    const restriction =  18;
    for (let i = 0; i < restriction; i++) {
        const product = products[i];
        const html = `<h2>${product.name}</h2><span>price:${product.price}</span><br><span>Rating:${product.rating}</span>`
        li = document.createElement('li');
        li.innerHTML = html
        ul.appendChild(li);
    } 
}
renderProducts(products); 
