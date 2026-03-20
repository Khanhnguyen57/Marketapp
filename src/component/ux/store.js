import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './redux'; 
const store = configureStore({
    reducer: {
        // Khai báo reducer ở đây. Tên 'popup' này chính là tên bạn dùng trong useSelector((state) => state.popup)
        popup: popupReducer, 
    },
});

export default store;