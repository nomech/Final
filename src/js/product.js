import { data } from "./data.js";
import { convertToCurrency, getPageId, updateCartAmount, getCurrentCategory } from "./utils.js";

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
  home
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
      const classList = event.target.classList;
      if (classList.contains("products__view")) {
        redirect(event);
        const parentId = parseInt(event.target.parentNode.dataset.id);
        viewProduct(parentId);
      } else if(classList.contains("filters__home")) {
        window.location.href ="../index.html"
    };
  });
}

  document.addEventListener("click", (event) => {
    updateAmount(event);
  });
  createSortingOptions();
});

const updateAmount = (event) => {
  const detailsPlus = event.target.classList.contains("details__plus");
  const detailsMinus = event.target.classList.contains("details__minus");

  if (detailsPlus) {
    amount.value = parseInt(amount.value) + 1;
  } else if (detailsMinus && amount.value > 1) {
    amount.value = parseInt(amount.value) - 1;
  }
};


const categoryId = getCurrentCategory();
const products = data.products.filter(
  (product) => product.categoryId === categoryId
);

const redirect = (event) => {
  const parentId = event.target.parentNode.dataset.id;
  window.location.href = window.location.pathname + "?id=" + parentId;
};

const createSortingOptions = (s) => {
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
  const productsToSort = [...products];
  if (spec === "price") {
    sortedProducts = productsToSort.sort((a, b) => b.price - a.price);
  } else if (spec === "name") {
    sortedProducts = productsToSort.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else {
    sortedProducts = productsToSort.sort((a, b) => b.spec[spec] - a.spec[spec]);
  }
  renderProducts(sortedProducts);
};

const addProductToCart = () => {
  const parentId = parseInt(
    new URLSearchParams(window.location.search).get("id")
  );

  const product = products.find((category) => category.id === parentId);
  product.amount = parseInt(amount.value);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.amount += product.amount;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const orderButton = cachedElements["orderButton"];
  orderButton.disabled = true;
  orderButton.classList.remove("button--order");
  orderButton.classList.add("button--disabled");
  orderButton.innerText = "Added to cart!";

  setTimeout(() => {
    orderButton.disabled = false;
    orderButton.classList.remove("button--disabled");
    orderButton.classList.add("button--order");
    orderButton.innerText = "Add to cart";
  }, 1000);

  const cartCounter = document.querySelector(".header__dropdown-counter");
  cartCounter.innerText = `(${updateCartAmount()})`;
};

const viewProduct = (id) => {
  filterSection.remove();

  const product = products.find((category) => category.id === id);
  productSection.classList.toggle("products--show");
  details.classList.toggle("details--show");

  detailsTitle.innerText = product.name;
  detailsImage.alt = `Image of the ${product.name}`;
  detailsImage.src = product.image;
  detailsPrice.innerText = convertToCurrency(
    "en-US",
    "currency",
    "USD",
    product.price
  );
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
  cachedElements["orderButton"] = orderButton;

  orderButton.innerText = "Add to cart";
  orderButton.addEventListener("click", addProductToCart);
  detailsSpecs.append(orderButton);
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
    productPrice.innerText = convertToCurrency(
      "en-US",
      "currency",
      "USD",
      item.price
    );
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
