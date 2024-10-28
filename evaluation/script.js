

// Function to calculate average rating
function calculateAverageRating(productId) {
    const productReviews = reviews.filter(review => review.productId === productId);
    if (productReviews.length === 0) return 0;
    const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / productReviews.length);
}

// Function to render product cards
function renderProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    products.forEach(product => {
        const averageRating = calculateAverageRating(product.id);
        const productCard = `
              <div class="product-card" >
                  <img src="${product.images[0] || product.images[1]}" alt="" class="productImage">
                  <h2>${product.title}</h2>
                  <p>${product.description}</p>
                  <p>Price: $${product.price} <s>$${product.strikePrice}</s></p>
                  <p>Available Quantity: ${product.quantity}</p>
                  <p>Category: ${product.category}</p>
                  <p>Average Rating: ${averageRating}</p>
                  <button class="buttonem" onclick="addToCart(${product.id})">Add to Cart</button>
              </div>
          `;
        container.innerHTML += productCard;
    });
}



//   Add to cart functionality




let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];


if (!Array.isArray(cartItem)) {
    cartItem = [];
}

document.getElementById('cart-count').innerText = cartItem.length

function addToCart(productId) {

     let itemInCart=cartItem.filter((item)=>item.id===productId)
     console.log(itemInCart)
    if (itemInCart.length>0) {
        alert(`item already in the cart`)
        document.getElementById('cart-count').innerText = cartItem.length
    }
    else {
        

        let Item=productArray.filter((product) => product.id === productId)
        
        cartItem.push(...Item)
        console.log(Item);
        localStorage.setItem("cartItem", JSON.stringify(cartItem))

        alert(`Product ID ${productId} added to cart!`);
        document.getElementById('cart-count').innerText = cartItem.length
    }



}
document.getElementById('cart-count').innerText = cartItem.length

// Filter and sort functionality
document.getElementById('filter-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filteredProducts = productArray.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = category ? product.category === category : true;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts(filteredProducts);
});

// Sorting functionality
document.getElementById('sort-by').addEventListener('change', (e) => {
    const sortValue = e.target.value;
    let sortedProducts;

    if (sortValue === 'price-asc') {
        sortedProducts = [...productArray].sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        sortedProducts = [...productArray].sort((a, b) => b.price - a.price);
    } else if (sortValue === 'name-asc') {
        sortedProducts = [...productArray].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'name-desc') {
        sortedProducts = [...productArray].sort((a, b) => b.title.localeCompare(a.title));
    }

    renderProducts(sortedProducts);
});

// Initial render of products
renderProducts(productArray);

