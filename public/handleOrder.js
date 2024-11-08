const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const menu = document.getElementById("menu");

  const formData = new FormData(orderForm);
  const order = {
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("deliveryAddress"),
    tips: formData.get("tips"),
    restaurant: formData.get("restaurant"),
    items: [],
  };

  menu.childNodes.forEach((menuItem) => {
    const quantity = menuItem.querySelector("input").value;
    if (quantity > 0) {
      const item = {
        id: menuItem.id,
        quantity: quantity,
      };
      order.items.push(item);
    }
  });

  fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Order submitted!");
      orderForm.reset();
    })
    .catch((error) => {
      alert("Order failed to submit!");
    });
});
