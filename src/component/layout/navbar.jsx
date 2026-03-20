import { useNavigate } from "react-router-dom";

function AppNavbar() {
  // Khởi tạo hook useNavigate
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-4 md:px-12">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">

        {/* Cụm bên trái: Home & Shop */}
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

        {/* Cụm giữa: Logo BOUTIQUE (Bấm vào logo cũng về trang chủ cho chuẩn UX) */}
        <div className="w-1/3 text-center">
          <span 
            onClick={() => navigate('/')} 
            className="text-3xl font-serif italic tracking-widest text-gray-800 cursor-pointer"
          >
            BOUTIQUE
          </span>
        </div>

        {/* Cụm bên phải: Cart & Login */}
        <div className="flex items-center justify-end space-x-6 w-1/3 text-gray-800 italic">
          
          {/* Nút Cart */}
          <span 
            onClick={() => navigate('/cart')} 
            className="flex items-center space-x-1 hover:text-yellow-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Cart</span>
          </span>

          {/* Nút Login */}
          <span 
            onClick={() => navigate('/login')} 
            className="flex items-center space-x-1 hover:text-yellow-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Login</span>
          </span>

        </div>

      </div>
    </nav>
  );
}

export default AppNavbar;