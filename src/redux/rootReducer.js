import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import cartReducer2 from "./cartReducer2";
import cartSimpan from "./cartSimpan";
import lapbulanReducer from "./lapbulanReducer";
import userReducer from "./userReducer";


export default combineReducers({
    cartReducer: cartReducer,
    cartSimpan: cartSimpan,
    userReducer : userReducer,
    lapbulanReducer : lapbulanReducer,
    cartReducer2: cartReducer2
}) 