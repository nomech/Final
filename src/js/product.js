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

  console.log
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
    const specTitle = document.createElement("h3");
    specTitle.innerText = spec;

    const specValue = document.createElement("p");
    specValue.innerText = product.spec[spec];

    specItem.append(specTitle, specValue);
    //    specItem.innerText = `${spec}: ${product.spec[spec]}`;

    detailsList.append(specItem);
  }

  const getCartAmount = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartAmount = cart.length;
    const cartAmountElement = document.querySelector(".header__profile-counter");
    console.log(cartAmountElement);
    if (cartAmount > 0) {
      cartAmountElement.classList.add("header__profile-counter--show");
      cartAmountElement.innerText = cartAmount;
    }
  };

  const orderButton = document.createElement("button");
  orderButton.classList.add("details__order", "button", "button--order");
  orderButton.innerText = "Order";


  const detailsSpecs = document.querySelector(".details__specs");
  detailsSpecs.append(orderButton);
  orderButton.addEventListener("click", getCartAmount);
};

const createSortingOptions = () => {
  const sort = document.querySelector(".filters__sort");
  const uniqueSpecs = getSpecs();

  uniqueSpecs.forEach((uniqueSpec) => {
    const option = document.createElement("option");
    option.value = uniqueSpec;
    option.classList.add("filters__sort-option");
    option.innerText = uniqueSpec;

    sort.append(option);
  });
};

const getSpecs = () => {
  const product = getProductObject();
  const specs = product.items.map((item) => Object.keys(item.spec)).flat();
  return [...new Set(specs)];
};

const createProductItems = (category) => {
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

createSortingOptions();
createProductItems(getProductObject());

const filterSort = document.querySelector(".filters__sort");
filterSort.addEventListener("change", (e) => {
  const spec = e.target.value;
  sortAscending(spec);
});

const sortAscending = (spec) => {
  const product = getProductObject();

  product.items = product.items.sort((a, b) => {
    console.log();
    if (spec === "name") {
      return a[spec].localeCompare(b[spec]);
    } else if (spec === "price") {
      return a[spec] - b[spec];
    } else {
      return a.spec[spec] - b.spec[spec];
    }
  });

  const productItem = document.querySelectorAll(".products__item");

  productItem.forEach((item) => {
    item.remove();
  });
  createProductItems(product);
};

const sortDescending = (a, b) => {
  const product = getProductObject();

  product.items = product.items.sort((a, b) => {
    return a.spec[spec] - b.spec[spec];
  });

  const productItem = document.querySelectorAll(".products__item");

  productItem.forEach((item) => {
    item.remove();
  });
  createProductItems(product);
};
