
/* =====================================================
   PLATINUMPESOS®
   NEW KIDS ON THE BLOCK
   WEBSITE FUNCTIONALITY
===================================================== */


/* =====================================================
   1. PRODUCT INFORMATION
===================================================== */

const products = [
  {
    id: "cashmachine-tee",
    name: "CASHMACHINE TEE",
    category: "COLLECTION 001",
    price: 200,
    image: "https://i.ibb.co/Nd50yTNg/b067f148-0162-4242-b110-8fc9714e7efb.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["AS SHOWN"]
  },

  {
    id: "wtf-tee",
    name: "WTF TEE",
    category: "COLLECTION 001",
    price: 200,
    image: "https://i.ibb.co/tSpHHcW/04de9062-1ed8-48e5-9dd9-7ef5a3300065.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["AS SHOWN"]
  },

  {
    id: "essential-white",
    name: "ESSENTIAL PP TEE — WHITE",
    category: "ESSENTIAL SERIES",
    price: 250,
    image: "https://i.ibb.co/hFj35mMs/7406c37b-4314-4aef-b8e8-a053c7f44622.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["WHITE"]
  },

  {
    id: "essential-black",
    name: "ESSENTIAL PP TEE — BLACK",
    category: "ESSENTIAL SERIES",
    price: 250,
    image: "https://i.ibb.co/GQn4gXst/9f49eb10-6977-4b8c-a181-283ac3ccb1cd.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["BLACK"]
  },

  {
    id: "ladies-crop-01",
    name: "LADIES CROP TOP 01",
    category: "LADIES COLLECTION",
    price: 180,
    image: "https://i.ibb.co/BRtw4YP/73a5fdbb-e605-470c-a1a5-9810c8d0ab27.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["AS SHOWN"]
  },

  {
    id: "ladies-crop-02",
    name: "LADIES CROP TOP 02",
    category: "LADIES COLLECTION",
    price: 180,
    image: "https://i.ibb.co/tPT79j9b/2d25b754-f2f4-488b-8543-400015c28e8a.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["AS SHOWN"]
  },

  {
    id: "pp-socks",
    name: "PLATINUMPESOS SOCKS",
    category: "ACCESSORIES",
    price: null,
    image: "https://i.ibb.co/S4gVPBrg/6bb802e0-9090-443e-a3df-e5e3490b73de.png",
    sizes: ["S", "M", "L", "XL"],
    colours: ["AS SHOWN"]
  }
];


/* =====================================================
   2. GENERAL SETTINGS
===================================================== */

// WhatsApp number in international format.
// Botswana country code: 267.

const WHATSAPP_NUMBER = "26774303330";

// Maximum quantity allowed per individual
// product, size and colour combination in the cart.
// This is a cart limit, not verified stock information.

const MAX_QUANTITY = 15;

// Local storage key.

const STORAGE_KEY = "platinumpesos_shopping_bag_v1";


/* =====================================================
   3. HELPER FUNCTIONS
===================================================== */

function formatMoney(amount) {
  return "P" + Number(amount).toFixed(2);
}


function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return replacements[character];
  });
}


function getProduct(productId) {
  return products.find(function (product) {
    return product.id === productId;
  });
}


function getProductDisplayPrice(product) {
  if (product.price === null) {
    return "PRICE ON REQUEST";
  }

  return formatMoney(product.price);
}


/* =====================================================
   4. WEBSITE ELEMENTS
===================================================== */

const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loaderFill");
const loaderPercent = document.getElementById("loaderPercent");

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const site = document.getElementById("site");

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

