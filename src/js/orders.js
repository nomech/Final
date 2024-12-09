//Imports data and utility functions
import { updateCartAmount, convertToCurrency } from "./utils.js";

// Cached DOM elements
const cachedElements = {
  empty: document.querySelector(".empty"),
  orderSection: document.querySelector(".orders"),
  ordersBody: document.querySelector(".orders__body"),
  summary: document.querySelector(".summary"),
  main: document.querySelector(".main"),
};

// Destructured DOM Elements
const { empty, orderSection, summary, ordersBody } = cachedElements;

//Ensures that the page is fully loaded before running the script
window.document.addEventListener("DOMContentLoaded", () => {
  getCartAmount();
  createTableCells();

  // Event listener for the back button
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button--back")) {
      // Redirects the user to the previous page
      window.history.back();
    }
  });
});


//Function that gets the cart amount
const getCartAmount = () => {
  //Gets the cart from the local storage
  const cart = JSON.parse(localStorage.getItem("cart"));

  //Checks if the cart is empty
  if (cart) {
    //Hides the empty cart message
    empty.classList.add("empty--hide");
    //Iterates through the cart and creates the order items
    const orders = cart.map((order) => {
      //Returns the order item
      return {
        id: order.id,
        product: order.name,
        price: order.price,
        amount: order.amount,
        total: order.price * order.amount,
      };
    });
    //Returns the order details
    return orders;

    //Shows the empty cart message
  } else {
    empty.classList.remove("empty--hide");
    summary.classList.add("summary--hide");
    orderSection.classList.add("orders--hide");
  }
};


let orders = getCartAmount();

//Function that increments the amount of an item
const incrementAmount = (event) => {
  //Increments the amount value
  event.target.previousElementSibling.value++;
  const id = parseInt(event.target.parentNode.parentNode.dataset.id);
  const value = parseInt(event.target.previousElementSibling.value);
  //Updates the amount value
  updateAmount(value, id);
};

//Function that decrements the amount of an item
const decrementAmount = (event) => {
  //Decrements the amount value if it is greater than 1
  if (event.target.nextElementSibling.value > 1) {
    //Decrements the amount value
    event.target.nextElementSibling.value--;
    const id = parseInt(event.target.parentNode.parentNode.dataset.id);
    const value = parseInt(event.target.nextElementSibling.value);
    //Updates the amount value
    updateAmount(value, id);
  }
};

//Function that updates the amount value
const updateAmount = (value, id) => {
  //Finds the item in the orders array
  const item = orders.find((order) => order.id === id);
  item.amount = value;

  //Updates the cart in the local storage
  let cart = JSON.parse(localStorage.getItem("cart"));

  //Finds the item in the cart array
  const cartItem = cart.find((item) => item.id === id);
  cartItem.amount = item.amount;

  //Updates the cart in the local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  //update total price
  const total = document.querySelector(`tr[data-id="${id}"] .orders__cell--total`);
  total.innerText = convertToCurrency("en-US", "currency", "USD", item.price * item.amount);

  //Gets the updated cart amount
  orders = getCartAmount();
  //Creates the summary
  const totalAmount = sumerize(orders);

  //Updates the total amount
  const summary = document.querySelector(".summary__total");
  summary.innerText = `Total: ${convertToCurrency("en-US", "currency", "USD", totalAmount)}`;
};

