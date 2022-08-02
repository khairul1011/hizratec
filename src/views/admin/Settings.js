import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import PaginationComponent from "components/Pagination";
import moment from "moment";

export default function Settings() {
  const cartitem = useSelector(state => state.cartReducer);
  const user = useSelector(state => state.userReducer.user);
  const ccc = useSelector(state => state.cartSimpan);
  const [barang, setBarang] = React.useState([]);
  const dispatch = useDispatch();

  const [totalItems, setTotalItems] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(0)
  const [harga, setHarga] = useState(0)
  const [qty, setQty] = useState('')
  const [first, setfirst] = useState('')

  const [pageSize, setPageSize] = useState(8);

  const [no_faktur, setNo_faktur] = React.useState('')
  const [kode_pelanggan, setKode_pelanggan] = React.useState('')
  const [tanggal, setTanggal] = React.useState('')
  const [status, setStatus] = React.useState('Cash')
  const [lama, setLama] = React.useState('-')
  const [ongkir, setOngkir] = React.useState(0)
  const [admin, setAdmin] = React.useState(user[0]?.username)
  const [total, setTotal] = React.useState('')
  const [jumlah, setJumlah] = React.useState('')
  const [pelanggan, setPelanggan] = React.useState([]);
  const [s_Pelanggan, setS_Pelanggan] = React.useState('');

  const [nofak, setNofak] = useState([])

  console.log(cartitem)

  React.useEffect(() => {
    getDataBarang()
    getpelanggan()
    getNofak()
  }, [])

  const getNofak = () => {
    const options = {
      method: 'GET',
      url: 'https://afgan.hizraniaga.com/m_api.php',
      params: { a: 'getFaktur' }
    };

    axios.request(options).then(function (response) {
      console.log(response.data.data);
      setNofak(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const getpelanggan = () => {
    const options = { method: 'GET', url: 'https://afgan.hizraniaga.com/m_api.php', params: { a: 'pelanggan' } };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setPelanggan(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    let totals = 0;
    let banyak = 0;
    let faktur = 'NF220722216';

    cartitem.forEach(element => {
      totals += element.harga * element.quantity;
      banyak = banyak + parseInt(element.quantity);


    });
    setTotal(totals);
    setJumlah(banyak)
    const diskon = parseInt(totals) * (10 / 100);

    console.log(diskon + parseInt(totals));

    // dispatch({
    //     type: "TOTAL",
    //     payload: jumlah
    // });
  });


  const getDataBarang = () => {
    const options = { method: 'GET', url: 'https://afgan.hizraniaga.com/m_api.php', params: { a: 'barang' } };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setBarang(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const commentsData = useMemo(() => {
    // console.log(search)
    let computedComments = barang;

    // if (searchQuery) {
    //   computedComments = computedComments.filter(
    //     comment =>
    //       comment.barang_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       comment.barang_id.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    if (search) {
      computedComments = computedComments.filter(
        comment =>
          comment.kode_barang.toLowerCase().includes(search.toLowerCase()) ||
          comment.nama_barang.toLowerCase().includes(search.toLowerCase())

      );
    }

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
  }, [barang, currentPage, search, sorting]);

  const onTukar = (e) => {
    setQuantity(Number(e))
    console.log(cartitem)
    // const cartItem = {
    //   "kode_barang": item.kode_barang,
    //   "nama_barang": item.nama_barang,
    //   "quantity": e,
    //   "merek": item.merek,
    // };
    // dispatch({
    //   type: "ADD_TO_CART",
    //   item: cartItem
    // });
    // setfirst(true)
    // tambahKeranjang()
    // setQty(item.kode_barang)
    // setQuantity(0)
    console.log(e)
  }

  const getQty = (e) => {
    setHarga(Number(e))
    console.log(cartitem)
    // dispatch({
    //   type: "SIMPAN",
    //   payload: cartitem
    // })
    // if (item.kode_barang === qty) {
    //   const cartItem = {
    //     "kode_barang": item.kode_barang,
    //     "nama_barang": item.nama_barang,
    //     "quantity": quantity,
    //     "merek": item.merek,
    //   };
    //   dispatch({
    //     type: "ADD_TO_CART",
    //     item: cartItem
    //   });

    // } else {
    //   return
    // }

  }

  const plusQty = (item) => {

    const cartItem = {
      "kode_barang": item.kode_barang,
      "nama_barang": item.nama_barang,
      "quantity": quantity,
      "merek": item.merek,
      "harga": harga,
    };
    dispatch({
      type: "ADD_TO_CART",
      item: cartItem
    });


    setHarga(0)
    setQuantity(0)
    // dispatchx(Actions.addToCart(item, quantity));

    console.log('cart +', item);
  }

  const plusQtyx = (item) => {

    const cartItem = {
      "kode_barang": item.kode_barang,
      "nama_barang": item.nama_barang,
      "quantity": quantity,
      "merek": item.merek,
      "harga": harga,
    };
    dispatch({
      type: "ADD_TO_CART",
      item: cartItem
    });



    // dispatchx(Actions.addToCart(item, quantity));

    console.log('cart +', item);
  }

  const renderItem = () => {
    let items = [];
    cartitem.map((item, i) => {
      // const newTotal = item.quantity * item.harga;
      items.push(
        <ul key={i} className="md:flex-col md:min-w-full flex flex-col list-none" onClick={() => setfirst(item.kode_barang)} >
          {/* <button onClick={() => console.log(items)} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            Simpan
          </button> */}
          <li className="items-center mt-1">


            <i
              className={
                "fas fa-tv mr-2 text-sm opacity-75 "
              }
            ></i>{" "}
            {item.nama_barang}

          </li>
          <li className="items-center">

            <div className="flex justify-start ">
              <div className="mr-3 p-1 text-left ">
                <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                  Harga
                </span>

              </div>
              <div className="mr-1 p-1 text-left">
                <span className="text-sm font-bold block uppercase tracking-wide text-blueGray-600">
                  <input
                    // value={harga}
                    onChange={(e) => { setHarga(e.target.value); console.log('harga', harga); }}
                    type="text"
                    placeholder={item.harga}
                    // onKeyUpCapture={() => plusQty(item)}
                    className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                  // defaultValue={item.harga}
                  />
                </span>

              </div>

            </div>

          </li>
          <li className="items-center">
            {/* {item.kode_barang == qty ?
              <div className="flex justify-start ">
                <div className="mr-3 p-1 text-left ">
                  <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                    Qty
                  </span>

                </div>
                <div className="mr-3 p-1 text-left ">
                  <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">

                    <input
                      // value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="text"
                      className="border-0 w-12 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                    // defaultValue=""
                    />



                  </span>
                </div>
                <div className="mr-3 p-1 text-left ">
                  <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                    <i className="fab fa-facebook-f"></i>
                  </span>

                </div>
              </div>


              : */}
            <div className="flex justify-start mt-1 ">
              <div className="mr-4 p-1 text-left ">
                <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                  Qty
                </span>

              </div>
              <div className="mr-3 p-1 text-left ">
                {/* <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                  -
                </span> */}

              </div>
              <div className="mr-3 p-1 text-left ">



                <span className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">



                  <input
                    // value={item.quantity}
                    placeholder={item.quantity}
                    onChange={(e) => { setQuantity(e.target.value); console.log('quantyty', quantity); }}
                    type="text"
                    className="border-0 w-12 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                  // defaultValue={item.quantity}
                  // onKeyUpCapture={() => plusQtyx(item)}

                  />


                </span>

              </div>
              {first === item.kode_barang ?
                <div className="mr-3 p-1 text-left ">

                  <span onClick={() => plusQty(item)} className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                    <i className="fas fa-check-square text-lg p-3 text-center inline-flex items-center justify-center w-12 h-12 "></i>
                  </span>

                </div>
                :
                <></>
              }
              <div className="mr-3 p-1 text-left ">
                <span onClick={() => HapusItem(item)} className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm  focus:outline-none focus:ring ease-linear transition-all">
                  <i className="fas fa-trash-alt text-lg p-3 text-center inline-flex items-center justify-center w-12 h-12 "></i>
                </span>

              </div>
            </div>
          </li>
          {/* {newTotal} */}
          {/* <li onClick={() => HapusItem(item)}><i className="fab fa-facebook-f"></i></li> */}
          <hr className="my-4 md:min-w-full bg-lightBlue-600" />
        </ul>

      );

    });

    return items;
  }

  const tambahKeranjang = (item) => {

    // setQty(item.quantity)
    const cartItem = {
      kode_barang: item.kode_barang,
      nama_barang: item.nama_barang,
      quantity: quantity,
      merek: item.merek,
      harga: harga,
      // barang_harjul: item.barang_harjul,
      // barang_harpok: item.barang_harpok,
      // barang_harjul_grosir: item.barang_harjul_grosir,
      // barang_stok: item.barang_stok,
      // barang_min_stok: item.barang_min_stok,
      // barang_kategori_id: item.barang_kategori_id,
      // kategori_nama: item.kategori_nama,
      // gbr: item.gbr,

    };
    dispatch({
      type: 'ADD_TO_CART',
      item: cartItem,
    });
    console.log('id', item.kode_barang)
  }

  const HapusItem = (item) => {
    if (cartitem.length <= 1) {

      dispatch({
        type: "REMOVE_ALL",
      })
    } else {
      dispatch({
        type: 'REMOVE_ITEM',
        item: item
      });
    }


  }

  const postPenjualan = () => {
    var y = [];
    nofak.forEach(element => {
      y = element.no_faktur;
    })
    // nofak.pop();


    var res = y.substring(8)
    const nofakTur = `NF${moment().format('YYMMDD')}${parseInt(res) + 1}`;
    console.log(y);
    console.log(nofakTur);
    // const rand = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    // const filename = `Nofaktur${rand}`;
    let diBayar = [];
    cartitem.forEach(element => {
      diBayar.push({
        no_faktur: nofakTur,
        kode_barang: element.kode_barang,
        nama_barang: element.nama_barang,
        harga: element.harga,
        jumlah: element.quantity,

      })

    });
    console.log(diBayar);

    let items = JSON.stringify({
      "no_faktur": nofakTur,
      "tanggal": tanggal,
      "kode_pelanggan": kode_pelanggan,
      "jumlah": jumlah,
      "status": status,
      "lama": lama,
      "ongkir": ongkir,
      "total": total,
      "admin": admin,
      "data": diBayar
    });

    let config = {
      method: 'post',
      url: 'https://afgan.hizraniaga.com/m_api.php?a=addtransaksi',
      headers: {
        'Content-Type': 'application/json'
      },
      data: items
    };

    // const options = {
    //   method: 'POST',
    //   url: 'https://afgan.hizraniaga.com/m_api.php',
    //   params: { a: 'addtransaksi' },
    //   headers: { 'Content-Type': 'application/json' },
    //   data: {
    //     no_faktur: no_faktur,
    //     tanggal: tanggal,
    //     kode_pelanggan: kode_pelanggan,
    //     jumlah: jumlah,
    //     status: status,
    //     lama: lama,
    //     ongkir: ongkir,
    //     total: total,
    //     admin: admin
    //   }
    // };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.data.Pesan === 'Berhasil') {

          // getDatatransaksi()
          setNo_faktur('')
          setKode_pelanggan('')
          setTanggal('')
          setStatus('Cash')
          setLama('-')
          setOngkir('')
          setAdmin('')
          setTotal('')
          setJumlah('')
        }

      })
      .catch((error) => {
        console.log(error);
      });
    dispatch({ type: "REMOVE_ALL" })
  }

  function currencyFormat(num) {
    return 'Rp ' + parseFloat(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <>



      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">

          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-left text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <form className="md:flex hidden  flex-row flex-wrap items-center lg:ml-auto mr-3">
                    <div className="relative flex  flex-wrap items-stretch">
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-search"></i>
                      </span>
                      <input

                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here..."
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                      />
                    </div>
                    {/* <h2 className="text-4xl font-semibold">Here are our heroes</h2>
                  <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the

                    potentially record maximum.

                  </p> */}
                  </form>
                </div>
              </div>





              <div className="flex flex-wrap">
                {commentsData?.map((item, i) => (
                  <div onClick={() => tambahKeranjang(item)} key={i} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                    <div className="px-6">
                      <img
                        alt="..."
                        src={require("assets/img/logo.jpg").default}
                        className="shadow-lg rounded-full  max-w-40-px"
                      />
                      <div className="mt-1 text-center">
                        <h5 className="text-sm font-bold">{item.nama_barang}</h5>
                        <p className="mt-1 text-xs text-blueGray-400 uppercase font-semibold">
                          Stok :  {item.stok}
                        </p>
                        <div className="mt-6">
                          {/* <button
                            className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            <i className="fab fa-twitter"></i>
                          </button>
                          <button
                            className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </button>
                          <button
                            className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            <i className="fab fa-dribbble"></i>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PaginationComponent
                total={totalItems}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                onPageChange={page => setCurrentPage(page)}
              />
              {/* Header */}
              {/* <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div> */}
              {/* <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4"> */}
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {/* <div className="text-center flex justify-between">
                      <h6 className="text-blueGray-700 text-xl font-bold">Data Penjualan</h6>

                    </div> */}
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Transaksi Penjualan
                      </h6>
                      <div className="flex flex-wrap">
                        {/* {nofak?.map((element, i) => (
                          <label key={i}
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            {element.no_faktur}
                          </label>
                        ))} */}

                        {/* <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              No Faktur
                            </label>
                            <input
                              value={no_faktur}
                              onChange={(e) => { setNo_faktur(e.target.value); }}
                              type="text"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              defaultValue=""
                            />
                          </div>
                        </div> */}
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Tanggal
                            </label>
                            <input
                              value={tanggal}
                              onChange={(e) => { setTanggal(e.target.value); console.log('tgl', tanggal); }}
                              type="date"
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
                              Nama Pelanggan
                            </label>
                            <select
                              value={kode_pelanggan}
                              onChange={(e) => { setKode_pelanggan(e.target.value); console.log('plngg', kode_pelanggan); }}
                              className="selectpicker1">
                              <option value="">pilih Pelanggan</option>
                              {pelanggan?.map((item, i) => (
                                <option key={i} value={item.kode_pelanggan}>{item.nama}</option>
                              ))}

                            </select>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Status
                            </label>
                            <select
                              value={status}
                              onChange={(e) => { setStatus(e.target.value); }}
                              className="selectpicker1">
                              <option value="Cash">Cash</option>
                              <option value="Kredit">Kredit</option>
                            </select>
                            <select
                              value={lama}
                              onChange={(e) => { setLama(e.target.value); }}
                              className="selectpicker2">
                              <option value="-">-</option>
                              <option value="1 Bulan">1 Bulan</option>
                            </select>
                          </div>

                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Biaya Pengiriman
                            </label>
                            <input
                              value={ongkir}
                              onChange={(e) => { setOngkir(e.target.value); }}
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
                              admin
                            </label>
                            <input
                              disabled={true}
                              value={admin}
                              onChange={(e) => { setAdmin(e.target.value); }}
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
                              Jumlah Item
                            </label>
                            <input
                              disabled={true}
                              value={jumlah}
                              onChange={(e) => { setJumlah(e.target.value); }}
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
                              Total Bayar
                            </label>
                            <input
                              value={total}
                              onChange={(e) => { setTotal(e.target.value); }}
                              type="text"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">

                          <button onClick={() => postPenjualan()}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Simpan
                          </button>


                        </div>
                      </div>


                    </form>
                    {/* </div>
                    </div> */}
                    {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TRAFFIC"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div> */}
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        <div className="w-full lg:w-4/12 px-4">

          <section className="relative py-16 bg-white-200">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap  mb-24">

                <div className="relative flex flex-col min-w-0 break-words= w-full mb-6 shadow-xl rounded-lg mt-16">
                  Total : {currencyFormat(total)}
                  <div className="px-6">

                    <div className="flex flex-wrap justify-center">

                      {renderItem()}

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>

        {/* </div> */}
        {/* </div>
      </div> */}

      </div>
    </>
  );
}
