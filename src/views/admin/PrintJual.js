import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

class ComponantPrint extends React.Component {
    render() {

        return (
            <div className="block w-full  overflow-x-auto">
                <div className="rounded-t mt-10   border-blueGray-100 mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    "light"
                                }
                            >
                                UD.AFGAN ROOF
                            </h3>
                        </div>
                    </div>
                </div>
                <table className="items-center w-full  border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                Distributor
                            </th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >Faktur Penjualan</th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th>
                        </tr>
                        <tr>
                            <th
                                className={
                                    "px-6 align-middle border border-solid text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                Alamat : Jl. Harapan Raya Ujung / Jl. Bukit Barisan No.12 A
                            </th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-1 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >No : </th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th>
                        </tr>
                        <tr>
                            <th
                                className={
                                    "px-6 align-middle border border-solid text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                Telepon : 0811 7671 709 / 0853 6387 3636
                            </th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-1 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >Tanggal : </th>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }>

                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-1 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >Pelanggan : </th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th>
                        </tr>
                        <tr>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }>   </th>
                            <th></th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-1 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >Telepon : </th>
                            <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }>  </th>
                        </tr>
                        <tr></tr>
                    </thead>
                </table>
                {/* Projects table */}
                <table className="items-center mt-3 w-full border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                Nama Barang
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                Qty
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                Harga Satuan
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                            >
                                SubTotal
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

                                <span
                                    className={
                                        "ml-3 font-bold " +
                                        +"light"
                                    }
                                >
                                    Argon Design System
                                </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                $2,500 USD
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i className="fas fa-circle text-orange-500 mr-2"></i> pending
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Sub
                            </td>
                            {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">60%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                            <div
                                                style={{ width: "60%" }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </td> */}

                        </tr>
                        {/* end */}


                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

                                <span
                                    className={
                                        "ml-3 font-bold " +
                                        +"light"
                                    }
                                >
                                   Grand Total
                                </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                               
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                $2,500 USD
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }

}

const PrintJual = () => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div
                className={
                    "relative  bg-blueGray-100 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    "light"
                }
            >


                {/* //pribnt */}
                <ComponantPrint ref={componentRef} />
                <button onClick={handlePrint}>print</button>

            </div>

        </>
    )
}

export default PrintJual