const bagCount = document.getElementById("bagCount");
const cartHeadingCount = document.getElementById("cartHeadingCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const productModal = document.getElementById("productModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalCategory = document.getElementById("modalCategory");

const sizeOptions = document.getElementById("sizeOptions");
const colourOptions = document.getElementById("colourOptions");
const colourHint = document.getElementById("colourHint");

const addToBagButton = document.getElementById("addToBag");
const stockNote = document.getElementById("stockNote");

const toast = document.getElementById("toast");


/* =====================================================
   5. LOADING SCREEN
===================================================== */

let loadingProgress = 0;
let loadingInterval = null;
let loaderFinished = false;

function updateLoader() {
  loadingProgress = Math.min(loadingProgress + 2, 90);

  if (loaderFill) {
    loaderFill.style.width = loadingProgress + "%";
  }

  if (loaderPercent) {
    loaderPercent.textContent =
      String(loadingProgress).padStart(2, "0") + "%";
  }
}


function finishLoader() {
  if (loaderFinished) return;

  loaderFinished = true;

  if (loadingInterval) {
    clearInterval(loadingInterval);
  }

  loadingProgress = 100;

  if (loaderFill) {
    loaderFill.style.width = "100%";
  }

  if (loaderPercent) {
    loaderPercent.textContent = "100%";
  }

  setTimeout(function () {
    if (loader) {
      loader.classList.add("hidden");
    }

    if (intro) {
      intro.classList.add("visible");
    }

  }, 350);
}


// Keep the loader moving while the website loads.

loadingInterval = setInterval(updateLoader, 55);


// Finish when the browser has loaded the page.
// A fallback prevents the loader from remaining forever.

if (document.readyState === "complete") {
  finishLoader();
} else {
  window.addEventListener("load", finishLoader, { once: true });
}

setTimeout(finishLoader, 8000);


/* =====================================================
   6. ENTER WEBSITE
===================================================== */

document.body.classList.add("no-scroll");


if (enterButton) {
  enterButton.addEventListener("click", function () {

    if (intro) {
      intro.classList.add("leaving");

      setTimeout(function () {
        intro.style.display = "none";
      }, 850);
    }

    document.body.classList.remove("no-scroll");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });
}


/* =====================================================
   7. PRODUCT COLLECTION
===================================================== */

function renderProducts() {

  if (!productGrid) return;

  productGrid.innerHTML = products.map(function (product) {

    return `
      <article
        class="product-card"
        data-product-id="${escapeHTML(product.id)}"
        tabindex="0"
        role="button"
        aria-label="View ${escapeHTML(product.name)}"
      >

        <div class="product-image-wrap">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
          >

          <span class="product-tag">
            ${escapeHTML(product.category)}
          </span>

          <span class="product-view">
            ↗
          </span>

        </div>

        <div class="product-details">

          <div>
            <h3>${escapeHTML(product.name)}</h3>

            <p>
              ${product.price === null
                ? "PRICE ON REQUEST"
                : "SELECT SIZE"}
            </p>
          </div>

          <span class="product-price">
            ${escapeHTML(getProductDisplayPrice(product))}
          </span>

        </div>

      </article>
    `;

  }).join("");

  if (productCount) {
    productCount.textContent =
      String(products.length).padStart(2, "0");
  }
}


renderProducts();


/* =====================================================
   8. PRODUCT DETAILS POPUP
===================================================== */

let selectedProduct = null;
let selectedSize = "";
let selectedColour = "";


function openProductModal(productId) {

  const product = getProduct(productId);

  if (!product) return;

  selectedProduct = product;
  selectedSize = "";
  selectedColour = "";

  modalImage.src = product.image;
  modalImage.alt = product.name;

  modalName.textContent = product.name;
  modalPrice.textContent = getProductDisplayPrice(product);
  modalCategory.textContent = product.category;

  // Create the size options.

  sizeOptions.innerHTML = product.sizes.map(function (size) {

    return `
      <button
        type="button"
        data-size="${escapeHTML(size)}"
        aria-pressed="false"
      >
        ${escapeHTML(size)}
      </button>
    `;

  }).join("");


  // Create colour options.

  colourOptions.innerHTML = product.colours.map(function (colour) {

    return `
      <button
        type="button"
        data-colour="${escapeHTML(colour)}"
        aria-pressed="false"
      >
        ${escapeHTML(colour)}
      </button>
    `;

  }).join("");

  if (colourHint) {
    colourHint.textContent = "SELECT ONE";
  }

  if (product.price === null) {

    addToBagButton.innerHTML = `
      ASK FOR PRICE
      <span>↗</span>
    `;

    stockNote.textContent =
      "Contact us on WhatsApp for the current price.";

  } else {

    addToBagButton.innerHTML = `
      ADD TO BAG
      <span>↗</span>
    `;

    stockNote.textContent =
      "Availability confirmed personally.";

  }

  productModal.classList.add("active");
  productModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");
}


function closeProductModal() {

  productModal.classList.remove("active");
  productModal.setAttribute("aria-hidden", "true");

  selectedProduct = null;
  selectedSize = "";
  selectedColour = "";

  if (!cartDrawer.classList.contains("active")) {
    document.body.classList.remove("no-scroll");
  }
}


// Open a product when a product card is clicked.

if (productGrid) {

  productGrid.addEventListener("click", function (event) {

    const card = event.target.closest(".product-card");

    if (!card) return;

    openProductModal(card.dataset.productId);

  });


  // Also support keyboard users.

  productGrid.addEventListener("keydown", function (event) {

    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest(".product-card");

    if (!card) return;

    event.preventDefault();

    openProductModal(card.dataset.productId);

  });

}


// Select a product size.

sizeOptions.addEventListener("click", function (event) {

  const button = event.target.closest("button");

  if (!button) return;

  selectedSize = button.dataset.size;

  sizeOptions.querySelectorAll("button").forEach(function (item) {

    const isSelected = item === button;

    item.classList.toggle("selected", isSelected);

    item.setAttribute(
      "aria-pressed",
      String(isSelected)
    );

  });

});


// Select a product colour.

colourOptions.addEventListener("click", function (event) {

  const button = event.target.closest("button");

  if (!button) return;

  selectedColour = button.dataset.colour;

  colourOptions.querySelectorAll("button").forEach(function (item) {

    const isSelected = item === button;

    item.classList.toggle("selected", isSelected);

    item.setAttribute(
      "aria-pressed",
      String(isSelected)
    );

  });

  if (colourHint) {
    colourHint.textContent = selectedColour;
  }

});


// Close product popup.

if (modalClose) {
  modalClose.addEventListener("click", closeProductModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeProductModal);
}


/* =====================================================
   9. NOTIFICATION MESSAGE
===================================================== */

let toastTimeout;

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(function () {
    toast.classList.remove("show");
  }, 2800);

}


