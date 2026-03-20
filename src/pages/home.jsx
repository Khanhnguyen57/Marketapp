import Navbar from '../component/layout/navbar'
import Footer from '../component/layout/footer'
import BannerImg from '../component/ui/banner.png'
import IPImg from '../component/ui/iphone.png'
import ImacImg from '../component/ui/iMac.png'
import { FaApple } from 'react-icons/fa';
import Ipad from '../component/ui/iPad.png'
import Watch from '../component/ui/watch.png'
import Airpods from '../component/ui/airpods.png'
import { useNavigate } from 'react-router-dom';
import {useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';


function Banner() {
    const navigate = useNavigate();
    return (
        <div className="bg-[#F4F6F9] px-8 py-16 md:py-24 md:px-16 flex flex-col md:flex-row items-center justify-between ">
            <div className="flex flex-col items-start gap-4 max-w-md">
                <span className="text-gray-400 text-sm italic tracking-widest uppercase">
                    New Inspiration 2020
                </span>
                <h2 className="text-4xl md:text-5xl text-gray-900 italic tracking-wide uppercase leading-tight">
                    20% OFF ON NEW <br /> SEASON
                </h2>
                <button className="mt-2 bg-[#3A3A3A] text-gray-100 font-light italic px-8 py-3 hover:bg-black transition-colors"
                        onClick={() => navigate('/shop')}
                >Browse collections
                </button>
            </div>

            <div className="mt-12 md:mt-0 w-full md:w-1/2 flex justify-center md:justify-end">
                <img 
                    src={BannerImg}
                    alt="Minimalist Desk Clock" 
                    className="w-64 md:w-80 object-contain drop-shadow-2xl" 
                />
            </div>
        </div>
    );
}

function Categories() {
    const navigate = useNavigate();
    return(
        <div className='py-2 flex flex-col gap-4'>
            <div className='flex flex-col items-center justify-center'>
                <div className="text-gray-400 text-sm italic tracking-widest uppercase">CAREFULLY CREATED COLLECTIONS</div>
                <div className='text-black-800 font-semibold text-xl italic tracking-widest uppercase'>BROWSE OUR CATEGORIES</div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                
                {/* Khối iPhone */}
                <div className="w-full md:w-1/2 bg-[#F5F5F5] p-8 flex flex-col items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate('/shop')}
                >
                    <img src={IPImg} alt="iPhone" className="h-48 object-contain mb-4" />
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <FaApple /> iPhone
                    </h3>
                </div>

                {/* Khối Mac */}
                <div className="w-full md:w-1/2 bg-[#F5F5F5] p-8 flex flex-col items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate('/shop')}
                >
                    <img src={ImacImg} alt="Mac" className="h-48 object-contain mb-4" />
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <FaApple /> Mac
                    </h3>
                </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4">
                
                {/* Khối iPad */}
                <div className="w-full md:w-1/3 bg-[#F5F5F5] p-8 flex flex-col items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate('/shop')}
                >
                    <img src={Ipad} alt="iPad" className="h-32 object-contain mb-4" />
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <FaApple /> iPad
                    </h3>
                </div>

                {/* Khối Watch */}
                <div className="w-full md:w-1/3 bg-[#F5F5F5] p-8 flex flex-col items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate('/shop')}
                >
                    <img src={Watch} alt="Watch" className="h-32 object-contain mb-4" />
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <FaApple /> WATCH
                    </h3>
                </div>

                {/* Khối AirPods */}
                <div className="w-full md:w-1/3 bg-[#F5F5F5] p-8 flex flex-col items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate('/shop')}
                >
                    <img src={Airpods} alt="AirPods" className="h-32 object-contain mb-4" />
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <FaApple /> AirPods
                    </h3>
                </div>

            </div>
        </div>
    )
}

function ProductList() {
    const [products , setProducts] = useState([])

    const [isLoading , setLoading] = useState(true)

    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data); // cập nhật dữ liệu
                setLoading(false) // Tắt trạng thái Loading
            })
            .catch((error) => {
                console.error('Lỗi')
                setLoading(false)
            })
    },[])

    if (isLoading) {
        return <div className="text-center py-10 text-xl">Đang tải dữ liệu... ⏳</div>;
    }
    return(
        <div className='py-12'>
            
            <div className='flex flex-col items-start justify-center mb-10'>
                <div className="text-gray-400 text-sm italic tracking-widest uppercase mb-2">
                    MADE THE HARD WAY
                </div>
                <div className='text-gray-800 font-semibold text-2xl md:text-3xl italic tracking-widest uppercase'>
                    TOP TRENDING PRODUCTS
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div key={item._id.$oid} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center hover:scale-110">
                        
                        <img 
                            src={item.img1} 
                            alt={item.name} 
                            className="h-48 w-full object-contain mb-4" 
                            onClick={() => dispatch({type: 'SHOW' , payload: item})}
                        />
                        
                        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                            {item.name}
                        </h3>
            
                        <p className="text-gray-600 font-normal italic">
                            {Number(item.price).toLocaleString('vi-VN')} VNĐ
                        </p>

                    </div>
                ))}
            </div>

        </div>
    )
}

