import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import session from 'redux-persist/lib/storage/session';
import thunk from "redux-thunk";
import rootReducer from './rootReducer';


const persistConfig = {
    key: 'root',
    storage: session,
    // whitelist: []
}

const persistedReducer = persistReducer(persistConfig,rootReducer );

export default () => {
    let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
    let persistor = persistStore(store)
    return { store, persistor }
}