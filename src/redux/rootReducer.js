import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import cartSimpan from "./cartSimpan";
import userReducer from "./userReducer";


export default combineReducers({
    cartReducer: cartReducer,
    cartSimpan: cartSimpan,
    userReducer : userReducer
}) 