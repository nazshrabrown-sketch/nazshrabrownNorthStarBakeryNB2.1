
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


function validateContactForm(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const requestType = document.getElementById("request-type");
    const details = document.getElementById("details");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const requestError = document.getElementById("request-type-error");
    const detailsError = document.getElementById("details-error");
    const success = document.getElementById("form-success");

    // Clear previous feedback
    nameError.textContent = "";
    emailError.textContent = "";
    requestError.textContent = "";
    detailsError.textContent = "";
    success.textContent = "";

    let isValid = true;

    // Check name
    if (name.value.trim().length < 2) {
        nameError.textContent = "Please enter your name (at least 2 characters).";
        isValid = false;
    }

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Check request type
    if (requestType.value === "") {
        requestError.textContent = "Please select a request type.";
        isValid = false;
    }

    // Check message length
    if (details.value.trim().length < 10) {
        detailsError.textContent =
            "Please enter at least 10 characters in your request.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    success.textContent =
        "Your information passed validation. Thank you!";

    // Demonstration only: no information is sent to the bakery.
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", validateContactForm);
    }
});
