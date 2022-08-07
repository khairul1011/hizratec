import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';



const PrintJual = () => {
    const lap = useSelector(state => state.lapbulanReducer)
    const user = useSelector(state => state.userReducer.user)
    console.log('lap', lap)

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function currencyFormat(num) {
        return 'Rp ' + parseFloat(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    return (
        <>
            <div
                className={
                    "relative  bg-blueGray-100 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    "light"
                }
            >

                <div className="w-full lg:w-6/12 px-4">
                    <button onClick={handlePrint} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6  rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Print

                    </button>

                </div>

                {/* //pribnt */}
                {/* <ComponantPrint ref={componentRef} /> */}
                <div ref={componentRef} className="block w-full  overflow-x-auto">
                    <div className="rounded-t mt-10   border-blueGray-100 mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className={
                                        "font-semibold text-lg " +
                                        "light"
                                    }
                                >
                                    {user[0]?.username == 'admin1' && 'UD.AFGANROOF 1'}
                                    {user[0]?.username == 'admin2' && 'UD.AFGANROOF 2'}
                                    {user[0]?.username == 'owner' && 'UD.AFGANROOF'}

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
                                ></th>
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
                                ></th>
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
                                ></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Bulan : {lap.namaBulan}</th>
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
                                ></th>
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
                                ></th>
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
                                    No Faktur
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                        "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                    }
                                >
                                    Nama Pelanggan
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                        "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                    }
                                >
                                    Tanggal
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
                                    Status
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                        "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                    }
                                >
                                    Admin
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                        "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                    }
                                >
                                    Total Bayar
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {lap.lapbulan?.map((item, i) => (


                                <tr key={i}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">



                                        {item.no_faktur}

                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.nama}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.tanggal}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.jumlah}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.status}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.admin}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.total}
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
                            ))}
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
                                        {/* Grand Total */}
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <table className="items-center mt-3 w-full border-collapse">
                        <tfoot>
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

                                    <span
                                        className={
                                            "ml-3 font-bold " +
                                            +"light"
                                        }
                                    >
                                        Grand Total  :
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                </td>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {currencyFormat(lap?.grandtotal)}
                                </th>
                            </tr>
                        </tfoot>

                    </table>

                </div>
                {/* <button onClick={handlePrint}>print</button> */}

            </div>

        </>
    )
}

export default PrintJual