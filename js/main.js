// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category-card");
  const mainSearchInput = document.getElementById("searchInput");
  const overlaySearchInput = document.getElementById("overlaySearchInput");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchResults = document.getElementById("searchResults");
  const closeSearchBtn = document.getElementById("closeSearch");
  const categoriesSection = document.getElementById("categoriesSection");

  // Initialize AOS (Animate On Scroll)
  AOS.init();

  // Handle Category Click
  categories.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      // Store selected category in localStorage
      localStorage.setItem("selectedCategory", category);
      // Redirect to muscle list page
      window.location.href = "muscleList.html";
    });
  });

  // Function to display search results
  function displaySearchResults(query, inputElement) {
    const formattedQuery = query.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (formattedQuery.length === 0) {
      // If search input is empty, hide overlay and show categories
      searchOverlay.classList.add("d-none");
      categoriesSection.classList.remove("d-none");
      return;
    }

    const filteredMuscles = muscles.filter((muscle) =>
      muscle.name.toLowerCase().includes(formattedQuery)
    );

    if (filteredMuscles.length === 0) {
      const noResultItem = document.createElement("li");
      noResultItem.classList.add("list-group-item");
      noResultItem.textContent = "No muscles found.";
      searchResults.appendChild(noResultItem);
    } else {
      filteredMuscles.forEach((muscle) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = muscle.name;
        listItem.addEventListener("click", () => {
          window.location.href = `muscleDetails.html?name=${encodeURIComponent(
            muscle.name
          )}`;
        });
        searchResults.appendChild(listItem);
      });
    }

    // Show the search overlay and hide other content
    searchOverlay.classList.remove("d-none");
    categoriesSection.classList.add("d-none");
  }

  // Handle Main Search Input
  mainSearchInput.addEventListener("focus", () => {
    // Show overlay when the main search input is focused
    searchOverlay.classList.remove("d-none");
    categoriesSection.classList.add("d-none");
  });

  mainSearchInput.addEventListener("input", () => {
    const query = mainSearchInput.value;
    overlaySearchInput.value = query; // Sync with overlay search input
    displaySearchResults(query, mainSearchInput);
  });

  // Handle Overlay Search Input
  overlaySearchInput.addEventListener("input", () => {
    const query = overlaySearchInput.value;
    mainSearchInput.value = query; // Sync with main search input
    displaySearchResults(query, overlaySearchInput);
  });

  // Handle Close Search Overlay
  closeSearchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("d-none");
    searchResults.innerHTML = "";
    mainSearchInput.value = "";
    overlaySearchInput.value = "";
    categoriesSection.classList.remove("d-none");
  });

  // Optional: Close the search overlay when clicking outside the search input or results
  // Not necessary since we're using an overlay
});

// js/main.js

// Debounce function to limit the rate at which a function can fire.
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Modify the input event listeners to use debounce
mainSearchInput.addEventListener(
  "input",
  debounce(() => {
    const query = mainSearchInput.value;
    overlaySearchInput.value = query; // Sync with overlay search input
    displaySearchResults(query, mainSearchInput);
  }, 300)
); // 300ms delay

overlaySearchInput.addEventListener(
  "input",
  debounce(() => {
    const query = overlaySearchInput.value;
    mainSearchInput.value = query; // Sync with main search input
    displaySearchResults(query, overlaySearchInput);
  }, 300)
); // 300ms delay

// js/main.js

// Function to highlight matching text
function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<strong>$1</strong>");
}

// Update the displaySearchResults function to use highlightMatch
function displaySearchResults(query, inputElement) {
  const formattedQuery = query.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (formattedQuery.length === 0) {
    // If search input is empty, hide overlay and show categories
    searchOverlay.classList.add("d-none");
    categoriesSection.classList.remove("d-none");
    return;
  }

  const filteredMuscles = muscles.filter((muscle) =>
    muscle.name.toLowerCase().includes(formattedQuery)
  );

  if (filteredMuscles.length === 0) {
    const noResultItem = document.createElement("li");
    noResultItem.classList.add("list-group-item");
    noResultItem.textContent = "No muscles found.";
    searchResults.appendChild(noResultItem);
  } else {
    filteredMuscles.forEach((muscle) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = highlightMatch(muscle.name, formattedQuery);
      listItem.addEventListener("click", () => {
        window.location.href = `muscleDetails.html?name=${encodeURIComponent(
          muscle.name
        )}`;
      });
      searchResults.appendChild(listItem);
    });
  }

  // Show the search overlay and hide other content
  searchOverlay.classList.remove("d-none");
  categoriesSection.classList.add("d-none");
}
