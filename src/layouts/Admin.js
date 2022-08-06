import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import adduser from "views/admin/adduser";
import addpelanggan from "views/admin/addpelanggan";
import addpembelian from "views/admin/addpembelian";
import addpenjualan from "views/admin/addpenjualan";
import addbarang from "views/admin/addbarang";
import PrintJual from "views/admin/PrintJual";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/produk" exact component={addbarang} />
            <Route path="/admin/user" exact component={adduser} />
            <Route path="/admin/pelanggan" exact component={addpelanggan} />
            <Route path="/admin/pembelian" exact component={addpembelian} />
            <Route path="/admin/penjualan" exact component={Settings} />
            <Route path="/admin/penjualan/print-faktur" exact component={PrintJual} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