/* =====================================================
   10. SHOPPING BAG STORAGE
===================================================== */

let cart = [];


function loadCart() {

  try {

    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter(function (item) {

      const product = getProduct(item.productId);

      return (
        product &&
        product.price !== null &&
        typeof item.size === "string" &&
        typeof item.colour === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      );

    }).map(function (item) {

      return {
        productId: item.productId,
        size: item.size,
        colour: item.colour,
        quantity: Math.min(item.quantity, MAX_QUANTITY)
      };

    });

  } catch (error) {

    console.warn("Could not load saved shopping bag:", error);

    return [];

  }

}


function saveCart() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );

  } catch (error) {

    console.warn("Could not save shopping bag:", error);

  }

}


cart = loadCart();


/* =====================================================
   11. ADD PRODUCTS TO SHOPPING BAG
===================================================== */

function addProductToCart() {

  if (!selectedProduct) return;

  // Socks and other items without a listed price
  // must be queried through WhatsApp.

  if (selectedProduct.price === null) {

    const message =
      "Hello PLATINUMPESOS, I would like to enquire about the price of " +
      selectedProduct.name + ".";

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener");

    closeProductModal();

    return;
  }


  if (!selectedSize) {

    showToast("PLEASE SELECT A SIZE.");

    return;
  }


  if (!selectedColour) {

    showToast("PLEASE SELECT A COLOUR.");

    return;
  }


  const existingItem = cart.find(function (item) {

    return (
      item.productId === selectedProduct.id &&
      item.size === selectedSize &&
      item.colour === selectedColour
    );

  });


  if (existingItem) {

    if (existingItem.quantity >= MAX_QUANTITY) {

      showToast("MAXIMUM CART QUANTITY REACHED.");

      return;
    }

    existingItem.quantity += 1;

  } else {

    cart.push({
      productId: selectedProduct.id,
      size: selectedSize,
      colour: selectedColour,
      quantity: 1
    });

  }


  saveCart();

  renderCart();

  closeProductModal();

  openShoppingBag();

  showToast("ADDED TO YOUR BAG.");

}


if (addToBagButton) {
  addToBagButton.addEventListener("click", addProductToCart);
}


/* =====================================================
   12. CART CALCULATIONS
===================================================== */

function getCartItemCount() {

  return cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

}


function getCartSubtotal() {

  return cart.reduce(function (total, item) {

    const product = getProduct(item.productId);

    if (!product || product.price === null) {
      return total;
    }

    return total + product.price * item.quantity;

  }, 0);

}


/* =====================================================
   13. DISPLAY SHOPPING BAG
===================================================== */

