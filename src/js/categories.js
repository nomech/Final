import { data } from "./data.js";

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
  filterSort: document.querySelector(".filters__sort"),
};

const {
  productSection,
  details,
  detailsImage,
  detailsTitle,
  detailsPrice,
  detailsText,
  detailsList,
  detailsSpecs,
  cartAmountElement,
  filterSort,
} = cachedElements;

window.addEventListener("DOMContentLoaded", () => {
  const pageId = getPageId();

  if (pageId) {
    viewProduct(pageId);

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("details__back-button")) {
        window.location.href = window.location.pathname;
      }
    });
  } else {
    renderProducts(products);

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("products__view")) {
        redirect(event);
        const parentId = parseInt(event.target.parentNode.dataset.id);
        viewProduct(parentId);
      }
    });
  }

  document.addEventListener("click", (event) => {
    updateAmount(event);
  });
  createSortingOptions();
});

const getPageId = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount
  );

const updateAmount = (event) => {
  const detailsPlus = event.target.classList.contains("details__plus");
  const detailsMinus = event.target.classList.contains("details__minus");
  const amount = cachedElements["detailsAmount"];

  if (detailsPlus) {
    amount.value = parseInt(amount.value) + 1;
  } else if (detailsMinus && amount.value > 1) {
    amount.value = parseInt(amount.value) - 1;
  }
};
const getCurrentCategory = () => {
  const page = window.location.pathname.split("/").pop().split(".")[0];
  return data.productCategories.find(
    (category) => category.value.toLowerCase() === page
  ).id;
};

const categoryId = getCurrentCategory();
const products = data.products.filter(
  (product) => product.categoryId === categoryId
);

console.log(products);

const redirect = (event) => {
  const parentId = event.target.parentNode.dataset.id;
  window.location.href = window.location.pathname + "?id=" + parentId;
};

const updateCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    const cartAmount = cart.length;
    cartAmountElement.classList.add("header__profile-counter--show");
    cachedElements[cartAmountElement] = cartAmountElement.classList;
    cartAmountElement.innerText = cartAmount;
  }
};

const createSortingOptions = () => {
  const page = window.location.pathname.split("/").pop().split(".")[0];
  const sortingOptions = data.productCategories.find(
    (category) => category.value.toLowerCase() === page
  ).sortingOptions;

  sortingOptions.forEach((option) => {
    const sortOption = document.createElement("option");
    sortOption.value = option;
    sortOption.innerText = option;

    filterSort.append(sortOption);
  });

  filterSort.addEventListener("change", (e) => {
    sortAscending(e.target.value);
  });
};

const sortAscending = (spec) => {
  let sortedProducts;

  if (spec === "price") {
    console.log(products)
    sortedProducts = products.sort((a, b) =>  b.price - a.price);
  } else if (spec === "name") {
    sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedProducts = products.sort((a, b) => b.spec[spec] - a.spec[spec]);
  }
  renderProducts(sortedProducts);
};

const addProductToCart = () => {
  const parentId = parseInt(
    new URLSearchParams(window.location.search).get("id")
  );

  const product = products.find((category) => category.id === parentId);
  const detailsAmount = cachedElements["detailsAmount"];
  product.amount = parseInt(detailsAmount.value);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.amount += product.amount;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartAmount();
};

const viewProduct = (id) => {
  const product = products.find((category) => category.id === id);

  productSection.classList.toggle("products--show");
  details.classList.toggle("details--show");

  detailsTitle.innerText = product.name;
  detailsImage.alt = `Image of the ${product.name}`;
  detailsImage.src = product.image;
  detailsPrice.innerText = formatCurrency(product.price);
  detailsText.innerText = product.description;

  for (let spec in product.spec) {
    const specItem = document.createElement("li");
    const specTitle = document.createElement("h3");
    specTitle.innerText = spec;

    const specValue = document.createElement("p");
    specValue.innerText = product.spec[spec];

    specItem.append(specTitle, specValue);
    detailsList.append(specItem);
  }

  const amountGroup = document.createElement("div");
  amountGroup.classList.add("details__amount-group");

  const detailsAmount = document.createElement("input");
  detailsAmount.classList.add("details__amount");
  detailsAmount.type = "number";
  detailsAmount.value = 1;
  cachedElements["detailsAmount"] = detailsAmount;

  const minusButton = document.createElement("button");
  minusButton.classList.add("details__minus", "button", "button--minus");
  minusButton.innerText = "-";
  cachedElements["minusButton"] = minusButton;

  const plusButton = document.createElement("button");
  plusButton.classList.add("details__plus", "button", "button--plus");
  plusButton.innerText = "+";
  cachedElements["plusButton"] = plusButton;

  amountGroup.append(minusButton, detailsAmount, plusButton);

  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  cachedElements["orderButton"] = orderButton;

  console.log(cachedElements);

  orderButton.innerText = "Order";
  orderButton.addEventListener("click", addProductToCart);
  detailsSpecs.append(amountGroup, orderButton);
};

const renderProducts = (products) => {
  productSection.innerText = "";
  products.forEach((item) => {
    const product = document.createElement("div");
    product.classList.add("products__item");
    product.dataset.id = item.id;
    cachedElements["product"] = product;

    const productImage = document.createElement("img");
    productImage.classList.add("products__image");
    productImage.src = item.image;
    productImage.alt = `Image of the ${item.name}`;
    cachedElements["productImage"] = productImage;

    const textGroup = document.createElement("div");
    textGroup.classList.add("products__text-group");
    cachedElements["textGroup"] = textGroup;

    const productPrice = document.createElement("p");
    productPrice.classList.add("products__price");
    productPrice.innerText = formatCurrency(item.price);
    cachedElements["productPrice"] = productPrice;

    const productName = document.createElement("h2");
    productName.classList.add("products__name");
    productName.innerText = item.name;
    cachedElements["productName"] = productName;

    const viewButton = document.createElement("button");
    viewButton.classList.add("products__view", "button", "button--view");
    viewButton.innerText = "View";
    cachedElements["viewButton"] = viewButton;

    textGroup.append(productName, productPrice);
    product.append(productImage, textGroup, viewButton);
    productSection.append(product);
  });
};
