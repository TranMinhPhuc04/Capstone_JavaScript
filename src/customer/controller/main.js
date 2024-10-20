import phoneService from "../services/phoneService.js";

const api = new phoneService();
let listPhone = [];
let cart = [];

const getEleId = (id) => document.getElementById(id);

/**
 * Hàm render danh sách điện thoại cho khách hàng
 */
const renderPhoneForCustomer = (phoneList) => {
  let contentHTML = "";
  phoneList.forEach((phone) => {
    contentHTML += `
            <div class="phone-card max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
              <img src="${phone.img}" alt="Phone image" class="w-full h-[400px] object-cover">
              
              <div class="px-6 py-4">
                <h4 class="font-bold text-xl mb-2 text-gray-800">${phone.name}</h4>
                <p class="text-gray-600 text-base mb-4 text-center">Price: <span class="text-red-500 font-bold">$${phone.price}</span></p>
                
                <div class="flex justify-between items-center">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200" onclick="addToCart('${phone.id}', event)">Add to Cart</button>
                  <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">View Details</button>
                </div>
              </div>
            </div>

        `;
  });
  getEleId("phoneListCustomer").innerHTML = contentHTML;
};

/**
 * Lấy danh sách điện thoại từ API và render ra cho khách hàng
 */
const fetchPhoneListForCustomer = () => {
  api
    .getPhones()
    .then((phoneList) => {
      listPhone = phoneList;
      renderPhoneForCustomer(listPhone);
    })
    .catch((err) => console.log("Error fetching phones:", err));
};
fetchPhoneListForCustomer();

/**
 * Xem chi tiết điện thoại
 */
// const viewDetails = (id) => {
//   api
//     .getPhoneById(id)
//     .then((phone) => {
//       let detailsHTML = `
//                 <h4>Details of ${phone.name}</h4>
//                 <img src="${phone.img}" alt="Phone image" style="width:100px;height:auto;">
//                 <p><b>Price:</b> $${phone.price}</p>
//                 <p><b>Screen:</b> ${phone.screen}</p>
//                 <p><b>Back Camera:</b> ${phone.backCam}</p>
//                 <p><b>Front Camera:</b> ${phone.frontCam}</p>
//                 <p><b>Description:</b> ${phone.desc}</p>
//             `;
//       getEleId("phoneDetails").innerHTML = detailsHTML;

//       // Hiển thị modal chi tiết
//       document.getElementById("detailsModal").classList.remove("hidden");
//       document.getElementById("detailsModal").classList.add("flex");
//     })
//     .catch((err) => console.log("Error viewing details:", err));
// };
// window.viewDetails = viewDetails;

/**
 * Thêm sản phẩm vào giỏ hàng
 */
const addToCart = (id, event) => {
  event.preventDefault(); // Ngăn việc chuyển hướng trang

  const phone = listPhone.find((phone) => phone.id === id);
  if (!phone) return;

  const cartItemIndex = cart.findIndex((item) => item.phone.id === id);
  if (cartItemIndex !== -1) {
    cart[cartItemIndex].quantity += 1;
  } else {
    cart.push({ phone, quantity: 1 });
  }

  renderCart(); // Cập nhật giỏ hàng
  localStorage.setItem("cart", JSON.stringify(cart));
};
window.addToCart = addToCart;

/**
 * Render giỏ hàng
 */
const renderCart = () => {
  let cartHTML = "";
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.phone.price * item.quantity;
    cartHTML += `
            <div class="cart-item flex justify-between items-center border-b pb-3 mb-3">
                <div class="flex items-center">
                    <img src="${
                      item.phone.img
                    }" alt="Phone image" style="width:40px;height:auto;" />
                    <div class="ml-4">
                        <p>${item.phone.name}</p>
                        <p>Price: $${item.phone.price}</p>
                        <div class="flex items-center">
                          <button class="bg-gray-300 text-black px-2 rounded" onclick="decreaseQuantity('${
                            item.phone.id
                          }')">-</button>
                          <span class="mx-2">${item.quantity}</span>
                          <button class="bg-gray-300 text-black px-2 rounded" onclick="increaseQuantity('${
                            item.phone.id
                          }')">+</button>
                        </div>
                        <p>Total Price: $${item.phone.price * item.quantity}</p>
                    </div>
                </div>
                <button onclick="removeFromCart('${
                  item.phone.id
                }')" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
  });
  getEleId("cartItems").innerHTML = cartHTML;
  getEleId("totalPrice").innerText = `$${totalPrice}`;
  getEleId("cartCount").innerText = cart.length;
};

/**
 * Tăng số lượng sản phẩm trong giỏ hàng
 */
const increaseQuantity = (id) => {
  const item = cart.find((cartItem) => cartItem.phone.id === id);
  if (item) {
    item.quantity += 1;
    saveCart();
    renderCart();
  }
};
window.increaseQuantity = increaseQuantity;

/**
 * Giảm số lượng sản phẩm trong giỏ hàng
 */
const decreaseQuantity = (id) => {
  const item = cart.find((cartItem) => cartItem.phone.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    saveCart();
    renderCart();
  }
};
window.decreaseQuantity = decreaseQuantity;

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.phone.id !== id);
  renderCart();
  localStorage.setItem("cart", JSON.stringify(cart));
};
window.removeFromCart = removeFromCart;

/**
 * Lưu giỏ hàng vào localStorage
 */
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// *** Nút chức năng ***

/**
 * Xóa toàn bộ giỏ hàng
 */
const clearCart = () => {
  cart = [];
  renderCart();
  localStorage.setItem("cart", JSON.stringify(cart));
};
document.getElementById("clearCart").addEventListener("click", clearCart);

/**
 * Thanh toán
 */
const payNow = () => {
  if (cart.length > 0) {
    alert("Thanh toán thành công!");
    clearCart();
  } else {
    alert("Giỏ hàng trống, không thể thanh toán.");
  }
};
document.getElementById("payNow").addEventListener("click", payNow);

/**
 * Tiếp tục mua sắm
 */
const continueShopping = () => {
  document.getElementById("cartPopup").classList.add("hidden");
};
document
  .getElementById("continueShopping")
  .addEventListener("click", continueShopping);

// Khi tải trang, hiển thị giỏ hàng từ localStorage nếu có
window.onload = () => {
  cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  renderCart();
};

// Select
getEleId("selectType").addEventListener("change", (event) => {
  const selectedType = event.target.value.toLowerCase(); // Lấy giá trị được chọn từ select và chuyển về chữ thường
  filterProductsByType(selectedType); // Gọi hàm lọc sản phẩm
});

/**
 * Lọc sản phẩm theo loại (Samsung, Apple)
 */
const filterProductsByType = (type) => {
  if (type === "all") {
    renderPhoneForCustomer(listPhone); // Hiển thị tất cả sản phẩm
  } else {
    const filteredPhones = listPhone.filter(
      (phone) => phone.type.toLowerCase() === type
    );
    renderPhoneForCustomer(filteredPhones); // Hiển thị sản phẩm đã lọc
  }
};
