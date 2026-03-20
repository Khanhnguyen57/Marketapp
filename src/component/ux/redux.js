// File: redux/popupReducer.js
const initialState = {
    isOpen: false,
    productData: null,
};

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW':
            return {
                ...state,
                isOpen: true,
                productData: action.payload
            };
        case 'HIDE':
            return {
                ...state,
                isOpen: false,
                productData: null
            };
        default:
            return state;
    }
};

export default popupReducer;