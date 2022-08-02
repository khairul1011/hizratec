import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios'
import PaginationComponent from "components/Pagination";
// components

export default function Addbarang() {
  const [barang, setBarang] = React.useState([]);

  const [totalItems, setTotalItems] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [loading, setLoading] = useState(false);

  const [pageSize, setPageSize] = useState(10);

  const [kode_barang, setKode_barang] = React.useState('')
  const [nama_barang, setNama_barang] = React.useState('')
  const [jenis, setJenis] = React.useState('')
  const [merek, setMerek] = React.useState('')
  const [kategori, setKategori] = React.useState('Baja Ringan')
  const [unit, setUnit] = React.useState('Lembar')
  const [harga, setHarga] = React.useState('')
  const [stok, setStok] = React.useState('')

  const [tukar, setTukar] = useState('simpan')

  React.useEffect(() => {
    getDataBarang()
  }, [])

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
          comment.kode_barang.toLowerCase().includes(search.toLowerCase())

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

  const postBarang = () => {
    const options = {
      method: 'POST',
      url: 'https://afgan.hizraniaga.com/m_api.php/m_api.php',
      params: { a: 'addproduct' },
      headers: { 'Content-Type': 'application/json' },
      data: {
        kode_barang: kode_barang,
        nama_barang: nama_barang,
        jenis: jenis,
        merek: merek,
        kategori: kategori,
        unit: unit,
        harga: harga,
        stok: stok
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      if (response.data.Pesan === 'Berhasil') {
        setTukar('simpan')
        getDataBarang()
        setKode_barang('')
        setNama_barang('')
        setKategori('')
        setUnit('')
        setMerek('')
        setJenis('')
        setHarga('')
        setStok('')
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  const editbarang = () => {
    const options = {
      method: 'POST',
      url: 'https://afgan.hizraniaga.com/m_api.php/m_api.php',
      params: { a: 'editproduct' },
      headers: { 'Content-Type': 'application/json' },
      data: {
        kode_barang: kode_barang,
        nama_barang: nama_barang,
        jenis: jenis,
        merek: merek,
        kategori: kategori,
        unit: unit,
        harga: harga,
        stok: stok
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      if (response.data.Pesan === 'Berhasil') {
        setTukar('simpan')
        getDataBarang()
        setKode_barang('')
        setNama_barang('')
        setKategori('')
        setUnit('')
        setMerek('')
        setJenis('')
        setHarga('')
        setStok('')
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  const onData = (item) => {
    setTukar('edit')
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
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Data Barang</h6>


          </div>

        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Input Data Barang
            </h6>
            <div className="flex flex-wrap">
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
            </div>

            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">List Barang</h6>

                <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                  <div className="relative flex w-full flex-wrap items-stretch">
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
                </form>
              </div>

            </div>


            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Kode Barang
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nama Barang
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Merek
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Kategori
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Harga
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commentsData?.map((item, i) => (
                    <tr key={i} onClick={() => onData(item)}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left" >
                        {item.kode_barang}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.nama_barang}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.merek}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {item.kategori}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {item.harga}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                        {item.stok}
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
