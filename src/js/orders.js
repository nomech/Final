import { updateCartAmount, convertToCurrency } from "./utils.js";

const cachedElements = {
  empty: document.querySelector(".empty"),
  orderSection: document.querySelector(".orders"),
  ordersBody: document.querySelector(".orders__body"),
  summary: document.querySelector(".summary"),
  main: document.querySelector(".main"),
};

const { cartCounter, empty, orderSection, summary, ordersBody } =
  cachedElements;

window.document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button--back")) {
      window.history.back();
    }
  });

  getCartAmount();
  createTableCells();
});

const getCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    empty.classList.add("empty--hide");
    const orders = cart.map((order) => {
      return {
        id: order.id,
        product: order.name,
        price: order.price,
        amount: order.amount,
        total: order.price * order.amount,
      };
    });
    return orders;
  } else {
    console.log("No items in cart");
    empty.classList.remove("empty--hide");
    summary.classList.add("summary--hide");
    orderSection.classList.add("orders--hide");
  }
};

let orders = getCartAmount();

const incrementAmount = (event) => {
  event.target.previousElementSibling.value++;
  const id = parseInt(event.target.parentNode.parentNode.dataset.id);
  const value = parseInt(event.target.previousElementSibling.value);
  updateAmount(value, id);
};

const decrementAmount = (event) => {
  if (event.target.nextElementSibling.value > 1) {
    event.target.nextElementSibling.value--;
    const id = parseInt(event.target.parentNode.parentNode.dataset.id);
    const value = parseInt(event.target.nextElementSibling.value);
    updateAmount(value, id);
  }
};

const updateAmount = (value, id) => {
  const item = orders.find((order) => order.id === id);
  item.amount = value;

  let cart = JSON.parse(localStorage.getItem("cart"));
  const cartItem = cart.find((item) => item.id === id);
  cartItem.amount = item.amount;

  localStorage.setItem("cart", JSON.stringify(cart));

  //update total price
  const total = document.querySelector(`tr[data-id="${id}"] .orders__cell--total`);

  total.innerText = convertToCurrency(
    "en-US",
    "currency",
    "USD",
    item.price * item.amount
  );

  orders = getCartAmount();
  const totalAmount = sumerize(orders);
  const summary = document.querySelector(".summary__total");

  summary.innerText = `Total: ${convertToCurrency(
    "en-US",
    "currency",
    "USD",
    totalAmount
  )}`;
};

const createTableCells = () => {
  if (orders) {
    orders.forEach((order) => {
      const row = document.createElement("tr");
      row.classList.add("orders__row");
      row.dataset.id = order.id;

      const product = document.createElement("td");
      product.classList.add("orders__cell");
      product.innerText = order.product;

      const amount = document.createElement("td");
      amount.classList.add("orders__cell", "orders__cell--amount");

      const increaseAmount = document.createElement("button");
      increaseAmount.classList.add("orders__button","orders__increase");

      const increaseAmountIcon = document.createElement("img");
      increaseAmountIcon.src = "../assets/icons/circle-plus-solid.svg";
      increaseAmount.append(increaseAmountIcon);

      increaseAmount.addEventListener("click", (event) => {
        incrementAmount(event);
      });

      const amountInput = document.createElement("input");
      amountInput.classList.add("orders__input");
      amountInput.type = "number";
      amountInput.value = order.amount;
      amountInput.min = 1;

      const decreaseAmount = document.createElement("button");
      decreaseAmount.classList.add("orders__button","orders__decrease");
      const decreaseAmountIcon = document.createElement("img");
      decreaseAmountIcon.src = "../assets/icons/circle-minus-solid.svg";

      decreaseAmount.append(decreaseAmountIcon);
      decreaseAmount.addEventListener("click", (event) => {
        decrementAmount(event);
      });
      amount.append(decreaseAmount, amountInput, increaseAmount);

      const price = document.createElement("td");
      price.classList.add("orders__cell");
      price.innerText = convertToCurrency(
        "en-US",
        "currency",
        "USD",
        order.price
      );

      const total = document.createElement("td");
      total.classList.add("orders__cell", "orders__cell--total");
      total.innerText = convertToCurrency(
        "en-US",
        "currency",
        "USD",
        order.total
      );

      const removeRow = document.createElement("td");
      removeRow.classList.add("orders__cell", "orders__cell--remove");
      removeRow.innerText = "Remove";
      removeRow.addEventListener("click", (event) => removeItem(event));

      ordersBody.append(row);
      row.append(product, amount, price, total, removeRow);
    });
    createSummary();
  }
};

const sumerize = (ordersArr) => {
  return ordersArr.reduce((acc, current) => {
    return acc + current.total;
  }, 0);
};

const createSummary = () => {
  const totalAmount = sumerize(orders);
  summary.classList.remove("summary--hide");
  const total = document.createElement("p");
  total.classList.add("summary__total");
  total.innerText = `Total: ${convertToCurrency(
    "en-US",
    "currency",
    "USD",
    totalAmount
  )}`;

  summary.append(total);
  createOrderNowButton();
};

const createOrderNowButton = () => {
  const summary = document.querySelector(".summary");
  const orderButton = document.createElement("button");
  orderButton.classList.add("orders__order", "button", "button--order");
  orderButton.innerText = "Submit Order";
  orderButton.addEventListener("click", orderNow);

  summary.append(orderButton);
};

const orderNow = () => {
  localStorage.removeItem("cart");

  const cartCounter = document.querySelector(".header__dropdown-counter");
  cartCounter.innerText = `(0)`;

  const main = document.querySelector(".main");
  const orders = document.querySelector(".orders");
  orders.remove();

  const summary = document.querySelector(".summary");
  summary.remove();

  const completeSection = document.createElement("section");
  completeSection.classList.add("order-complete");

  const complete = document.createElement("p");
  completeSection.classList.add("order__complete");
  completeSection.innerText = "Order submitted!";

  completeSection.append(complete);
  main.append(completeSection);
};

const removeItem = (event) => {
  const row = event.target.parentNode;
  const id = parseInt(event.target.parentNode.dataset.id);
  let cart = JSON.parse(localStorage.getItem("cart"));

  const cartItem = cart.findIndex((item) => item.id === id);
  cart.splice(cartItem, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  row.remove();
  
  const cartCounter = document.querySelector(".header__dropdown-counter");
  cartCounter.innerText = `(${updateCartAmount()})`;

  orders = getCartAmount();
  const totalAmount = sumerize(orders);
  const summary = document.querySelector(".summary__total");

  summary.innerText = `Total: ${convertToCurrency(
    "en-US",
    "currency",
    "USD",
    totalAmount
  )}`;

  if (cart.length === 0) {
    localStorage.removeItem("cart");
    empty.classList.remove("empty--hide");
    summary.classList.add("summary--hide");
    orderSection.classList.add("orders--hide");
  }
};
