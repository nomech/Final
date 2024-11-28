import { data } from "./data.js";

const page = window.location.pathname.split("/").pop().split(".")[0];
const id = data.productCategories.find(
  (category) => category.value.toLowerCase() === page
).id;

const products = data.products.filter((product) => product.categoryId === id);
const productSection = document.querySelector(".products");

const redirect = (event) => {
  window.location.href =
    window.location.pathname + "?id=" + event.target.parentNode.dataset.id;
};
const viewProduct = (id) => {
  const product = products.find((category) => category.id === id);
  console.log(product);

  const productSection = document.querySelector(".products");
  productSection.classList.toggle("products--show");

  const details = document.querySelector(".details");
  details.classList.toggle("details--show");

  const detailsImage = document.querySelector(".details__image");
  detailsImage.src = product.image;

  const productPrice = document.querySelector(".details__price");
  productPrice.innerText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const detailsText = document.querySelector(".details__text");
  detailsText.innerText = product.description;

  const detailsList = document.querySelector(".details__list");

  for (let spec in product.spec) {
    const specItem = document.createElement("li");
    const specTitle = document.createElement("h3");
    specTitle.innerText = spec;

    const specValue = document.createElement("p");
    specValue.innerText = product.spec[spec];

    specItem.append(specTitle, specValue);
    //    specItem.innerText = `${spec}: ${product.spec[spec]}`;

    detailsList.append(specItem);
  }
  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  orderButton.innerText = "Order";

  const detailsSpecs = document.querySelector(".details__specs");
  detailsSpecs.append(orderButton);
};

const renderProducts = () => {
  products.forEach((item) => {
    const product = document.createElement("div");
    product.classList.add("products__item");

    product.dataset.id = item.id;

    const detailsTitle = document.querySelector(".details__title");
    detailsTitle.innerText = item.name;

    const productImage = document.createElement("img");
    productImage.classList.add("products__image");
    productImage.src = item.image;

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
    viewButton.addEventListener("click", (event) => redirect(event));

    textGroup.append(productName, productPrice);
    product.append(productImage, textGroup, viewButton);
    productSection.append(product);
  });
};

const backButton = document.querySelector(".details__back-button");

window.addEventListener("DOMContentLoaded", () => {
  const search = window.location.search;
  const id = parseInt(new URLSearchParams(search).get("id"));
  if (id) {
    viewProduct(id);
    backButton.addEventListener("click", () => {
      window.location.href = window.location.pathname;
    });
  } else {
    renderProducts();
  }
});