function OtherInformation (){
    return(
        <div>
            <div className='flex flex-grid  justify-between mb-10 bg-[#F4F6F9] px-20 py-20'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='italic uppercase tracking-widest text-gray-800 font-medium text-lg mb-1'>FREE SHIPPING</div>
                    <div className='italic text-gray-400 text-sm'>Free shipping worldwide</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='italic uppercase tracking-widest text-gray-800 font-medium text-lg mb-1'>24 X 7 SERVICE</div>
                    <div className='italic text-gray-400 text-sm'>Free shipping worldwide</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='italic uppercase tracking-widest text-gray-800 font-medium text-lg mb-1'>FESTIVAL OFFER</div>
                    <div className='italic text-gray-400 text-sm'>Free shipping worldwide</div>
                </div>
            </div>

            <div className="py-16">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-medium uppercase italic tracking-widest text-gray-800 mb-2">
                            Let's be friends!
                        </h2>
                        <p className="text-gray-400 italic text-sm">
                            Nisi nisi tempor consequat laboris nisi.
                        </p>
                    </div>
                    <div className="flex w-full md:w-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="border border-gray-300 px-4 py-3 w-full md:w-96 text-sm text-gray-600 focus:outline-none focus:border-gray-500 transition"
                        />
                        <button className="bg-[#333333] text-white px-6 py-3 text-sm hover:bg-black transition whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

function Popup() {
    const dispatch = useDispatch();
    // Lấy state từ Redux store (giả sử bạn đặt tên reducer là 'popup')
    const { isOpen, productData } = useSelector((state) => state.popup);

    // Nếu không mở, không render gì cả
    if (!isOpen || !productData) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
            onClick={() => dispatch({ type: 'HIDE' })}
        >
            {/* Nội dung Popup */}
            <div 
                className="bg-white p-8 rounded-lg shadow-2xl relative max-w-2xl w-full flex flex-col md:flex-row gap-6 items-center"
                onClick={(e) => e.stopPropagation()} // Chặn click xuyên qua nền
            >
                <button 
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                    onClick={() => dispatch({ type: 'HIDE' })}
                >
                    &times;
                </button>

                <img 
                    src={productData.img1} 
                    alt={productData.name} 
                    className="h-64 object-contain"
                />

                <div className="flex flex-col items-start text-left">
                    <h2 className="text-2xl font-medium italic mb-2">{productData.name}</h2>
                    <p className="text-xl text-gray-600 mb-4">
                        {Number(productData.price).toLocaleString('vi-VN')} VNĐ
                    </p>
                    <p className="text-gray-500 text-sm italic">
                        {productData.short_desc || "Thông tin sản phẩm đang được cập nhật..."}
                    </p>
                </div>
            </div>
        </div>
    );
}


function HomePage () {
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar/>

                <Banner/>
                <Categories/>
                <ProductList/>
                <OtherInformation/>

                <Popup/>

            <Footer/>
        </div>
    )
}

export default HomePage;