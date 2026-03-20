import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/layout/navbar'; // Điều chỉnh lại đường dẫn nếu cần
import Footer from '../component/layout/footer';

function ShopPage() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Fetch dữ liệu
    useEffect(() => {
        fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi fetch data:', error);
                setLoading(false);
            });
    }, []);

    // 2. Lọc sản phẩm
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(item => item.category === category);

    // 3. Cấu trúc Sidebar Menu giống hệt bản mẫu
    const sidebarMenu = [
        { type: 'header-dark', label: 'APPLE' },
        { type: 'item', id: 'all', label: 'All' },
        { type: 'header-light', label: 'IPHONE & MAC' },
        { type: 'item', id: 'iphone', label: 'iPhone' },
        { type: 'item', id: 'ipad', label: 'iPad' },
        { type: 'item', id: 'macbook', label: 'Macbook' },
        { type: 'header-light', label: 'WIRELESS' },
        { type: 'item', id: 'airpod', label: 'Airpod' },
        { type: 'item', id: 'watch', label: 'Watch' },
        { type: 'header-light', label: 'OTHER' },
        { type: 'item', id: 'mouse', label: 'Mouse' },
        { type: 'item', id: 'keyboard', label: 'Keyboard' },
        { type: 'item', id: 'other', label: 'Other' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Banner Header */}
            <div className="bg-[#F8F9FA] px-10 py-12 flex justify-between items-center mb-10 mx-4 md:mx-16 mt-4">
                <h1 className="text-3xl italic font-normal uppercase tracking-widest text-gray-800">Shop</h1>
                <span className="text-gray-400 italic uppercase tracking-wider text-sm">Shop</span>
            </div>

            <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row gap-8 mb-16">
                
                {/* CỘT TRÁI: SIDEBAR DANH MỤC */}
                <div className="w-full md:w-1/4">
                    <h2 className="text-xl font-semibold uppercase mb-6 italic tracking-widest">Categories</h2>
                    
                    <div className="flex flex-col">
                        {sidebarMenu.map((menuItem, index) => {
                            // Render Header Đen (APPLE)
                            if (menuItem.type === 'header-dark') {
                                return (
                                    <div key={index} className="bg-black text-white px-4 py-2 font-medium uppercase tracking-widest mb-2 italic">
                                        {menuItem.label}
                                    </div>
                                );
                            }
                            // Render Header Xám (IPHONE & MAC, WIRELESS, OTHER)
                            if (menuItem.type === 'header-light') {
                                return (
                                    <div key={index} className="bg-[#F8F9FA] text-black px-4 py-2 font-medium uppercase tracking-widest mt-4 mb-2 italic">
                                        {menuItem.label}
                                    </div>
                                );
                            }
                            // Render Các mục click được (All, iPhone, iPad...)
                            return (
                                <div 
                                    key={index}
                                    className={`px-4 py-1.5 cursor-pointer italic transition-colors ${
                                        category === menuItem.id 
                                            ? 'text-[#d6a848] font-medium' // Màu vàng/cam cho mục đang chọn (giống hiệu ứng hover trong mẫu)
                                            : 'text-gray-500 hover:text-[#d6a848]'
                                    }`}
                                    onClick={() => setCategory(menuItem.id)}
                                >
                                    {menuItem.label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CỘT PHẢI: TÌM KIẾM, SẮP XẾP & DANH SÁCH */}
                <div className="w-full md:w-3/4">
                    {/* Header Cột Phải */}
                    <div className="flex justify-between items-center mb-8">
                        <input 
                            type="text" 
                            placeholder="Enter Search Here!" 
                            className="border border-gray-300 px-4 py-2 w-64 focus:outline-none focus:border-black italic text-sm"
                        />
                        <select className="border border-gray-300 px-4 py-2 focus:outline-none text-sm text-gray-600">
                            <option>Default sorting</option>
                        </select>
                    </div>

                    {/* Lưới Sản Phẩm */}
                    {isLoading ? (
                        <div className="text-center py-10 text-xl">Đang tải sản phẩm... ⏳</div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {filteredProducts.map((item) => (
                                    <div 
                                        key={item._id.$oid} 
                                        className="group cursor-pointer flex flex-col items-center text-center animate-fadeIn"
                                        onClick={() => navigate(`/detail/${item._id.$oid}`)}
                                    >
                                        <div className="overflow-hidden w-full mb-4">
                                            <img 
                                                src={item.img1} 
                                                alt={item.name} 
                                                className="h-56 w-full object-contain transform group-hover:scale-105 transition duration-500" 
                                            />
                                        </div>
                                        <h3 className="font-medium text-lg italic mb-1 text-gray-800">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500 italic text-sm">
                                            {Number(item.price).toLocaleString('vi-VN')} VNĐ
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Phân Trang (Visual Layout theo ảnh) */}
                            <div className="flex justify-end mt-12 items-center">
                                <div className="flex border border-gray-200">
                                    <button className="px-4 py-2 text-gray-400 hover:text-black hover:bg-gray-100 transition">&laquo;</button>
                                    <button className="px-4 py-2 bg-black text-white">1</button>
                                    <button className="px-4 py-2 text-gray-400 hover:text-black hover:bg-gray-100 transition">&raquo;</button>
                                </div>
                            </div>
                            <div className="text-right text-gray-400 italic text-sm mt-2">
                                Showing 1-9 of {filteredProducts.length} results
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ShopPage;