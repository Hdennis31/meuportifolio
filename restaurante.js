let cartItems = []; // Tornando a variável global

document.addEventListener('DOMContentLoaded', function () {
    const cartDetails = document.getElementById("cart-details");
    const cartItemsList = document.getElementById("cart-items");
    const cartCountElement = document.getElementById("cart-count");
    const cartIcon = document.getElementById("cart-icon");

    // Função para adicionar item ao carrinho
    const addItemToCart = (item, price) => {
        cartItems.push({ item, price });
        updateCartDisplay();
        cartDetails.style.display = "block"; // Exibe o carrinho ao adicionar item
    };

    // Atualizar o carrinho e o valor total
    const updateCartDisplay = () => {
        cartItemsList.innerHTML = ''; // Limpar os itens
        let total = 0;

        cartItems.forEach(cartItem => {
            const li = document.createElement("li");
            li.textContent = `${cartItem.item} - R$ ${cartItem.price}`;
            cartItemsList.appendChild(li);
            total += parseFloat(cartItem.price);
        });

        // Atualizar valores totais e frete
        const shipping = 5.00; // Frete fixo
        const cartTotal = document.getElementById("cart-total");
        const cartShipping = document.getElementById("cart-shipping");
        const cartFinalTotal = document.getElementById("cart-final-total");

        cartTotal.textContent = total.toFixed(2);
        cartShipping.textContent = shipping.toFixed(2);
        cartFinalTotal.textContent = (total + shipping).toFixed(2);

        // Atualizar contador de itens no carrinho
        if (cartItems.length > 0) {
            cartCountElement.style.display = "block";
            cartCountElement.textContent = cartItems.length;
        } else {
            cartCountElement.style.display = "none";
        }
    };

    // Alternar a exibição do carrinho ao clicar no ícone
    cartIcon.addEventListener("click", () => {
        cartDetails.style.display = cartDetails.style.display === "block" ? "none" : "block";
    });

    // Adicionar itens ao carrinho ao clicar no botão
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemName = e.target.getAttribute('data-item');
            const itemPrice = e.target.getAttribute('data-price');
            addItemToCart(itemName, itemPrice); // Chama a função para adicionar ao carrinho
        });
    });
});
