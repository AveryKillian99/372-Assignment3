/**
 * Name: Avery Killian
 * Date: 09.25.2025
 * CSC 372-01
 *
 * Adds interactive "Favorites" functionality to the Campus Eats Blog.
 * Users can mark dishes as favorites, see them in a summary list,
 * and view the total price. All elements are created dynamically
 * using JavaScript and event listeners.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Select all dish cards
    let dishCards = document.querySelectorAll(".card");

    // Create favorites section dynamically
    let favoritesSection = document.createElement("section");
    favoritesSection.id = "favorites-section";

    let favoritesHeading = document.createElement("h2");
    favoritesHeading.textContent = "Favorites";
    favoritesSection.appendChild(favoritesHeading);

    let favoritesList = document.createElement("ul");
    favoritesList.id = "favorites-list";
    favoritesSection.appendChild(favoritesList);

    let totalParagraph = document.createElement("p");
    totalParagraph.innerHTML = 'Total: $<span id="favorites-total">0.00</span>';
    favoritesSection.appendChild(totalParagraph);

    // Append the favorites section at the end of the body
    document.body.appendChild(favoritesSection);

    // Store favorites in an array
    let favorites = [];
    let totalPrice = 0;

    // Loop through each dish card to add buttons and price
    dishCards.forEach((card) => {
        // Use dish name from h3
        let dishName = card.querySelector("h3").textContent;

        // Assign a price (you can customize actual prices here)
        let dishPrice = parseFloat((Math.random() * 10 + 5).toFixed(2));
        card.dataset.name = dishName;
        card.dataset.price = dishPrice;

        // Create price element
        let priceElement = document.createElement("p");
        priceElement.textContent = `Price: $${dishPrice.toFixed(2)}`;
        card.appendChild(priceElement);

        // Create "Add to Favorites" button
        let favButton = document.createElement("button");
        favButton.textContent = "Add to Favorites";
        card.appendChild(favButton);

        // Event listener for favorite toggle
        favButton.addEventListener("click", () => {
            toggleFavorite(card, dishName, dishPrice, favButton);
        });
    });

    /**
     * Toggle favorite state of a dish card
     * @param {HTMLElement} card - The dish card element
     * @param {string} name - Dish name
     * @param {number} price - Dish price
     * @param {HTMLElement} button - The button that was clicked
     */
    function toggleFavorite(card, name, price, button) {
        let index = favorites.findIndex(fav => fav.name === name);

        if (index === -1) {
            // Add to favorites
            favorites.push({ name: name, price: price });
            card.classList.add("favorite");
            button.textContent = "Remove from Favorites";
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            card.classList.remove("favorite");
            button.textContent = "Add to Favorites";
        }

        updateFavoritesList();
    }

    /**
     * Update the favorites summary list and total
     */
    function updateFavoritesList() {
        // Clear the list
        favoritesList.innerHTML = "";
        totalPrice = 0;

        favorites.forEach(fav => {
            let li = document.createElement("li");
            li.textContent = `${fav.name} - $${fav.price.toFixed(2)}`;
            favoritesList.appendChild(li);
            totalPrice += fav.price;
        });

        document.getElementById("favorites-total").textContent = totalPrice.toFixed(2);
    }
});
