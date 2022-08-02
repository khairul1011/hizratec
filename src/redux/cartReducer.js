const InitialState = {
    addedItems: [],
}

const cartReducer = (state = InitialState.addedItems, action) => {
    //INSIDE HOME COMPONENT
    switch (action.type) {
        case "REMOVE_ALL":
            const hapus = [];
            return hapus;
        case "ADD_TO_CART":
            // console.log('ADD_TO_CART', state)
            let exists = false;
            const newState = state.map(item => {
                if (item.kode_barang === action.item.kode_barang) {
                    exists = true;
                    return {
                        ...item,
                        quantity: action.item.quantity,
                        harga: action.item.harga,
                    }
                } else {
                    return item
                }
            });

            if (exists) {
                return newState;
            } else {
                return [
                    ...state,
                    action.item
                ];
            }
        case "REMOVE_ITEM":
            const remaingList = [
                ...state.filter(i => i.kode_barang !== action.item.kode_barang)
            ]
            return remaingList;
        default:
            return state;
    }

}
export default cartReducer;