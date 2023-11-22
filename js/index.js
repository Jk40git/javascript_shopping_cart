function addToCart(productId) {
  $.get("https://fakestoreapi.com/products/" + productId, function (data, status) {
    // console.log(data);
    console.log(status);
    console.log(
      typeof productId
    )

    if (data) {
      const existingItem = !localStorage.getItem("cart")
        ? []
        : JSON.parse(localStorage.getItem("cart"));


      if (existingItem.length < 1) {
        const newItem = [
          {
            ...data,
            qty: 1,
          },
        ];

        localStorage.setItem("cart", JSON.stringify(newItem));
        return;
      }

      const oldItem = existingItem.find((item) => {
        console.log(typeof productId);
        console.log(typeof item.id);
        
        if (Number(item.id) == Number(productId)) {
          return {
            ...item,
            qty: item.qty++,
          };
        }
      });


     
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...existingItem.filter((p) => p.id !== Number(productId)),
            oldItem ?? { ...data, qty: 1 },
          ])
        );
      

    }
  });
 

}

$(document).ready(function () {
  $("button.btn-add-to-cart").click(function (e) {
    console.log(e);
  });


  function generateCard(product) {
    const card = `
         <div class="col">
          <div class="card h-100">
            <img style="height:50%;" src="${
              product.image
            }" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">
               ${product.price}
              </p>
              <p class="card-text card-description">
               ${product.description.split(".")[0]}
              </p>
            </div>

            <div class="card-footer">
                <button  
                value="${product.id}"
                onclick="addToCart('${product.id}')"      
                      type="button" 
                      class="btn btn-primary btn-sm btn-add-to-cart add-to-cart-form">
                          Add to Cart
                  </button>    
            
            </div>
          </div>
        </div>
    `;

    return card;
  }

  const productBox = $("#product-box");

  $.get("https://fakestoreapi.com/products", function (data, status) {
    // console.log(data);
    // console.log(status);
    if (data.length > 0) {
      data.forEach((product) => {
        productBox.append(generateCard(product));
      });
    }
  });
});
