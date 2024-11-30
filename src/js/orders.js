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
  }
};

getCartAmount();

const body = document.querySelector(".orders__body");

const test = () => {
  const orders = getCartAmount();
  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.classList.add("orders__row");

    const product = document.createElement("td");
    product.classList.add("orders__cell");
    product.innerText = order.product;

    const amount = document.createElement("td");
    amount.classList.add("orders__cell");
    amount.innerText = order.amount;

    const price = document.createElement("td");
    price.classList.add("orders__cell");
    price.innerText = order.price;

    const total = document.createElement("td");
    total.classList.add("orders__cell");
    total.innerText = order.total;

    body.append(row);
    row.append(product, amount, price, total);
  });
};

test();
