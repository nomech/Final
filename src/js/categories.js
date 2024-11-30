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
} = cachedElements;




const updateAmount = (event) => {
  const amount = document.querySelector(".details__amount");
  console.log(amount);
  if (event.target.classList.contains("details__plus")) {
    amount.value = parseInt(amount.value) + 1;
  } else if (event.target.classList.contains("details__minus")) {
    if (amount.value > 1) {
      amount.value = parseInt(amount.value) - 1;
    }
  }
};

const page = window.location.pathname.split("/").pop().split(".")[0];
const categgoryId = data.productCategories.find(
  (category) => category.value.toLowerCase() === page
).id;

const products = data.products.filter(
  (product) => product.categoryId === categgoryId
);

const redirect = (event) => {
  const parentId = event.target.parentNode.dataset.id;
  window.location.href = window.location.pathname + "?id=" + parentId;
};

const getCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  if (cart) {
    const cartAmount = cart.length;
    const cartAmountElement = document.querySelector(
      ".header__profile-counter"
    );

    cartAmountElement.classList.add("header__profile-counter--show");
    cartAmountElement.innerText = cartAmount;
  }
};

const addProduct = () => {
  const parentId = parseInt(
    new URLSearchParams(window.location.search).get("id")
  );
  const product = products.find((category) => category.id === parentId);
  product.amount = parseInt(document.querySelector(".details__amount").value);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  getCartAmount();
};

const viewProduct = (id) => {
  //productSection.innerText = "";o
  const product = products.find((category) => category.id === id);
  console.log(id);
  productSection.classList.toggle("products--show");
  details.classList.toggle("details--show");
  detailsTitle.innerText = product.name;
  detailsImage.alt = `Image of the ${product.name}`;
  detailsImage.src = product.image;

  detailsPrice.innerText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

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

  const amount = document.createElement("input");
  amount.classList.add("details__amount");
  amount.type = "number";
  amount.value = 1;

  const minusButton = document.createElement("button");
  minusButton.classList.add("details__minus", "button", "button--minus");
  minusButton.innerText = "-";

  const plusButton = document.createElement("button");
  plusButton.classList.add("details__plus", "button", "button--plus");
  plusButton.innerText = "+";

  amountGroup.append(minusButton, amount, plusButton);

  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  orderButton.innerText = "Order";
  orderButton.addEventListener("click", addProduct);
  detailsSpecs.append(amountGroup, orderButton);
};



const renderProducts = () => {
  products.forEach((item) => {
    const product = document.createElement("div");
    product.classList.add("products__item");

    product.dataset.id = item.id;

    const productImage = document.createElement("img");
    productImage.classList.add("products__image");
    productImage.src = item.image;
    productImage.alt = `Image of the ${item.name}`;

    const textGroup = document.createElement("div");
    textGroup.classList.add("products__text-group");

    const productPrice = document.createElement("p");
    productPrice.classList.add("products__price");
    productPrice.innerText = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(item.price);

    const productName = document.createElement("h2");
    productName.classList.add("products__name");
    productName.innerText = item.name;

    const viewButton = document.createElement("button");
    viewButton.classList.add("products__view", "button", "button--view");
    viewButton.innerText = "View";

    textGroup.append(productName, productPrice);
    product.append(productImage, textGroup, viewButton);
    productSection.append(product);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  if (id) {
    viewProduct(id);
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("details__back-button")) {
        window.location.href = window.location.pathname;
      }
    });
  } else {
    renderProducts();
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
});


