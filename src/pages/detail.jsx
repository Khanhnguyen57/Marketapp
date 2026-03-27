import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/layout/navbar';
import Footer from '../component/layout/footer';


function DetailPage() {
    const { id } = useParams(); // Lấy tham số 'id' từ URL
    const navigate = useNavigate()

    
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
  // 1. Lấy thông tin user đang đăng nhập
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        if (!currentUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            // Có thể dùng navigate('/login') để đẩy người dùng ra trang đăng nhập
            return;
        }

        // 2. Tạo khóa riêng cho giỏ hàng của user này (VD: cart_admin@gmail.com)
        const cartKey = `cart_${currentUser.email}`;

        // 3. Lấy giỏ hàng CỦA RIÊNG USER ĐÓ lên
        const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        
        // 4. Logic kiểm tra và thêm sản phẩm như cũ
        const existingProductIndex = existingCart.findIndex(item => item._id === product._id);
        
        if (existingProductIndex >= 0) {
            existingCart[existingProductIndex].quantity += quantity;
        } else {
            existingCart.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            img: product.img1,
            quantity: quantity
            });
        }
        
        // 5. Lưu ngược lại xuống localStorage với cái TÊN RIÊNG đó
        localStorage.setItem(cartKey, JSON.stringify(existingCart));
        alert('Đã thêm vào giỏ hàng!');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
            .then((response) => response.json())
            .then((data) => {
                // 1. Tìm sản phẩm hiện tại dựa vào ID
                const currentProduct = data.find(item => item._id.$oid === id);
                
                if (currentProduct) {
                    setProduct(currentProduct);
                    
                    // 2. Lọc ra các sản phẩm cùng danh mục (loại trừ sản phẩm hiện tại)
                    const related = data.filter(
                        item => item.category === currentProduct.category && item._id.$oid !== id
                    );
                    setRelatedProducts(related);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi fetch data:', error);
                setLoading(false);
            });
    }, [id]); 

    if (isLoading) {
        return <div className="text-center py-20 text-xl min-h-screen">Đang tải thông tin sản phẩm... ⏳</div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-xl min-h-screen">Không tìm thấy sản phẩm này!</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            
            <div className="bg-[#F8F9FA] px-10 py-12 flex justify-between items-center mb-10 mx-4 md:mx-16 mt-4">
                <h1 className="text-3xl italic font-normal uppercase tracking-widest text-gray-800">Detail</h1>
                <span className="text-gray-400 italic uppercase tracking-wider text-sm">Detail</span>
            </div>

            <div className="container mx-auto px-4 md:px-16 mb-16">
                
               
                <div className="flex flex-col md:flex-row gap-8 mb-16">
                   
                    <div className="w-full md:w-1/2 flex gap-4">
                        <div className="flex flex-col gap-2 w-1/5">
                            <img src={product.img1} alt="thumb" className="w-full object-cover cursor-pointer border hover:border-black transition" />
                            <img src={product.img2} alt="thumb" className="w-full object-cover cursor-pointer border hover:border-black transition" />
                            <img src={product.img3} alt="thumb" className="w-full object-cover cursor-pointer border hover:border-black transition" />
                            <img src={product.img4} alt="thumb" className="w-full object-cover cursor-pointer border hover:border-black transition" />
                        </div>
                        {/* Ảnh lớn */}
                        <div className="w-4/5">
                            <img src={product.img1} alt={product.name} className="w-full object-contain" />
                        </div>
                    </div>

                    {/* Cột Chữ (Chi tiết) */}
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                        <h1 className="text-4xl italic font-medium mb-4 text-gray-800">{product.name}</h1>
                        <p className="text-xl text-gray-500 italic mb-4">
                            {Number(product.price).toLocaleString('vi-VN')} VNĐ
                        </p>
                        <p className="text-gray-600 mb-6 italic text-sm leading-relaxed">
                            {product.short_desc}
                        </p>

                        <div className="mb-6 text-sm">
                            <span className="font-semibold uppercase tracking-widest italic mr-2">Category:</span>
                            <span className="text-gray-500 italic">{product.category}</span>
                        </div>

                       
                        <div className="flex items-center border border-gray-300 w-fit">
                            <div className="px-4 py-2 italic text-gray-500 uppercase tracking-widest border-r border-gray-300">Quantity</div>
                            <button 
                                className="px-4 py-2 text-xl hover:bg-gray-100"
                                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                            >
                                <span>&#9664;</span> 
                            </button>
                            <input 
                                type="text" 
                                value={quantity} 
                                readOnly 
                                className="w-12 text-center focus:outline-none"
                            />
                            <button 
                                className="px-4 py-2 text-xl hover:bg-gray-100"
                                onClick={() => setQuantity(prev => prev + 1)}
                            >
                                <span>&#9654;</span> 
                            </button>
                            <button 
                                onClick={handleAddToCart}
                                className="bg-black text-white px-8 py-2 ml-4 italic tracking-widest hover:bg-gray-800 transition">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. MÔ TẢ DÀI CỦA SẢN PHẨM */}
                <div className="mb-16">
                    <button className="bg-black text-white px-6 py-2 uppercase italic tracking-widest mb-4">
                        Description
                    </button>
                    <h2 className="text-xl uppercase italic tracking-widest font-medium mb-4">Product Description</h2>
                    <div className="text-gray-500 italic text-sm leading-loose whitespace-pre-line">
                        {product.long_desc}
                    </div>
                </div>

                {/* 3. SẢN PHẨM LIÊN QUAN (RELATED PRODUCTS) */}
                <div>
                    <h2 className="text-xl uppercase italic tracking-widest font-medium mb-6">Related Products</h2>
                    {relatedProducts.length === 0 ? (
                        <p className="text-gray-500 italic">Không có sản phẩm liên quan nào.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <div 
                                    key={item._id.$oid} 
                                    className="group cursor-pointer flex flex-col items-center text-center animate-fadeIn"
                                    onClick={() => navigate(`/detail/${item._id.$oid}`)}
                                >
                                    <div className="overflow-hidden w-full mb-4">
                                        <img 
                                            src={item.img1} 
                                            alt={item.name} 
                                            className="h-64 w-full object-contain transform group-hover:scale-105 transition duration-500" 
                                        />
                                    </div>
                                    <h3 className="font-medium text-lg italic mb-1 text-gray-800 line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-500 italic text-sm">
                                        {Number(item.price).toLocaleString('vi-VN')} VNĐ
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default DetailPage;