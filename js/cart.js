$(document).ready(function () {
  function generateListItem(product) {
    const li = `
         <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Subheading</div>
              ${product.title}
            </div>
            <span class="badge bg-primary rounded-pill">
            ${product.price}
            </span>
          </li>
        
        `;
  }


   const cartBox = $("#cart-box");
   const container =$(".container");

    const existingItems = !localStorage.getItem("cart")
      ? []
      : JSON.parse(localStorage.getItem("cart"));

      existingItems.forEach(item => {
        cartBox.append(generateListItem(item))
      });


});
