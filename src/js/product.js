//Imports data and utility functions
import { data } from "./data.js";
import {
  convertToCurrency,
  getPageId,
  updateCartAmount,
  getCurrentCategory,
} from "./utils.js";

// Cached DOM elements
const cachedElements = {
  productSection: document.querySelector(".products"),
  details: document.querySelector(".details"),
  detailsTitle: document.querySelector(".details__title"),
  detailsPrice: document.querySelector(".details__price"),
  detailsImage: document.querySelector(".details__image"),
  detailsText: document.querySelector(".details__text"),
  detailsList: document.querySelector(".details__list"),
  detailsSpecs: document.querySelector(".details__specs"),
  cartAmountElement: document.querySelector(".header__profile-counter"),
  filterSection: document.querySelector(".filters"),
  filterSort: document.querySelector(".filters__sort"),
  amount: document.querySelector(".details__amount"),
  plussButton: document.querySelector(".details__plus"),
  minusButton: document.querySelector(".details__minus"),
  home: document.querySelector(".filter__home"),
};

// Destructured DOM Elements
const {
  productSection,
  details,
  detailsImage,
  detailsTitle,
  detailsPrice,
  detailsText,
  detailsList,
  detailsSpecs,
  filterSection,
  filterSort,
  amount, 
} = cachedElements;

// Gets the current category
const categoryId = getCurrentCategory();

// Filters the products based on the current category
const products = data.products.filter(
  (product) => product.categoryId === categoryId
);

// Gets the units for the current category
const units = data.specUnitLookup[categoryId];

//Ensures that the page is fully loaded before running the script
window.addEventListener("DOMContentLoaded", () => {
  //Gets the page id
  const pageId = getPageId();

  //Checks if the page id exists
  if (pageId) {
    //Displays the product details
    viewProduct(pageId);

    //Event listener for the back button
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("details__back-button")) {
        window.location.href = window.location.pathname;
      }
    });
  } else {
    //Renders the products
    renderProducts(products);

    //Event listener for the view button
    document.addEventListener("click", (event) => {
      const classList = event.target.classList;

      //Redirects the user to the product details page
      if (classList.contains("products__view")) {
        //Redirects the user to the product details page
        redirect(event);

        //Gets the parent id of the product
        const parentId = parseInt(event.target.parentNode.dataset.id);

        //Displays the product details
        viewProduct(parentId);

        //Redirects the user to the home page
      } else if (classList.contains("filters__home")) {
        window.location.href = "../index.html";
      }
    });
  }

  //Event listener for the amount buttons
  document.addEventListener("click", (event) => {
    //Updates the amount of the product
    updateAmount(event);
  });

  //Creates the sorting options
  createSortingOptions();
});


// Function that updates the amount of the product
const updateAmount = (event) => {
  //Checks if the plus or minus button was clicked
  const detailsPlus = event.target.classList.contains("details__plus");
  const detailsMinus = event.target.classList.contains("details__minus");

  //Updates the amount of the product based on the button clicked
  if (detailsPlus) {
    amount.value = parseInt(amount.value) + 1;
  } else if (detailsMinus && amount.value > 1) {
    amount.value = parseInt(amount.value) - 1;
  }
};

// Function that redirects the user to the product details page
const redirect = (event) => {
  const parentId = event.target.parentNode.dataset.id;
  window.location.href = window.location.pathname + "?id=" + parentId;
};

// Function that creates the sorting options
const createSortingOptions = (s) => {
  //Gets the current page
  const page = window.location.pathname.split("/").pop().split(".")[0];
  
  //Gets the sorting options for the current page
  const sortingOptions = data.productCategories.find(
    (category) => category.value.toLowerCase() === page
  ).sortingOptions;

  //Creates the sorting options
  sortingOptions.forEach((option) => {

    //Creates the sorting option
    const sortOption = document.createElement("option");
    sortOption.value = option;
    sortOption.innerText = option;

    //Appends the sorting option to the select element
    filterSort.append(sortOption);
  });

  //Event listener for the sorting options
  filterSort.addEventListener("change", (e) => {
    sortAscending(e.target.value);
  });
};

// Function that sorts the products in ascending order based on the selected option
const sortAscending = (spec) => {
  //initializes the sorted products
  let sortedProducts;

  //Gets the products to sort
  const productsToSort = [...products];

  //Sorts the products based on the selected option
  if (spec === "price") {
    //Sorts the products based on the price
    sortedProducts = productsToSort.sort((a, b) => b.price - a.price);

    //Sorts the products based on the name
  } else if (spec === "name") {
    sortedProducts = productsToSort.sort((a, b) =>
      //Sorts the products based on the name using the localeCompare method
      a.name.localeCompare(b.name)
    );

    //Sorts the products based on the selected option
  } else {
    sortedProducts = productsToSort.sort((a, b) => b.spec[spec] - a.spec[spec]);
  }

  //Re-renders the products based on the selected option
  renderProducts(sortedProducts);
};


