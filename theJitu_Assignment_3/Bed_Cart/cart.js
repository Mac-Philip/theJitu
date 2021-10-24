/*sticky Header*/
window.addEventListener("scroll", () => {
  let headerContainer = document.querySelector("header");
  let windowPosition = window.scrollY > 0;
  headerContainer.classList.toggle("scroll-active", windowPosition);
});

/* image slider*/
const slideImg = document.getElementById("sliderImg");

const sliderImages = [
  "images/slide1.jpg",
  "images/slide2.jpg",
  "images/slide3.jpg",
  "images/slide4.jpg",
  "images/slide5.jpg",
];

let imgLength = sliderImages.length;

let i = 0;

const slider = () => {
  if (i > imgLength - 1) {
    i = 0;
  }
  slideImg.src = sliderImages[i];
  i++;

  setTimeout("slider()", 3000);
};




/*-------------cart Functionality section-----------*/

/*assigning variable names to the functionality elements*/
//the cart icon on the header
const cartBtn = document.querySelector(".cart-btn");

//the amount of items that will show on the cart  icon.
const cartItems = document.querySelector(".cart-items");

//btn that shall close the cart
const closeCartBtn = document.querySelector(".close-cart");

//section containing products in the cart.
const cartCard = document.querySelector(".cart");

//the whole section of the cart.
const cartSection = document.querySelector(".cart-section");

//the total amount of everything in the cart.
const cartTotal = document.querySelector(".cart-total");

//products contained in the cart
const cartProducts = document.querySelector(".cart-products");

//products
const products = document.querySelector(".products-container"); //products

/*const addtoCartBtn = document.querySelectorAll(".addtoCart-btn")*/

//clear the cart
const clearCartBtn = document.querySelector(".clear-cart");

//data is stored locally in the xyzProducts.json'

/*products in the cart*/
let cart = [];

//the buttons
let productButtons = [];

//get the products class
class getProducts {
  async getxyzProducts() {
    try {
      let theProduct = await fetch("xyzProducts.json");
      let data = await theProduct.json();
      //return data;
      let xyzproducts = data.items;
      xyzproducts = xyzproducts.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return {
          id,
          title,
          price,
          image,
        };
      });
      return xyzproducts;
    } catch (error) {
      console.log(error);
    }
  }
}




//UI for displaying the products.
class displayProductsUI {
  displayXYZProducts(xyzproducts) {
    console.log(xyzproducts);
    let theXYZProducts = "";
    //loop the products then display the product section in the product-container div class.
    xyzproducts.forEach((product) => {
      theXYZProducts += `
      <div class="products">
          <!--Single Product-->
          <img
            src=${product.image}
            alt="product-image"
            class="product-img"
          />
          <div class="product-info">
            <h3 class="product-name">${product.title}</h3>
            <h4 class="price-product">$${product.price}</h4>
          </div>
          <button class="addtoCart-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart shoppingCartButton"></i> Add to cart
          </button>
          <!--End of Single Product-->
        </div>
      `;
    });
    products.innerHTML = theXYZProducts;
  }



  //add to cart functionality
  addCartBtn() {
    const addtoCartBtn = [...document.querySelectorAll(".addtoCart-btn")];
    console.log(addtoCartBtn);
    productButtons = addtoCartBtn;
    addtoCartBtn.forEach((button) => {
      let id = button.dataset.id;
      //console.log(id);

      //find the item in the cart if it is in the cart add it and disbale the button from being pressed again if not listen fro the click event.
      let productInCart = cart.find((item) => item.id === id);
      if (productInCart) {
        button.innerText = "Product in Cart";
        button.disabled = true; //if the item is in the cart, this button won't be able to be clicked again.
      }
      button.addEventListener("click", (e) => {
        //console.log(e);
        e.target.innerText = "Product in Cart";
        e.target.disabled = true;

        //get the specific products from xyzproducts
        let cartProducts = { ...Storage.getXYZproducts(id), amount: 1 }; //use the spread operator, add the amount of items of the product
        console.log(cartProducts);

        // add product to the cart
        cart = [...cart, cartProducts];
        console.log(cart);

        //save products in the cart to the localStorage
        Storage.saveCartProducts(cart);

        //display cart Values/prices
        this.displayCartValues(cart);

        //display cart products
        this.addCartProducts(cartProducts);

        //show the cart
        this.displayCart();

        //close the cart
        this.closeCart();
      });
    });
  }


  //displaying the cart Values
  displayCartValues(cart) {
    let currentTotal = 0;
    let theProductsTotal = 0;

    cart.map((product) => {
      currentTotal += product.price * product.amount;
      theProductsTotal += product.amount;
    });
    cartTotal.innerText = parseFloat(currentTotal.toFixed(2));
    cartItems.innerText = theProductsTotal;
    //console.log(cartTotal, cartItems);
  }


