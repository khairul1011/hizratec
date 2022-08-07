const initialState = {
    
    lapbulan: [],
    namaBulan : '',
    grandtotal:'',
    labahari:'',
    namaHari:'',
    laphari:[]
}

function lapbulanReducer(state = initialState, action) {
    switch (action.type) {
        case "LAP_BULAN":
            return {
                ...state,
                lapbulan: action.lapbulan,
               
            }
            case "LAP_HARI":
                return{
                    ...state,
                    laphari : action.laphari

                }
            case "NAMA_BULAN":
                return{
                    ...state,
                    namaBulan : action.namaBulan

                }
                case "LABA_HARI":
                return{
                    ...state,
                    labahari : action.labahari

                }
                case "NAMA_HARI":
                return{
                    ...state,
                    namaHari : action.namaHari

                }
                case "GRAND_TOTAL":
                return{
                    ...state,
                    grandtotal : action.grandtotal

                }
        default:
            return state
    }
}

export default lapbulanReducer