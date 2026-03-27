import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Kiểm tra localStorage khi component được mount (tải lại trang)
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Xóa data
    setCurrentUser(null); // Reset state
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-4 md:px-12">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        
        {/* Cột trái: Menu */}
        <div className="flex items-center space-x-6 w-1/3">
          <span 
            onClick={() => navigate('/')} 
            className="text-yellow-600 italic font-medium cursor-pointer"
          >
            Home
          </span>
          <span 
            onClick={() => navigate('/shop')} 
            className="text-gray-800 italic hover:text-yellow-600 transition-colors cursor-pointer"
          >
            Shop
          </span>
        </div>

        {/* Cột giữa: Logo */}
        <div className="w-1/3 text-center">
          <span 
            onClick={() => navigate('/')} 
            className="text-3xl font-serif italic tracking-widest text-gray-800 cursor-pointer"
          >
            BOUTIQUE
          </span>
        </div>

        {/* Cột phải: Cart & User/Login */}
        <div className="flex items-center justify-end space-x-6 w-1/3 text-gray-800 italic">
          
          <span 
            onClick={() => navigate('/cart')} 
            className="flex items-center space-x-1 hover:text-yellow-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Cart</span>
          </span>

          {/* Kiểm tra trạng thái đăng nhập để hiển thị tương ứng */}
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 cursor-pointer hover:text-yellow-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {/* Hiển thị tên (nếu có) hoặc email */}
                <span className="not-italic font-medium">{currentUser.name || currentUser.email}</span>
              </span>
              
              <span 
                onClick={handleLogout} 
                className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer text-sm"
              >
                (Logout)
              </span>
            </div>
          ) : (
            <span 
              onClick={() => navigate('/login')} 
              className="flex items-center space-x-1 hover:text-yellow-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Login</span>
            </span>
          )}

        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;