import { data } from "../js/data.js";

const getProductObject = () => {
  const search = window.location.search;
  const id = new URLSearchParams(search).get("category");
  const category = data.categories.find((category) => category.id == id);
  return category;
};

const products = document.querySelector(".products");

const viewProduct = (event) => {
  event.preventDefault();
  const id = event.target.parentNode.dataset.id;

  const product = getProductObject().items.find(
    (category) => category.id == id
  );
  const products = document.querySelector(".products");
  products.classList.toggle("products--show");

  const details = document.querySelector(".details");
  details.classList.toggle("details--show");

  const detailsImage = document.querySelector(".details__image");
  detailsImage.src = product.image;

  const productPrice = document.querySelector(".details__price");
  productPrice.innerText = `$ ${product.price}`;

  const detailsText = document.querySelector(".details__text");
  detailsText.innerText = product.description;

  const detailsList = document.querySelector(".details__list");
  
  for (let spec in product.spec) {
    const specItem = document.createElement("li");
    specItem.innerText = `${spec}: ${product.spec[spec]}`;

    detailsList.append(specItem);
  }

  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  orderButton.innerText = "Order";

  detailsList.append(orderButton);
};

const createProductItems = () => {
  const category = getProductObject();

  category.items.forEach((item) => {
    const product = document.createElement("div");
    product.classList.add("products__item");

    product.dataset.id = item.id;

    const productImage = document.createElement("img");
    productImage.classList.add("products__image");
    productImage.src = item.image;

    const textGroup = document.createElement("div");
    textGroup.classList.add("products__text-group");

    const productPrice = document.createElement("p");
    productPrice.classList.add("products__price");
    productPrice.innerText = item.price;

    const productName = document.createElement("h2");
    productName.classList.add("products__name");
    productName.innerText = item.name;

    const viewButton = document.createElement("button");
    viewButton.classList.add("products__view", "button", "button--view");
    viewButton.innerText = "View";
    viewButton.addEventListener("click", (event) => viewProduct(event));

    textGroup.append(productName, productPrice);
    product.append(productImage, textGroup, viewButton);
    products.append(product);
  });
};

createProductItems();
