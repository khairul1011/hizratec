import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios'


// components

export default function Addpelanggan() {
  const [pelanggan, setPelanggan] = React.useState([]);

  const [kode_pelanggan, setKode_pelanggan] = React.useState('')
  const [nama, setNama] = React.useState('')
  const [perusahaan, setPerusahaan] = React.useState('')
  const [telp, setTelp] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [provinsi, setProvinsi] = React.useState('')
  const [kota, setKota] = React.useState('')
  const [kode_pos, setKode_pos] = React.useState('')
  const [tukar, setTukar] = useState('simpan')


  React.useEffect(() => {
    getpelanggan()
  }, [])

  const getpelanggan = () => {
    const options = { method: 'GET', url: 'https://afgan.hizraniaga.com/m_api.php', params: { a: 'pelanggan' } };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setPelanggan(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const postaddpelanggan = () => {
    const options = {
      method: 'POST',
      url: 'https://afgan.hizraniaga.com/m_api.php',
      params: { a: 'addpelanggan' },
      headers: { 'Content-Type': 'application/json' },
      data: {
        kode_pelanggan: kode_pelanggan,
        nama: nama,
        perusahaan: perusahaan,
        telp: telp,
        email: email,
        provinsi: provinsi,
        kota: kota,
        kode_pos: kode_pos
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      if (response.data.Pesan === 'Berhasil') {
        setTukar('simpan')
        getpelanggan()
        setKode_pelanggan('')
        setNama('')
        setPerusahaan('')
        setTelp('')
        setEmail('')
        setProvinsi('')
        setKota('')
        setKode_pos('')
      }
    }).catch(function (error) {
      console.error(error);
    });
  }
const posteditdata = () => {
  const options = {
    method: 'POST',
    url: 'https://afgan.hizraniaga.com/m_api.php',
    params: {a: 'editpelanggan'},
    headers: {'Content-Type': 'application/json'},
    data: {
      kode_pelanggan: kode_pelanggan,
      nama: nama,
      perusahaan: perusahaan,
      telp: telp,
      email: email,
      provinsi: provinsi,
      kota: kota,
      kode_pos: kode_pos
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    if (response.data.Pesan === 'Berhasil') {
      setTukar('simpan')
      getpelanggan()
      setKode_pelanggan('')
      setNama('')
      setPerusahaan('')
      setTelp('')
      setEmail('')
      setProvinsi('')
      setKota('')
      setKode_pos('')
    }
  }).catch(function (error) {
    console.error(error);
  });
}
  

  const onData = (item) => {
    setTukar('edit')
    setKode_pelanggan(item.kode_pelanggan)
    setNama(item.nama)
    setPerusahaan(item.perusahaan)
    setTelp(item.telp)
    setEmail(item.email)
    setProvinsi(item.provinsi)
    setKota(item.kota)
    setKode_pos(item.kode_pos)
    console.log(item)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Data Pelanggan</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Input Data Pelanggan
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kode Pelanggan
                  </label>
                  <input
                    value={kode_pelanggan}
                    onChange={(e) => { setKode_pelanggan(e.target.value); console.log(kode_pelanggan) }}
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
                    Nama
                  </label>
                  <input
                    value={nama}
                    onChange={(e) => { setNama(e.target.value); console.log(nama) }}
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
                    Perusahaan
                  </label>
                  <input
                    value={perusahaan}
                    onChange={(e) => { setPerusahaan(e.target.value); console.log(perusahaan) }}
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
                    Telp
                  </label>
                  <input
                    value={telp}
                    onChange={(e) => { setTelp(e.target.value); console.log(telp) }}
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
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); console.log(email) }}
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
                    Provinsi
                  </label>
                  <input
                    value={provinsi}
                    onChange={(e) => { setProvinsi(e.target.value); console.log(provinsi) }}
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
                    Kota
                  </label>
                  <input
                    value={kota}
                    onChange={(e) => { setKota(e.target.value); console.log(kota) }}
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
                    Kode Pos
                  </label>
                  <input
                    value={kode_pos}
                    onChange={(e) => { setKode_pos(e.target.value); console.log(kode_pos) }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                {tukar === 'simpan' ?
                  <button onClick={() => postaddpelanggan()}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Simpan
                  </button>
                  :
                  <button onClick={() => posteditdata()} 
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Edit
                  </button>
                }
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Kode Pelanggan
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nama
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Telp
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Kota
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Provinsi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pelanggan?.map((item, i) => (
                    <tr key={i} onClick={() => onData(item)} >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.kode_pelanggan}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.nama}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.telp}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {item.kota}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {item.provinsi}
                      </td>
                    </tr>
                  ))}


                </tbody>
              </table>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
