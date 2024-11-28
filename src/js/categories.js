import { data } from "./data.js";


const cachedElements = {
  productSection: document.querySelector(".products"),
  details: document.querySelector(".details"),
  detailsTitle: document.querySelector(".details__title"),
  detailsPrice: document.querySelector(".details__price"),
  detailsImage: document.querySelector(".details__image"),
  detailsText: document.querySelector(".details__text"),
  detailsList: document.querySelector(".details__list"),
  detailsSpecs: document.querySelector(".details__specs")
};

const {productSection, details, detailsTitle, detailsPrice, detailsText, detailsList, detailsSpecs} = cachedElements;


const page = window.location.pathname.split("/").pop().split(".")[0];
const categgoryId = data.productCategories.find(
  (category) => category.value.toLowerCase() === page
).id;

const products = data.products.filter((product) => product.categoryId === categgoryId);
console.log("products", products);



const redirect = (event) => {
  window.location.href =
    window.location.pathname + "?id=" + event.target.parentNode.dataset.categgoryId;
};
const viewProduct = (id) => {
  const product = products.find((category) => category.id === id);
  productSection.classList.toggle("products--show");
  details.classList.toggle("details--show");

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
  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  orderButton.innerText = "Order";

  detailsSpecs.append(orderButton);
};

const renderProducts = () => {
  products.forEach((item) => {
    const product = document.createElement("div");
    product.classList.add("products__item");

    product.dataset.id = item.id;

      detailsTitle.innerText = item.name;

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
  const search = window.location.search;
  const id = parseInt(new URLSearchParams(search).get("id"));

  if (id) {
    viewProduct(id);

    document.addEventListener("click", (event) => {
      console.log(event.target.classList)
      if (event.target.classList.contains("details__back-button")) {
        window.location.href = window.location.pathname;
      }
    });
    
  } else {
    renderProducts();
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("products__view")) {
        redirect(event);
      }
    });
  }
});
