let cartItems = [];

function toggleCart() {
    const cartDetails = document.getElementById("cart-details");
    cartDetails.style.display = cartDetails.style.display === "block" ? "none" : "block";
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartFinalTotal = document.getElementById("cart-final-total");
    const cartCount = document.getElementById("cart-count");
    const cartShipping = 5.00;

    cartItemsList.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    cartItems.forEach(item => {
        if (item.quantity > 0) {
            const li = document.createElement('li');
            li.innerHTML = `${item.item} - R$ ${(item.price * item.quantity).toFixed(2)} (${item.quantity}x)`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
            totalItems += item.quantity;
        }
    });

    const finalTotal = total + (total > 0 ? cartShipping : 0);
    cartTotal.textContent = total.toFixed(2);
    cartFinalTotal.textContent = finalTotal.toFixed(2);

    // Atualizar a contagem do carrinho e exibir com animação
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = 'inline';
        cartCount.classList.add('added');
        setTimeout(() => cartCount.classList.remove('added'), 300);
    } else {
        cartCount.style.display = 'none';
    }
}

function updateQuantity(button, item, change) {
    const quantityElement = document.getElementById('quantity-' + item);
    let quantity = parseInt(quantityElement.textContent);

    // Atualiza a quantidade de acordo com o botão pressionado
    quantity += change;

    // Garante que a quantidade nunca seja menor que 0
    if (quantity < 0) {
        quantity = 0;
    }

    // Atualiza o texto no elemento da quantidade
    quantityElement.textContent = quantity;

    // Atualiza o carrinho com o novo valor
    updateCart(item, quantity); // Atualiza a quantidade diretamente no carrinho
}

function updateCart(itemName, newQuantity) {
    let existingItem = cartItems.find(item => item.item === itemName);

    if (existingItem) {
        existingItem.quantity = newQuantity;
    } else {
        // Ao adicionar um item novo, garantir que a quantidade seja atualizada corretamente
        cartItems.push({ item: itemName, price: parseFloat(document.querySelector(`[data-item="${itemName}"]`).getAttribute('data-price')), quantity: newQuantity });
    }

    updateCartDisplay();
}

function addToCart(itemName, price, button) {
    const quantitySpan = button.parentElement.querySelector('.quantity');
    const quantity = parseInt(quantitySpan.innerText);

    if (quantity > 0) {
        let existingItem = cartItems.find(item => item.item === itemName);

        if (existingItem) {
            existingItem.quantity += quantity; // Adiciona a quantidade selecionada ao item existente
        } else {
            cartItems.push({ item: itemName, price, quantity }); // Adiciona o novo item
        }

        updateCartDisplay();

        // Animação no botão para feedback do usuário
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 500);

        // Esconder o carrinho automaticamente após 5 segundos
        setTimeout(() => {
            document.getElementById("cart-details").style.display = "none";
        }, 5000);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function () {
            const itemName = button.closest('.card').querySelector('h3').innerText;
            const change = button.innerText === '+' ? 1 : -1;
            updateQuantity(button, itemName, change); // Atualiza a quantidade no carrinho
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const itemName = button.getAttribute('data-item');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(itemName, price, button); // Adiciona o item ao carrinho
        });
    });
});
function clearCart() {
    cartItems = []; // Limpa o array de itens do carrinho
    updateCartDisplay(); // Atualiza a exibição do carrinho
    alert("Carrinho limpo!"); // Feedback ao usuário
}
