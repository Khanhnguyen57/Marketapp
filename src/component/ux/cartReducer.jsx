// file: cartReducer.js
const initialState = {
  // Load dữ liệu từ localStorage mỗi khi ứng dụng khởi chạy
  listCart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case 'ADD_CART':
      const existingProductIndex = state.listCart.findIndex(
        (item) => item._id === action.payload._id 
      );

      if (existingProductIndex >= 0) {
        
        updatedCart = [...state.listCart];
        updatedCart[existingProductIndex].quantity += action.payload.quantity;
      } else {
        updatedCart = [...state.listCart, action.payload];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, listCart: updatedCart };

    case 'UPDATE_CART':
      updatedCart = state.listCart.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, listCart: updatedCart };

    case 'DELETE_CART':
      updatedCart = state.listCart.filter(
        (item) => item._id !== action.payload._id
      );
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, listCart: updatedCart };

    default:
      return state;
  }
};

export default cartReducer;