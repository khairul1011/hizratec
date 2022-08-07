import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// components

import { useReactToPrint } from 'react-to-print';

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import PaginationComponent from "components/Pagination";
import moment from "moment";
import 'moment/locale/id';
import { useHistory } from "react-router";

import { createPopper } from '@popperjs/core';
import Api from "api/Api";
import Select from 'react-select';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const options = [
  { value: 'chocolate', label: 'Chocolate', id: 'a' },
  { value: 'strawberry', label: 'Strawberry', id: 'b' },
  { value: 'vanilla', label: 'Vanilla', id: 'c' },
];

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const history = useHistory();
  const cartitem = useSelector(state => state.cartReducer);
  const user = useSelector(state => state.userReducer.user);
  const ccc = useSelector(state => state.cartSimpan);
  const [barang, setBarang] = React.useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
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
  const [tukar, setTukar] = useState('simpan')
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
  const [s_faktur, setS_Faktur] = React.useState('Pilih Faktur');
  const [s_Pelanggan, setS_Pelanggan] = React.useState('Pilih Pelanggan');
  const [tlp, setTlp] = React.useState('');

  const [nofak, setNofak] = useState([])
  const [s_nofak, setS_Nofak] = useState([])
  const [d_penjualan, setD_penjualan] = useState([])


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  console.log(total)

  const Pelanggan = (e) => {
    closeDropdownPopover()
    setKode_pelanggan(e.value)
    setS_Pelanggan(e.label)
    setTlp(e.telp)
    console.log(e)
  }

  React.useEffect(() => {
    getDataBarang()
    getpelanggan()
    getNofak()
    // getPenjualan()
  }, [])

  const getNofak = () => {
    let fak = [];
    const options = {
      method: 'GET',
      url: Api.url,
      params: { a: 'getFaktur' }
    };

    axios.request(options).then(function (response) {
      console.log(response.data.data);
      setNofak(response.data.data)
      response.data.data.forEach(element => (
        fak.push({
          value: element.no_faktur, label: element.no_faktur
        })
      ))
      setS_Nofak(fak)
    }).catch(function (error) {
      console.error(error);
    });
  }
  const getPenjualan = () => {
    let cart = [];
    const options = {
      method: 'GET',
      url: 'https://afgan.hizraniaga.com/m_api.php',
      params: { a: 'penjualan', faktur: s_faktur }
    };

    axios.request(options).then(function (response) {
      console.log(response.data.data);
      setTukar('edit')
      setD_penjualan(response.data.data)
      // response.data.data.forEach(element=>(
      //   cart.push({
      //     kode_barang: element.kode_barang,
      //     nama_barang: element.nama_barang,
      //     quantity: element.qty,
      //     harga: element.harga,
      //   })

      // ))

      // dispatch({
      //   type: 'ADD_TO_CART',
      //   item: response.data.data,
      // });
      // setTanggal(JSON.stringify(response.data.data[0].tanggal))
      // setS_Pelanggan(JSON.stringify(response.data.data[0]?.nama))
      // setStatus(JSON.stringify(response.data.data[0]?.status))
      // setLama(JSON.stringify(response.data.data[0].lama))
      // setOngkir(JSON.stringify(response.data.data[0].ongkir))
      // setAdmin(JSON.stringify(response.data.data[0].admin))
      // setJumlah(JSON.stringify(response.data.data[0]?.jumlah))
      // setTotal(JSON.stringify(response.data.data[0]?.total))
    }).catch(function (error) {
      console.error(error);
    });

  }


  const getpelanggan = () => {
    let datax = [];
    const options = { method: 'GET', url: Api.url, params: { a: 'pelanggan' } };

    axios.request(options).then(function (response) {
      console.log(response.data);
      response.data.data.forEach(element => (
        datax.push(
          {
            value: element.kode_pelanggan, label: element.nama, telp: element.telp
          }
        )
      ))
      setPelanggan(datax)
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
    const pajak = diskon + parseInt(totals);
    console.log(pajak);

    // dispatch({
    //     type: "TOTAL",
    //     payload: jumlah
    // });
  });


  const getDataBarang = () => {
    const options = { method: 'GET', url: Api.url, params: { a: 'barang' } };

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
      "quantity": quantity ,
      "merek": item.merek,
      "harga": harga,
    };
    dispatch({
      type: "ADD_TO_CART",
      item: cartItem
    });

    setfirst('')
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

  const renderFaktur = () => {
    let items = [];
    cartitem.map((item, i) => {
      const newTotal = item.quantity * item.harga;
      items.push(


        <tr key={i}>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

            <span
              className={
                "ml-3 font-bold " +
                +"light"
              }
            >
              {item.nama_barang}
            </span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {item.quantity}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {currencyFormat(item.harga)}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {currencyFormat(newTotal)}
          </td>


        </tr>
      );
    });

    return items;
  }

  const renderItem = () => {
    let items = [];
    cartitem.map((item, i) => {
      const newTotal = item.quantity * item.harga;
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

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    setS_Faktur(item.value)
    // the item selected
    // setKode_pelanggan(item.value)
    // setS_Pelanggan(item.label)
    // setTlp(item.telp)
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = ({ item }) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.kode_pelanggan}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.nama_barang}</span>
      </>
    )
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

  // const onData = (item) => {
  //   // setTukar('edit')
  //   setTanggal(item.tanggal)
  //   setS_Pelanggan(item.nama)
  //   setStatus(item.status)
  //   setLama(item.lama)
  //   setOngkir(item.ongkir)
  //   setAdmin(item.admin)
  //   setJumlah(item.jumlah)
  //   setTotal(item.total)
  //   console.log(item)
  // }
  const postPenjualan = () => {
    var y = [];
    nofak.forEach(element => {
      y = element.no_faktur;
    })
    // nofak.pop();


    var res = y.substring(8)
    const nofakTur = `NF${moment().format('YYMMDD')}${parseInt(res) + 1}`;
    console.log('y', y);
    console.log(nofakTur);
    setNo_faktur(nofakTur)
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
      url: Api.url + 'a=addtransaksi',
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
        // handlePrint()
        // setNo_faktur('')
        // getNofak()
        if (response.data.Pesan === 'Berhasil') {
          handlePrint()
          // getDatatransaksi()
          setNo_faktur('')
          setKode_pelanggan('')
          setTanggal('')
          setStatus('Cash')
          setLama('-')
          setOngkir('')

          setTotal('')
          setJumlah('')
          getNofak()
          dispatch({ type: "REMOVE_ALL" })

        }

      })
      .catch((error) => {
        console.log(error);
      });

  }

  function currencyFormat(num) {
    return 'Rp ' + parseFloat(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function pembilang(nilai) {
    nilai = Math.abs(nilai);
    var simpanNilaiBagi = 0;
    var huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    var temp = "";

    if (nilai < 12) {
      temp = " " + huruf[nilai];
    }
    else if (nilai < 20) {
      temp = pembilang(nilai - 10) + " Belas";
    }
    else if (nilai < 100) {
      simpanNilaiBagi = Math.floor(nilai / 10);
      temp = pembilang(simpanNilaiBagi) + " Puluh" + pembilang(nilai % 10);
    }
    else if (nilai < 200) {
      temp = " Seratus" + pembilang(nilai - 100);
    }
    else if (nilai < 1000) {
      simpanNilaiBagi = Math.floor(nilai / 100);
      temp = pembilang(simpanNilaiBagi) + " Ratus" + pembilang(nilai % 100);
    }
    else if (nilai < 2000) {
      temp = " Seribu" + pembilang(nilai - 1000);
    }
    else if (nilai < 1000000) {
      simpanNilaiBagi = Math.floor(nilai / 1000);
      temp = pembilang(simpanNilaiBagi) + " Ribu" + pembilang(nilai % 1000);
    }
    else if (nilai < 1000000000) {
      simpanNilaiBagi = Math.floor(nilai / 1000000);
      temp = pembilang(simpanNilaiBagi) + " Juta" + pembilang(nilai % 1000000);
    }
    else if (nilai < 1000000000000) {
      simpanNilaiBagi = Math.floor(nilai / 1000000000);
      temp = pembilang(simpanNilaiBagi) + " Miliar" + pembilang(nilai % 1000000000);
    }
    else if (nilai < 1000000000000000) {
      simpanNilaiBagi = Math.floor(nilai / 1000000000000);
      temp = pembilang(nilai / 1000000000000) + " Triliun" + pembilang(nilai % 1000000000000);
    }

    return temp;
  }




  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">

          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">



              <div className="flex flex-wrap justify-left text-center mb-24">

                <div className="w-full lg:w-6/12 px-4">
                  <div className="text-center flex justify-around ">
                    <div className="text-center flex justify-around  flex-wrap items-stretch">
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
                    {/* <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">

                        <Select
                          defaultValue={selectedOption1}
                          onChange={handleOnSelect}
                          options={s_nofak}

                        />
                      </div>
                    </div> */}
                    {/* <button
                      className="text-black font-bold text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-900 ease-linear transition-all duration-150"
                      type="button"
                      // ref={btnDropdownRef}
                      onClick={() => getPenjualan()}
                    >
                      Cari
                    </button> */}
                    {/* <button
                        className="text-black font-bold text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-900 ease-linear transition-all duration-150"
                        type="button"
                        ref={btnDropdownRef}
                        onClick={() => setShowModal(true)}
                      >
                        {s_faktur}
                      </button>
                      <div
                        ref={popoverDropdownRef}
                        className={
                          (dropdownPopoverShow ? "block " : "hidden ") +
                          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                        }
                      >
                        <a

                          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                          onClick={() => setS_Faktur('No Faktur')}
                        >
                          No Faktur
                        </a>
                        {nofak?.map((item, i) => (
                          <a
                            key={i}
                            className="text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                            onClick={() => Pelanggan(item)}
                          >
                            {item.no_faktur}
                          </a>
                        ))}
                      </div> */}

                    {/* <button onClick={() => history.push('/admin/penjualan/print-faktur')}
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Print
                    </button> */}
                  </div>
                  <form className="md:flex hidden  flex-row flex-wrap items-center lg:ml-auto mr-3">


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
                              disabled={true}
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
                              Tanggal {d_penjualan[0]?.tanggal}
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
                              Nama Pelanggan {d_penjualan[0]?.nama}
                            </label>
                            <Select
                              defaultValue={selectedOption}
                              onChange={Pelanggan}
                              options={pelanggan}
                            />
                            {/* <select
                              value={kode_pelanggan}
                              onChange={(e) => { setKode_pelanggan(e.target.value); console.log('plngg', kode_pelanggan); }}
                              className="selectpicker1">
                              <option value="">pilih Pelanggan</option>
                              {pelanggan?.map((item, i) => (
                                <option key={i} value={item.kode_pelanggan}>{item.nama}</option>
                              ))}

                            </select> */}
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Status {d_penjualan[0]?.status} {d_penjualan[0]?.lama}
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
                              Biaya Pengiriman {d_penjualan[0]?.ongkir}
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
                              admin {d_penjualan[0]?.admin}
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
                              Jumlah Item {d_penjualan[0]?.jumlah}
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
                              Total Bayar {d_penjualan[0]?.total}
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
                          {tukar === 'simpan' ?
                            <button onClick={() => postPenjualan()}
                              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                            >
                              Simpan
                            </button>
                            :
                            <button
                              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                            >
                              Edit
                            </button>
                          }
                          {/* <button onClick={() => handlePrint()}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Simpan
                          </button> */}

                        </div>
                      </div>


                    </form>

                    <div ref={componentRef}
                      className={
                        "relative  bg-blueGray-100 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                        "light"
                      }
                    >
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
                                {admin == 'admin1' && 'UD.AFGANROOF 1'}
                                {admin == 'admin2' && 'UD.AFGANROOF 2'}
                                {admin == 'owner' && 'UD.AFGANROOF'}

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
                              >No : {no_faktur} </th>
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
                              >Tanggal : {moment(tanggal).format('DD MMMM YYYY')}  </th>
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
                              >Pelanggan : {s_Pelanggan}</th>
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
                              >Telepon : {tlp} </th>
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
                            {(renderFaktur())}
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
                                {currencyFormat(total)}
                              </td>
                            </tr>
                            <tr>
                              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

                                {/* <span
                                  className={
                                    "ml-3 font-bold " +
                                    +"light"
                                  }
                                >
                                  Grand Total
                                </span> */}
                              </th>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span
                                  className={
                                    "ml-3 font-bold " +
                                    +"light"
                                  }
                                >
                                  Terbilang :
                                </span>
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span
                                  className={
                                    "ml-3 font-bold " +
                                    +"light"
                                  }
                                >
                                  {pembilang(total)}
                                </span>
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {/* {currencyFormat(total)} */}
                              </td>
                            </tr>

                          </tfoot>
                        </table>
                        {/* footr */}
                        <table className="items-center w-full mt-16  border-collapse">
                          <thead>
                            <tr>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                  "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                              >
                                Admin / Marketing
                              </th>
                              <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                              }>Gudang</th>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                  "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                }
                              >Supir</th>
                              <th className={
                                "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                                "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                              }>Penerima</th>
                            </tr>

                            <tr><th className={
                              "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                              "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th></tr>
                            <tr><th className={
                              "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                              "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th></tr>
                            <tr><th className={
                              "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                              "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th></tr>
                            <tr><th className={
                              "px-6 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                              "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }></th></tr>
                            <tr><th className={
                              "px-6 align-middle border border-solid mb-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +

                              "bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                            }> </th></tr>

                          </thead>
                          <tbody>

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


                                  ___________________


                                </span>
                              </th>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                ___________________
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                ___________________
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                ___________________
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {/* //pribnt */}
                      {/* <ComponantPrint ref={componentRef}

                        no="asd"
                        tanggal={moment().format()}
                        pelanggan="fulan"
                        telepon="0809"
                      /> */}
                      {/* <button onClick={handlePrint}>print</button> */}

                    </div>

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

        <div className="w-full lg:w-4/12 px-4 ">
          {showModal ? (
            <>
              <div
                className="justify-center items-center flex w-screen overflow-y-auto h-32 fixed inset-0 z-50 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Modal Title
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div class="flex-1 flex flex-col bg-white">

                      <div class="flex flex-col bg-red-500 h-full">

                        <div class="bg-white h-full flex-grow-0 overflow-y-auto">
                          <table className="items-center w-full mt-16  border-collapse">
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

                            </tbody>
                          </table>
                        </div>



                      </div>

                    </div>
                    {/*body*/}

                    {/* {pelanggan?.map((item, i) => (
                          <a
                            key={i}
                            className="text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                            onClick={() => Pelanggan(item)}
                          >
                            {item.nama}
                          </a>
                        ))} */}

                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
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
