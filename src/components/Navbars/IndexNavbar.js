/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import Logo from "assets/img/WhatsApp Image 2022-09-27 at 15.20.18.png";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import IndexDropdown2 from "components/Dropdowns/IndexDropdown2.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);


  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [dropdownPopoverShow2, setDropdownPopoverShow2] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const btnDropdownRef2 = React.createRef();
  const popoverDropdownRef2 = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow2(false);
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const openDropdownPopover2 = () => {
    createPopper(btnDropdownRef2.current, popoverDropdownRef2.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(false);
    setDropdownPopoverShow2(true);
  };

  const closeDropdownPopover2 = () => {
    setDropdownPopoverShow2(false);
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">


            <img src={Logo} width="50px" dan height="50px"
              alt="....."
            />




          </div>
          <li className="flex items-center">
            <Link
              
              className="hover:text-blueGray-500 text-blueGray-700 px-2 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
            >

            </Link>
          </li>
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/Index"
              className="text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap "
            >
              Hizratech Konsultan Service
            </Link>
            

            
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/Index"
                  
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xm  font-bold"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <>
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xm font-bold"
                    href="#pablo"
                    ref={btnDropdownRef}
                    onClick={(e) => {
                      e.preventDefault();
                      dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                    }}
                  >
                    Tentang Kami
                  </a>
                  <div
                    ref={popoverDropdownRef}
                    className={
                      (dropdownPopoverShow ? "block " : "hidden ") +
                      "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                    }
                  >

                    <Link
                      to="/Profile"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Tentang Kami
                    </Link>
                    <Link
                      to="/Artikel"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Aturan Order
                    </Link>
                    <Link
                      to="/Landing"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Karir
                    </Link>

                  </div>
                </>
              </li>
              <li className="flex items-center">

                <>
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xm font-bold"
                    href="#pablo"
                    ref={btnDropdownRef2}
                    onClick={(e) => {
                      e.preventDefault();
                      dropdownPopoverShow2 ? closeDropdownPopover2() : openDropdownPopover2();
                    }}
                  >
                    Layanan Kami
                  </a>
                  <div
                    ref={popoverDropdownRef2}
                    className={
                      (dropdownPopoverShow2 ? "block " : "hidden ") +
                      "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                    }
                  >

                    <Link
                      to="/Profile"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Jasa Website
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Instal & Service Komputer
                    </Link>
                    <Link
                      to="/admin/tables"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Pasang CCTV
                    </Link>
                    <Link
                      to="/admin/tables"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Service AC
                    </Link>

                  </div>
                </>
              </li>
              <li className="flex items-center">
                <Link
                  to="/Artikel"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xm font-bold"
                >
                  Artikel
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/Kontak"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xm font-bold"
                >
                  Kontak
                </Link>
              </li>


              <li className="flex items-center">
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
