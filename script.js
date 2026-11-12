
// NORTH STAR BAKERY FAVORITES

function getFavorites() {
    return JSON.parse(localStorage.getItem("bakeryFavorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

function displayFavorites() {
    const favorites = getFavorites();
    const favoriteList = document.getElementById("favorite-list");
    const favoriteCount = document.getElementById("favorite-count");

    if (!favoriteList || !favoriteCount) return;

    favoriteList.innerHTML = "";

    favorites.forEach(function(product) {
        const item = document.createElement("li");
        item.textContent = product;
        favoriteList.appendChild(item);
    });

    favoriteCount.textContent =
        "You have " + favorites.length + " favorite items.";

    document.querySelectorAll(".favorite-button").forEach(function(button) {
        const isSaved = favorites.includes(button.dataset.product);

        button.textContent = isSaved
            ? "Remove Favorite"
            : "Add to Favorites";

        button.setAttribute("aria-pressed", String(isSaved));
    });
}

function toggleFavorite(product) {
    let favorites = getFavorites();

    if (favorites.includes(product)) {
        favorites = favorites.filter(function(item) {
            return item !== product;
        });
    } else {
        favorites.push(product);
    }

    saveFavorites(favorites);
    displayFavorites();
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".favorite-button").forEach(function(button) {
        button.addEventListener("click", function() {
            toggleFavorite(button.dataset.product);
        });
    });

    displayFavorites();
});

