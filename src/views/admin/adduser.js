import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios'
import PaginationComponent from "components/Pagination";

// components

export default function Adduser() {

  const [pengguna, setPengguna] = React.useState([]);

  const [username, setUsername] = React.useState('')
  const [emailuser, setEmailuser] = React.useState('')
  const [status, setStatus] = React.useState('OWNER')
  const [password, setPassword] = React.useState('')
  const [tukar, setTukar] = useState('simpan')
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    getDatapengguna()
  }, [])

  const getDatapengguna = () => {
    const options = { method: 'GET', url: 'https://afgan.hizraniaga.com/m_api.php', params: { a: 'pengguna' } };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setPengguna(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const postaddPengguna = () => {
    const options = {
      method: 'POST',
      url: 'https://afgan.hizraniaga.com/m_api.php',
      params: { a: 'addpengguna' },
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: username,
        email: emailuser,
        status: status,
        password: password
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      if (response.data.Pesan === 'Berhasil') {
        setTukar('simpan')
        getDatapengguna()
        setUsername('')
        setEmailuser('')
        setStatus('')
        setPassword('')
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  const editbarang = () => {
    const options = {
      method: 'POST',
      url: 'https://afgan.hizraniaga.com/m_api.php',
      params: { a: 'editpengguna' },
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: username,
        email: emailuser,
        status: status,
        password: password
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      if (response.data.Pesan === 'Berhasil') {
        setTukar('simpan')
        getDatapengguna()
        setUsername('')
        setEmailuser('')
        setStatus('')
        setPassword('')
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  const onData = (item) => {
    setTukar('edit')
    setUsername(item.username)
    setEmailuser(item.email)
    setStatus(item.status)
    setPassword(item.password)
    console.log(item)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Data User</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Input Data Admin
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); console.log(username) }}
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
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); console.log(password) }}
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
                    value={emailuser}
                    onChange={(e) => { setEmailuser(e.target.value); console.log(emailuser) }}
                    type="email"
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
                    Level
                  </label>
                  <select
                    value={status}
                    onChange={(e) => { setStatus(e.target.value); console.log(status) }}
                    className="selectpicker">
                    <option value="OWNER">OWNER</option>
                    <option value="KASIR">KASIR</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                {tukar === 'simpan' ?
                  <button onClick={() => postaddPengguna()}
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
                <h6 className="text-blueGray-700 text-xl font-bold">List User</h6>

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
                      Username
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Password
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pengguna?.map((item, i) => (
                    <tr key={i} onClick={() => onData(item)}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.username}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.password}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {item.status}
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