import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  
  // State quản lý giỏ hàng và form
  const [listCart, setListCart] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Lấy dữ liệu giỏ hàng từ localStorage khi vào trang
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setListCart(storedCart);
  }, []);

  // Tính tổng tiền
  const totalAmount = listCart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý khi bấm Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate cơ bản
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin thanh toán!");
      return;
    }

    if (listCart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    // Giả lập đặt hàng thành công
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
    
    // Xóa giỏ hàng và chuyển về trang chủ
    localStorage.removeItem("cart");
    setListCart([]);
    navigate("/");
  };

  return (
    <div className="font-sans mb-20">
      {/* BANNER CHECKOUT */}
      <div className="bg-[#f6f6f6] py-16 mb-12">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl italic text-gray-800">CHECKOUT</h1>
          <span className="text-gray-500 italic text-sm font-medium uppercase tracking-wider">
            <span className="text-gray-800 cursor-pointer hover:underline" onClick={() => navigate('/')}>Home</span> / 
            <span className="text-gray-800 cursor-pointer hover:underline ml-1" onClick={() => navigate('/cart')}>Cart</span> / 
            <span className="text-gray-400 ml-1">Checkout</span>
          </span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-xl italic text-gray-800 mb-6 uppercase tracking-wider font-semibold">
          Billing Details
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
          <div className="lg:w-2/3 w-full">
            <form onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="block text-gray-600 uppercase italic text-sm mb-2 font-medium">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Your Full Name Here!"
                  className="w-full border border-gray-300 p-3 text-sm text-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 uppercase italic text-sm mb-2 font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Here!"
                  className="w-full border border-gray-300 p-3 text-sm text-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 uppercase italic text-sm mb-2 font-medium">Phone Number:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Phone Number Here!"
                  className="w-full border border-gray-300 p-3 text-sm text-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 uppercase italic text-sm mb-2 font-medium">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Your Address Here!"
                  className="w-full border border-gray-300 p-3 text-sm text-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>

              <button
                type="submit"
                className="bg-[#333333] text-white px-8 py-2 italic hover:bg-black transition-colors"
              >
                Place order
              </button>
            </form>
          </div>

          {/* CỘT PHẢI: YOUR ORDER */}
          <div className="lg:w-1/3 w-full bg-[#f6f6f6] p-8 h-fit">
            <h2 className="text-xl italic text-gray-800 mb-6 uppercase tracking-wider font-semibold">
              Your Order
            </h2>
            
            <div className="flex flex-col gap-4 mb-4">
              {listCart.length === 0 ? (
                <p className="italic text-gray-500 text-sm">Chưa có sản phẩm nào.</p>
              ) : (
                listCart.map((item) => (
                  <div key={item._id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="italic font-semibold text-gray-800 text-sm w-1/2">
                      {item.name}
                    </span>
                    <span className="italic text-gray-500 text-sm w-1/2 text-right">
                      {Number(item.price).toLocaleString('vi-VN')} VND x {item.quantity}
                    </span>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold uppercase text-sm text-gray-800 italic">Total</span>
              <span className="text-xl text-gray-800 italic">
                {totalAmount.toLocaleString('vi-VN')} VND
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;