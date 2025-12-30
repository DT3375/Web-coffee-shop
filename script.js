let navbar = document.querySelector('.navbar');
document.querySelector("#menu-btn").onclick = () =>{
  navbar.classList.toggle('active');
  cartItem.classList.remove('active');
  searchForm.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () =>{
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
  searchForm.classList.remove('active');
}



// Get all the "Thêm vào giỏ hàng" buttons
const addButtons = document.querySelectorAll('.menu .box-container .box .btn');

// Attach click event listener to each button
addButtons.forEach((button) => button.addEventListener('click', addToCart));

// Function to handle adding the item to the cart
function addToCart(event) {
  // Get the relevant details of the item
  const box = event.target.closest('.box');
  const itemImage = box.querySelector('img').src;
  const itemName = box.querySelector('h3').textContent;
  const itemPrice = box.querySelector('.price').textContent;

  // Check if the item name already exists in the cart
  const cartItems = document.querySelectorAll('.cart-item');
  let itemExists = false;
  cartItems.forEach((cartItem) => {
    const cartItemName = cartItem.querySelector('h3').textContent;
    if (itemName === cartItemName) {
      itemExists = true;
      return; // Exit the loop if an item with the same name is found
    }
  });

  // Handle cart logic based on item existence
  if (!itemExists) {
    // Create a new cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Create the HTML structure for the cart item
    cartItem.innerHTML = `
      <span class="fas fa-times"></span>
      <img src="${itemImage}" alt="">
      <div class="content">
        <h3>${itemName}</h3>
        <div class="price">40.000 VND</div>
      </div>
    `;
    const removeButton = cartItem.querySelector('.fa-times');
    removeButton.addEventListener('click', removeFromCart);
    
    function removeFromCart(event) {
    const removeButton = event.target;
    const cartItem = removeButton.closest('.cart-item');
    cartItem.remove();
    console.log('Item removed from cart:', itemName);
    }

    // Append the cart item to the cart container
    const cartContainer = document.querySelector('.cart-items-container');
    cartContainer.insertBefore(cartItem, cartContainer.lastElementChild);
    console.log('Item added to cart:', itemName, itemPrice);

    // Apply the display:flex; style to the cart item
    cartItem.style.display = 'flex';
    
  } else {
    console.log('Item already exists in cart:', itemName);
  }
}

// Append the "Thanh toán ngay" button to the cart container
const cartContainer = document.querySelector('.cart-items-container');
const paymentButton = document.createElement('a');
paymentButton.href = '#';
paymentButton.className = 'btn';
paymentButton.textContent = 'Thanh toán ngay';
cartContainer.appendChild(paymentButton);
// Apply styles to the payment button
paymentButton.style.display = 'flex';
paymentButton.style.width = '100%';
paymentButton.style.textAlign = 'center';