//Function that creates the order items
const createTableCells = () => {
  //Checks if the orders array is not empty
  if (orders) {
    //Iterates through the orders array and creates the order items
    orders.forEach((order) => {
      //Creates the row
      const row = document.createElement("tr");
      row.classList.add("orders__row");
      row.dataset.id = order.id;

      //Creates the product cell
      const product = document.createElement("td");
      product.classList.add("orders__cell");
      product.innerText = order.product;

      //Creates the amount cell
      const amount = document.createElement("td");
      amount.classList.add("orders__cell", "orders__cell--amount");

      //Creates the increase button
      const increaseAmount = document.createElement("button");
      increaseAmount.classList.add("orders__button", "orders__increase");

      //Creates the increase button icon
      const increaseAmountIcon = document.createElement("img");
      increaseAmountIcon.src = "../assets/icons/circle-plus-solid.svg";
      increaseAmount.append(increaseAmountIcon);

      //Event listener for the increase button
      increaseAmount.addEventListener("click", (event) => {
        incrementAmount(event);
      });

      //Creates the amount input field
      const amountInput = document.createElement("input");
      amountInput.classList.add("orders__input");
      amountInput.type = "number";
      amountInput.value = order.amount;
      amountInput.min = 1;

      //Creates the decrease button
      const decreaseAmount = document.createElement("button");
      decreaseAmount.classList.add("orders__button", "orders__decrease");
      const decreaseAmountIcon = document.createElement("img");
      decreaseAmountIcon.src = "../assets/icons/circle-minus-solid.svg";

       //Event listener for the decrease button and appends the elements to the amount cell
      decreaseAmount.append(decreaseAmountIcon);
      decreaseAmount.addEventListener("click", (event) => {
        decrementAmount(event);
      });

      //Appends the elements to the amount cell
      amount.append(decreaseAmount, amountInput, increaseAmount);

      //Creates the price cell
      const price = document.createElement("td");
      price.classList.add("orders__cell");
      price.innerText = convertToCurrency("en-US", "currency", "USD", order.price);

      //Creates the total cell
      const total = document.createElement("td");
      total.classList.add("orders__cell", "orders__cell--total");
      total.innerText = convertToCurrency("en-US", "currency", "USD", order.total);

      //Creates the remove cell
      const removeRow = document.createElement("td");
      removeRow.classList.add("orders__cell", "orders__cell--remove");
      removeRow.innerText = "Remove";
      removeRow.addEventListener("click", (event) => removeItem(event));

      //Appends the cells to the row
      ordersBody.append(row);
      row.append(product, amount, price, total, removeRow);
    });
    //Creates the summary
    createSummary();
  }
};

//Function that sums the total amount of the orders
const sumerize = (ordersArr) => {
  return ordersArr.reduce((acc, current) => {
    return acc + current.total;
  }, 0);
};

//Function that creates the summary
const createSummary = () => {
  //Gets the total amount of the orders
  const totalAmount = sumerize(orders);

  //Shows the summary
  summary.classList.remove("summary--hide");

  //Creates the total amount element
  const total = document.createElement("p");
  total.classList.add("summary__total");
  total.innerText = `Total: ${convertToCurrency("en-US", "currency", "USD", totalAmount)}`;

  //Appends the total amount to the summary
  summary.append(total);

  //Creates the order now button
  createOrderNowButton();
};

//Function that creates the order now button
const createOrderNowButton = () => {
  //Creates the order now button
  const summary = document.querySelector(".summary");
  const orderButton = document.createElement("button");
  orderButton.classList.add("orders__order", "button", "button--order");
  orderButton.innerText = "Submit Order";
  orderButton.addEventListener("click", orderNow);

  summary.append(orderButton);
};

//Function that submits the order
const orderNow = () => {
  //Removes the cart from the local
  localStorage.removeItem("cart");

  //Updates the cart counter
  const cartCounter = document.querySelector(".header__dropdown-counter");
  cartCounter.innerText = `(0)`;

  //Removes the orders section
  const main = document.querySelector(".main");
  const orders = document.querySelector(".orders");
  orders.remove();

  //Creates the order complete section
  const summary = document.querySelector(".summary");
  summary.remove();

  //Creates the order complete section
  const completeSection = document.createElement("section");
  completeSection.classList.add("order-complete");

  //Creates the order complete message
  const complete = document.createElement("p");
  completeSection.classList.add("order__complete");
  completeSection.innerText = "Order submitted!";

  //Appends the order complete message to the order complete section
  completeSection.append(complete);
  main.append(completeSection);
};

//Function that removes an item from the cart
const removeItem = (event) => {
  //Gets the row and id of the item
  const row = event.target.parentNode;
  const id = parseInt(event.target.parentNode.dataset.id);

  //Gets the cart from the local storage
  let cart = JSON.parse(localStorage.getItem("cart"));

  //Finds the item in the cart array and removes it
  const cartItem = cart.findIndex((item) => item.id === id);
  cart.splice(cartItem, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  row.remove();

  //Updates the cart amount
  const cartCounter = document.querySelector(".header__dropdown-counter");
  cartCounter.innerText = `(${updateCartAmount()})`;

  //Gets the updated cart amount
  orders = getCartAmount();
  const totalAmount = sumerize(orders);
  const summary = document.querySelector(".summary__total");

  //Updates the total amount
  summary.innerText = `Total: ${convertToCurrency("en-US", "currency", "USD", totalAmount)}`;

  //Checks if the cart is empty
  if (cart.length === 0) {
    //Removes the cart from the local storage
    localStorage.removeItem("cart");
    empty.classList.remove("empty--hide");
    summary.classList.add("summary--hide");
    orderSection.classList.add("orders--hide");
  }
};