  //display products to the DOM
  addCartProducts(theProduct) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
              <div class="cart-imageContainer">
                <img src=${theProduct.image} alt=${theProduct.title} />
              </div>
              <div class="cartItem-details">
                <h4 class="cartItem-name">${theProduct.title}</h4>
                <h5 class="cartItem-price">$${theProduct.price}</h5>
                <span class="remove-item" data-id = ${theProduct.id}>remove</span>
              </div>
              <div class="item-quantity">
                <i class="fas fa-chevron-up"data-id = ${theProduct.id}></i>
                <h4 class="product-quantity" data-id = ${theProduct.amount}>1</h4>
                <i class="fas fa-chevron-down"data-id = ${theProduct.id}></i>
              </div>
    `;
    cartProducts.appendChild(div);
    console.log(cartProducts);
  }


  //display the cart method to check products added.
  displayCart(){
    cartSection.classList.add('transparentBcg');
    cartCard.classList.add('showCart');
  }


  //load the cart items from the localstorage
  setUPcart(){
    cart = Storage.getCart();
    this.displayCartValues(cart);
    this.addCartData(cart);
    cartBtn.addEventListener('click', this.displayCart);
    closeCartBtn.addEventListener('click', this.closeCart)
  }


  //display current data in the cart
  addCartData(cart){
    cart.forEach(product => this.addCartProducts(product));
    
  }


  closeCart(){
    cartSection.classList.remove('transparentBcg');
    cartCard.classList.remove('showCart');
  }


  cartSection(){
    //clear the cart using the clear cart button
    clearCartBtn.addEventListener('click', ()=>{
      this.clearTheCart()
    });

    //cart functionality events
    cartProducts.addEventListener('click', (e)=>{
      //console.log(e.target)
      if(e.target.classList.contains('remove-item')){
        let removeItem = e.target;
        //console.log(removeItem);
        
        let productId = removeItem.dataset.id;
        //console.log(productId);

        cartProducts.removeChild(removeItem.parentElement.parentElement);

        //use the removeCartProducts method.
        this.removeCartProducts(productId);
      }else if (e.target.classList.contains('fa-chevron-up')){
        let addQuantity = e.target;
        //console.log(addQuantity);

        let quantityId = addQuantity.dataset.id;
        //console.log(quantityId);

        let currentQuantityProduct = cart.find(product => product.id === quantityId);

        currentQuantityProduct.amount = currentQuantityProduct.amount + 1;

        Storage.saveCartProducts(cart);
        this.displayCartValues(cart);

        addQuantity.nextElementSibling.innerText = currentQuantityProduct.amount;
      }
      else if (e.target.classList.contains('fa-chevron-down')){
        let decreasedQuantity = e.target;
        //console.log(decreasedQuantity);

        let quantityId = decreasedQuantity.dataset.id;
        //console.log(quantityId);

        let decreasedQuantityProduct = cart.find(product => product.id === quantityId);

        decreasedQuantityProduct.amount = decreasedQuantityProduct.amount - 1;

        if(decreasedQuantityProduct.amount > 0){
          Storage.saveCartProducts(cart);
          this.displayCartValues(cart);
          decreasedQuantity.previousElementSibling.innerText = decreasedQuantityProduct.amount;
        }else{
          cartProducts.removeChild(decreasedQuantity.parentElement.parentElement)
          this.removeCartProducts(quantityId);
        }
      }
    })
  }


  clearTheCart(){
    //console.log(this);
    let theCartProducts = cart.map(product => product.id);
    

    //get all the cart products id
   theCartProducts.forEach(id => this.removeCartProducts(id));

    //remove all the items in the cart
    while(cartProducts.children.length > 0){
      cartProducts.removeChild(cartProducts.children[0])
    }
    //console.log(cartProducts.children);
    //close the cart after removing the removeCartProducts
    this.closeCart();
  }

  //remove products from the cart
  removeCartProducts(id){
    //filter the cart products
    cart = cart.filter(product => product.id !== id);
    this.displayCartValues(cart);
    Storage.saveCartProducts(cart);
    let productBtn = this.getEachSingleBtn(id);
    productBtn.disabled = false;
    productBtn.innerHTML = `<i class="fas fa-shopping-cart shoppingCartButton"></i> Add to cart`;
  }

  //get each single buttons of the product
  getEachSingleBtn(id){
    return productButtons.find(button => button.dataset.id === id);
  }
}







//local storage class
class Storage {
  static saveTheProducts(xyzproducts) {
    localStorage.setItem("cartitems", JSON.stringify(xyzproducts));
  }

  static getXYZproducts(id) {
    let products = JSON.parse(localStorage.getItem("cartitems"));
    return products.find((product) => product.id === id);
  }

  static saveCartProducts(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart(){
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [];
  }
}






document.addEventListener("DOMContentLoaded", () => {
  const displayproductsui = new displayProductsUI();
  const getproducts = new getProducts();

  //setupthe application
  displayproductsui.setUPcart();

  //get all products
  getproducts
    .getxyzProducts()
    .then((xyzproducts) => {
      displayproductsui.displayXYZProducts(xyzproducts);

      //save products on the localstorage
      Storage.saveTheProducts(xyzproducts);
    })
    .then(() => {
      displayproductsui.addCartBtn();
      displayproductsui.cartSection();
    });
});
