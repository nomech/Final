import { data } from "../js/data.js";

const getProductObject = () => {
  const search = window.location.search;
  const id = new URLSearchParams(search).get("category");
  const category = data.categories.find((category) => category.id == id);
  return category;
};

const products = document.querySelector(".products")

const createProductItems = () => {
    const category = getProductObject();

    category.items.forEach(item => {
        const product = document.createElement("div");
        product.classList.add("products__item");

        const productImage = document.createElement("img");
        productImage.classList.add("products__image")
        productImage.src = item.image;

        const textGroup = document.createElement("div")
        textGroup.classList.add("products__text-group")

        const productPrice = document.createElement("p")
        productPrice.classList.add("products__price")
        productPrice.innerText = item.price;

        const productName = document.createElement("h2");
        productName.classList.add("products__name");
        productName.innerText = item.name;

        const viewButton = document.createElement("button")
        viewButton.classList.add("products__view", "button", "button--view")
        viewButton.innerText = "View"
        viewButton.addEventListener("click", () => {

        })

        textGroup.append(productName, productPrice)
        product.append(productImage, textGroup, viewButton)
        products.append(product)

    })
}

createProductItems()