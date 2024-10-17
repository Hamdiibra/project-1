fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('products');
        data.forEach(product => {
            // Create a new div for each product
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            // Create a product card with name, price, and image
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}" width="100">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
            `;

            // Create and append the "Add To Cart" button
            const button = document.createElement('button');
            button.innerText = 'Add To Cart';
            button.addEventListener('click', () => addToCart(product.id, product.title, product.price));
            productDiv.appendChild(button);

            productList.appendChild(productDiv);
        });
        
    });
    

// Array to hold cart items
let cart = [];

function addToCart(productId, productName, productPrice) {
    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice
    };
    cart.push(cartItem);
    displayCart();
}

// Function to display items in the cart
function displayCart() {
    const cartItemsDiv = document.getElementById('Cart-items');
    cartItemsDiv.innerHTML = ''; // Clear current items

    cart.forEach(item => {
        const itemElement = document.createElement('li'); // Use 'li' for list items
        itemElement.innerHTML = `${item.name}, $${item.price}`;
        cartItemsDiv.appendChild(itemElement);
    });

    // Update checkout total
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('cart-total').innerText = `Total: $${totalPrice}`;
}


function payNow() {
    if (cart.length > 0) {
        alert('Thank you for your purchase.');
        cart = []; // Empty the cart
        displayCart();
    } else {
        alert('Cart is empty.');
    }
}
