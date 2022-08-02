const initialState = {

    simpan: [],
   
}

function cartSimpan(state = initialState, action) {
    switch (action.type) {
        case "SIMPAN":
            return {
                ...state,
                simpan: action.payload,
               
            }
        case "HAPUS":
            return {
                ...state,
                simpan: [],
               
            }
        default:
            return state
    }
}

export default cartSimpan