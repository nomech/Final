window.document.addEventListener("DOMContentLoaded", () => {
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
    const main = document.querySelector(".main");
    main.innerHTML = "";
    const noOrders = document.createElement("p");
    noOrders.classList.add("orders__none");
    noOrders.innerText = "No orders yet!";
    main.append(noOrders);
  }
};

const orders = getCartAmount();
const ordersBody = document.querySelector(".orders__body");

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
  const summary = document.querySelector(".summary");
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
  orderButton.innerText = "Order now";
  orderButton.addEventListener("click", orderNow);

  summary.append(orderButton);
};

const orderNow = () => {
  localStorage.removeItem("cart");

  const main = document.querySelector(".main");
  const orders = document.querySelector(".orders");
  orders.remove();

  const summary = document.querySelector(".summary");
  summary.remove();

  const completeSection = document.createElement("section");
  completeSection.classList.add("order-complete");

  const complete = document.createElement("p");
  completeSection.classList.add("order__complete");
  completeSection.innerText = "Order complete!";

  completeSection.append(complete);
  main.append(completeSection);
};