function renderCart() {

  const totalItems = getCartItemCount();
  const subtotal = getCartSubtotal();

  bagCount.textContent =
    String(totalItems).padStart(2, "0");

  cartHeadingCount.textContent =
    "(" + String(totalItems).padStart(2, "0") + ")";

  cartTotal.textContent = formatMoney(subtotal);


  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-bag">
        YOUR BAG IS CURRENTLY EMPTY.
      </div>
    `;

    return;
  }


  cartItems.innerHTML = cart.map(function (item, index) {

    const product = getProduct(item.productId);

    if (!product) return "";

    return `
      <div class="cart-item">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

        <div class="cart-item-info">

          <h3>${escapeHTML(product.name)}</h3>

          <p>SIZE: ${escapeHTML(item.size)}</p>

          <p>COLOUR: ${escapeHTML(item.colour)}</p>

          <p>
            ${formatMoney(product.price)} EACH
          </p>

          <div class="cart-item-actions">

            <button
              type="button"
              data-action="decrease"
              data-index="${index}"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-action="increase"
              data-index="${index}"
              aria-label="Increase quantity"
            >
              +
            </button>

            <button
              type="button"
              class="remove-item"
              data-action="remove"
              data-index="${index}"
            >
              REMOVE
            </button>

          </div>

        </div>

        <span class="cart-item-price">
          ${formatMoney(product.price * item.quantity)}
        </span>

      </div>
    `;

  }).join("");

}


// Update quantities and remove products.

cartItems.addEventListener("click", function (event) {

  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const index = Number(button.dataset.index);

  if (!Number.isInteger(index) || !cart[index]) return;

  const action = button.dataset.action;


  if (action === "increase") {

    if (cart[index].quantity < MAX_QUANTITY) {

      cart[index].quantity += 1;

    } else {

      showToast("MAXIMUM CART QUANTITY REACHED.");

    }

  }


  if (action === "decrease") {

    cart[index].quantity -= 1;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

  }


  if (action === "remove") {

    cart.splice(index, 1);

    showToast("ITEM REMOVED.");

  }


  saveCart();

  renderCart();

});


/* =====================================================
   14. OPEN AND CLOSE SHOPPING BAG
===================================================== */

function openShoppingBag() {

  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");

  cartDrawer.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");

}


function closeShoppingBag() {

  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");

  cartDrawer.setAttribute("aria-hidden", "true");

  if (!productModal.classList.contains("active")) {
    document.body.classList.remove("no-scroll");
  }

}


if (openCartButton) {
  openCartButton.addEventListener("click", openShoppingBag);
}

if (closeCartButton) {
  closeCartButton.addEventListener("click", closeShoppingBag);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeShoppingBag);
}


/* =====================================================
   15. WHATSAPP CHECKOUT
===================================================== */

function checkoutViaWhatsApp() {

  if (!cart.length) {
    showToast("YOUR BAG IS EMPTY.");
    return;
  }

  const subtotal = getCartSubtotal();

  // Free delivery applies strictly above P500.
  const qualifiesForFreeDelivery = subtotal > 500;

  let message = "";

  message += "PLATINUMPESOS® — NEW ORDER\n";
  message += "==============================\n\n";

  message += "Hello PLATINUMPESOS,\n";
  message += "I would like to place the following order:\n\n";

  cart.forEach(function (item, index) {

    const product = getProduct(item.productId);

    if (!product || product.price === null) return;

    const lineTotal = product.price * item.quantity;

    message += (index + 1) + ". " + product.name + "\n";
    message += "Size: " + item.size + "\n";
    message += "Colour: " + item.colour + "\n";
    message += "Quantity: " + item.quantity + "\n";
    message += "Unit price: " + formatMoney(product.price) + "\n";
    message += "Subtotal: " + formatMoney(lineTotal) + "\n\n";

  });

  message += "==============================\n";
  message += "ORDER SUBTOTAL: " + formatMoney(subtotal) + "\n";

  if (qualifiesForFreeDelivery) {
    message += "DELIVERY: FREE\n";
    message += "FREE DELIVERY OFFER APPLIED.\n\n";
  } else {
    message += "DELIVERY: FEE APPLIES\n";
    message += "Delivery fee to be confirmed.\n\n";
  }

  message += "CUSTOMER DETAILS\n";
  message += "Name: \n";
  message += "Contact number: \n";
  message += "Location: \n";
  message += "Delivery or collection: \n\n";

  message += "Please confirm product availability and payment details.\n\n";
  message += "Complimentary stickers appreciated.\n";
  message += "Thank you — PLATINUMPESOS®.";

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener");
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", checkoutViaWhatsApp);
}
