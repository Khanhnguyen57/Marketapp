import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();
  const [listCart, setListCart] = useState([]);
  
  // Lấy thông tin user hiện tại
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  // Tạo tên key giỏ hàng riêng. Nếu chưa đăng nhập thì để mảng rỗng hoặc đẩy về login
  const cartKey = currentUser ? `cart_${currentUser.email}` : null;

  useEffect(() => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      navigate('/login');
      return;
    }

    // Đọc giỏ hàng CỦA RIÊNG USER NÀY
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setListCart(storedCart);
  }, []); 

  // 👇 THÊM DÒNG NÀY ĐỂ TÍNH TỔNG TIỀN 👇
  const totalAmount = listCart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Hàm hỗ trợ lưu giỏ hàng
  const saveCartToStorage = (newCart) => {
    setListCart(newCart);
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(newCart));
    }
  };

  // Xử lý cập nhật số lượng
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Không cho giảm dưới 1
    
    const updatedCart = listCart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    
    saveCartToStorage(updatedCart);
  };

  // Xử lý xóa sản phẩm
  const removeProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const updatedCart = listCart.filter((item) => item._id !== id);
      saveCartToStorage(updatedCart);
    }
  };

  return (
    <div className="font-sans mb-20">
      {/* BANNER CART */}
      <div className="bg-[#f6f6f6] py-16 mb-12">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl italic text-gray-800">CART</h1>
          <span className="text-gray-500 italic text-sm">CART</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-xl italic text-gray-800 mb-6 uppercase tracking-wider">Shopping Cart</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
          <div className="lg:w-2/3 w-full">
            {listCart.length === 0 ? (
              <p className="italic text-gray-500">Giỏ hàng của bạn đang trống.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead className="bg-[#f6f6f6] text-gray-800 italic uppercase text-sm">
                    <tr>
                      <th className="py-4 font-medium w-24">Image</th>
                      <th className="py-4 font-medium">Product</th>
                      <th className="py-4 font-medium">Price</th>
                      <th className="py-4 font-medium">Quantity</th>
                      <th className="py-4 font-medium">Total</th>
                      <th className="py-4 font-medium">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCart.map((item) => (
                      <tr key={item._id} className="border-b border-gray-200 text-gray-800">
                        <td className="py-4">
                          <img src={item.img} alt={item.name} className="w-16 mx-auto object-cover" />
                        </td>
                        <td className="py-4 italic font-semibold">{item.name}</td>
                        <td className="py-4 italic text-gray-500">
                          {Number(item.price).toLocaleString('vi-VN')} VND
                        </td>
                        <td className="py-4">
                          <div className="flex justify-center items-center space-x-3">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-gray-600 hover:text-black">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
                            </button>
                            <span className="text-gray-800">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-gray-600 hover:text-black">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                            </button>
                          </div>
                        </td>
                        <td className="py-4 italic text-gray-500">
                          {Number(item.price * item.quantity).toLocaleString('vi-VN')} VND
                        </td>
                        <td className="py-4">
                          <button onClick={() => removeProduct(item._id)} className="text-gray-400 hover:text-red-500">
                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-6 flex justify-between bg-[#f6f6f6] p-4 items-center">
              <button 
                onClick={() => navigate('/shop')} 
                className="flex items-center italic text-gray-600 hover:text-black transition-colors"
              >
                <svg className="w-4 h-4 mr-2 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Continue shopping
              </button>
              <button 
                onClick={() => navigate('/checkout')} 
                className="border border-black px-6 py-2 italic flex items-center hover:bg-black hover:text-white transition-colors text-gray-800"
              >
                Proceed to checkout
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: CART TOTAL */}
          <div className="lg:w-1/3 w-full bg-[#f6f6f6] p-8 h-fit">
            <h2 className="text-xl italic text-gray-800 mb-6 uppercase tracking-wider">Cart Total</h2>
            
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4">
              <span className="font-semibold uppercase text-sm text-gray-800">Subtotal</span>
              <span className="text-gray-500 italic text-sm">{totalAmount.toLocaleString('vi-VN')} VND</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold uppercase text-sm text-gray-800">Total</span>
              <span className="text-xl text-gray-800 italic">{totalAmount.toLocaleString('vi-VN')} VND</span>
            </div>
            
            <div className="mt-8">
              <input 
                type="text" 
                placeholder="Enter your coupon" 
                className="w-full border border-gray-300 p-3 italic mb-0 focus:outline-none text-sm text-gray-600"
              />
              <button className="w-full bg-[#333333] text-white py-3 italic flex items-center justify-center space-x-2 hover:bg-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" /><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" /></svg>
                <span>Apply coupon</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartPage;