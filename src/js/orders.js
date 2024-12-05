const cachedElements = {
  cartCounter: document.querySelector(".header__dropdown-counter"),
  empty: document.querySelector(".empty"),
  orderSection: document.querySelector(".orders"),
  ordersBody: document.querySelector(".orders__body"),
  summary: document.querySelector(".summary"),
  main: document.querySelector(".main"),
};

const { cartCounter, empty, orderSection, summary, ordersBody } = cachedElements;

window.document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => { 
    if(event.target.classList.contains("button--back")) {
      window.history.back();
    }
  })

  getCartAmount();
  createTableCells();
});

const convertToCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

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
    summary.classList.add("summary--hide");
    orderSection.classList.add("orders--hide");
  }
};

const orders = getCartAmount();

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
      amount.classList.add("orders__cell");
      amount.innerText = order.amount;

      //deacrese the amount
      const decreaseAmount = document.createElement("button");
      decreaseAmount.classList.add(
        "orders__decrease",
        "button",
        "button--minus"
      );
      decreaseAmount.innerText = "-";

      const price = document.createElement("td");
      price.classList.add("orders__cell");
      price.innerText = convertToCurrency(order.price);

      const total = document.createElement("td");
      total.classList.add("orders__cell");
      total.innerText = convertToCurrency(order.total);

      ordersBody.append(row);
      row.append(product, amount, price, total);
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
  total.innerText = `Total: ${convertToCurrency(totalAmount)}`;

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