// Function that adds a product to the cart
const addProductToCart = () => {
  //Gets the parent id of the product
  const parentId = parseInt(new URLSearchParams(window.location.search).get("id"));

  //Gets the product
  const product = products.find((category) => category.id === parentId);
  
  //Sets the amount of the product
  product.amount = parseInt(amount.value);

  //Gets the cart from the local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  //Checks if the product exists in the cart
  const existingProduct = cart.find((item) => item.id === product.id);

  //Updates the cart based on the product
  if (existingProduct) {
    
    //Updates the amount of the product
    existingProduct.amount += product.amount;
  } else {
    
    //Adds the product to the cart
    cart.push(product);
  }

  //Stores the cart in the local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  //Gets the order button element and updates the text and disables the button for a second after adding the product to the cart
  const orderButton = cachedElements["orderButton"];
  orderButton.disabled = true;
  orderButton.classList.remove("button--order");
  orderButton.classList.add("button--disabled");
  orderButton.innerText = "Added to cart!";

  //Resets the button text and enables the button after 1 second
  setTimeout(() => {
    orderButton.disabled = false;
    orderButton.classList.remove("button--disabled");
    orderButton.classList.add("button--order");
    orderButton.innerText = "Add to cart";
  }, 1000);

  //Updates the cart amount
  const cartCounter = document.querySelector(".header__dropdown-counter");
  cartCounter.innerText = `(${updateCartAmount()})`;
};

// Function that displays the product details
const viewProduct = (id) => {
  //Removes the filter section
  filterSection.remove();

  //Gets the product based on the id and displays the product details
  const product = products.find((category) => category.id === id);
  productSection.classList.toggle("products--show");
  details.classList.toggle("details--show");
  detailsTitle.innerText = product.name;
  detailsImage.alt = `Image of the ${product.name}`;
  detailsImage.src = product.image;
  detailsPrice.innerText = convertToCurrency("en-US", "currency", "USD", product.price);
  detailsText.innerText = product.description;

  //Creates the product specs list items and appends them to the details list
  for (let spec in product.spec) {
    //Creates the list item
    const specItem = document.createElement("li");
    const specTitle = document.createElement("h3");
    specTitle.innerText = spec;

    //Creates the spec value
    const specValue = document.createElement("p");
    const specUnit = units[spec] ? units[spec] : "";
    specValue.innerText = `${product.spec[spec]} ${specUnit}`;

    //Appends the spec item to the details list
    specItem.append(specTitle, specValue);
    detailsList.append(specItem);
  }

  //Creates the orderButton and appends it to the details specs section
  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  cachedElements["orderButton"] = orderButton;
  orderButton.innerText = "Add to cart";
  orderButton.addEventListener("click", addProductToCart);
  detailsSpecs.append(orderButton);
};

// Function that renders the products
const renderProducts = (products) => {
  //Removes the product section
  productSection.innerText = "";

  //Renders each product in the products section 
  products.forEach((item) => {
    
    //Creates the product element
    const product = document.createElement("div");
    product.classList.add("products__item");
    product.dataset.id = item.id;

    //Stores the product in the cached elements object
    cachedElements["product"] = product;

    //Creates the product image
    const productImage = document.createElement("img");
    productImage.classList.add("products__image");
    productImage.src = item.image;
    productImage.alt = `Image of the ${item.name}`;

    //Stores the product image in the cached elements object
    cachedElements["productImage"] = productImage;

    //Creates the text group
    const textGroup = document.createElement("div");
    textGroup.classList.add("products__text-group");

    //Stores the text group in the cached elements object
    cachedElements["textGroup"] = textGroup;

    //Creates the product price and name
    const productPrice = document.createElement("p");
    productPrice.classList.add("products__price");
    productPrice.innerText = convertToCurrency("en-US", "currency", "USD",item.price);
    
    //Stores the product price in the cached elements object
    cachedElements["productPrice"] = productPrice;

    //Creates the product name
    const productName = document.createElement("h2");
    productName.classList.add("products__name");
    productName.innerText = item.name;

    //Stores the product name in the cached elements object
    cachedElements["productName"] = productName;

    //Creates the view button
    const viewButton = document.createElement("button");
    viewButton.classList.add("products__view", "button", "button--view");
    viewButton.innerText = "View";

    //Stores the view button in the cached elements object
    cachedElements["viewButton"] = viewButton;

    //Appends the product elements to the product section
    textGroup.append(productName, productPrice);
    product.append(productImage, textGroup, viewButton);
    productSection.append(product);
  });
};
