import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios'
import PaginationComponent from "components/Pagination";
import Api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router";
// components

export default function LaporanBulan() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [barang, setBarang] = React.useState([]);
  const user = useSelector(state => state.userReducer.user)
  const [totalItems, setTotalItems] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [loading, setLoading] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [laba, setLaba] = useState(0)

  const [kode_barang, setKode_barang] = React.useState('')
  const [nama_barang, setNama_barang] = React.useState('')
  const [jenis, setJenis] = React.useState('')
  const [merek, setMerek] = React.useState('')
  const [kategori, setKategori] = React.useState('Baja Ringan')
  const [unit, setUnit] = React.useState('Lembar')
  const [harga, setHarga] = React.useState('')
  const [stok, setStok] = React.useState('')
  const [bulantanggal, setBulantanggal] = React.useState([])
  const [bulan, setBulan] = React.useState('')

  const [tukar, setTukar] = useState('simpan')

  React.useEffect(() => {
    // getDataBarang()
    getBulantanggal()
  }, [])

  const getDataBarang = () => {
    let totals = 0;
    let banyak = 0;
    const options = {
      method: 'GET',
      url: Api.url,
      params: { a: 'lap_jual_bulan', admin: user[0]?.username, bln: bulan }
    };


    axios.request(options).then(function (response) {
      console.log(response.data);
      setBarang(response.data.data)
      dispatch({
        type: "LAP_BULAN",
        lapbulan: response.data.data
      })
      response.data.data.forEach(element => {
        banyak = banyak + parseInt(element.total);
      });
      // getDataPelanggan()
      // getDataTransaksi()
      setLaba(banyak)
      dispatch({
        type: "GRAND_TOTAL",
        grandtotal: banyak
      })
      console.log('laba', banyak);
      // console.log('laba', banyak);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const getBulantanggal = () => {
    const options = {
      method: 'GET',
      url: Api.url,
      params: { a: 'bulantanggal' }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setBulantanggal(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });


  }

  const onBulan = (e) => {

    setBulan(e)

    setCurrentPage(1)
    dispatch({
      type: "NAMA_BULAN",
      namaBulan: e
    })
    console.log('commentsData',commentsData)
  }

  const commentsData = useMemo(() => {
    // console.log(search)
    let computedComments = barang;

    if (bulan) {
      computedComments = computedComments.filter(
        comment =>
          comment.bulan?.toLowerCase().includes(bulan?.toLowerCase())

      );
    }

    // if (search) {
    //   computedComments = computedComments.filter(
    //     comment =>
    //       comment.kode_barang.toLowerCase().includes(search.toLowerCase())

    //   );
    // }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) =>
          reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize
    );
  }, [barang, currentPage, bulan, sorting]);





  function currencyFormat(num) {
    return 'Rp ' + parseFloat(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const onData = (item) => {
    // setTukar('edit')
    setKode_barang(item.kode_barang)
    setNama_barang(item.nama_barang)
    setKategori(item.kategori)
    setUnit(item.unit)
    setMerek(item.merek)
    setJenis(item.jenis)
    setHarga(item.harga)
    setStok(item.stok)
    console.log(item)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Laporan Harian</h6>


          </div>

        </div> */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Input Data Barang
            </h6>  */}
            {/* <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kode Barang
                  </label>
                  <input
                    value={kode_barang}
                    onChange={(e) => { setKode_barang(e.target.value); console.log(kode_barang) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Barang
                  </label>
                  <input
                    value={nama_barang}
                    onChange={(e) => { setNama_barang(e.target.value); console.log(nama_barang) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Jenis
                  </label>
                  <input
                    value={jenis}
                    onChange={(e) => { setJenis(e.target.value); console.log(jenis) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Merek
                  </label>
                  <input
                    value={merek}
                    onChange={(e) => { setMerek(e.target.value); console.log(merek) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kategori
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => { setKategori(e.target.value); console.log(kategori) }}
                    className="selectpicker1">
                    <option valu="Baja Ringan">Baja Ringan</option>
                    <option valu="Rangka">Rangka</option>
                    <option valu="Plafon PVC">Plafon PVC</option>
                    <option valu="List">List</option>
                    <option valu="Accesoris">Accesoris</option>
                    <option valu="Plafon">Plafon</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => { setUnit(e.target.value); console.log(unit) }}
                    className="selectpicker2">
                    <option valeu="Lembar">Lembar</option>
                    <option valeu="Batang">Batang</option>
                    <option valeu="M2">M2</option>
                    <option valeu="Kotak">Kotak</option>
                    <option valeu="Buah">Buah</option>
                    <option valeu="Unit">Unit</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Harga
                  </label>
                  <input
                    value={harga}
                    onChange={(e) => { setHarga(e.target.value); console.log(harga) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Jumlah
                  </label>
                  <input
                    value={stok}
                    onChange={(e) => { setStok(e.target.value); console.log(stok) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                {tukar === 'simpan' ?
                  <button onClick={() => postBarang()}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Simpan
                  </button>
                  :
                  <button onClick={() => editbarang()}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Edit
                  </button>
                }
              </div>
            </div> */}

            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="flex flex-wrap justify-left text-center ">
                <h6 className="text-blueGray-700 text-xl font-bold">Laporan Penjualan Bulanan</h6>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="text-center flex justify-around">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">

                        <select
                          value={bulan}
                          onChange={(e) => { onBulan(e.target.value); console.log(bulan) }}
                          className="selectpicker2">

                          {bulantanggal?.map((item, i) => (
                            <option key={i} value={item.tanggal}>{item.tanggal}</option>
                          ))}


                        </select>
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <button onClick={getDataBarang} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Cari
                      </button>

                    </div>
                    <div className="w-full lg:w-12/12 px-4">

                      <button onClick={() => history.push('/admin/laporanbulanan/print-faktur')}
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Cetak
                      </button>

                    </div>
                    {/* <div className="w-full lg:w-12/12 flex px-4"><div className="relative w-full mb-3">{currencyFormat(laba) }</div></div> */}

                  </div>
                  <h6 className="text-blueGray-700 text-xl font-bold">Grand TOTAL  : {currencyFormat(laba)}</h6>
                </div>
              </div>


            </div>


            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No Faktur
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nama Pelanggan
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Tanggal
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Qty
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Admin
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Total Bayar
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {commentsData?.map((item, i) => (
                    <tr key={i} onClick={() => onData(item)}  >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left" >
                        {item.no_faktur}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.nama}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {moment(item.tanggal).format('DD MM YYYY')}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {item.jumlah}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {item.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {item.admin}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {currencyFormat(item.total)}
                      </td>
                    </tr>
                  ))}

                  {/* <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      /argon/index.html
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      3,985
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      319
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      /argon/charts.html
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      3,513
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      294
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      /argon/tables.html
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      2,050
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      147
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                      50,87%
                    </td>
                  </tr>
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      /argon/profile.html
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      1,795
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      190
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-arrow-down text-red-500 mr-4"></i>
                      46,53%
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>

          </form>
          <PaginationComponent
            total={totalItems}
            itemsPerPage={pageSize}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
