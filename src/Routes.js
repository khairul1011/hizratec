import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import adduser from "views/admin/adduser";
import Artikel from 'views/Artikel';
import Kontak from 'views/Kontak';

const Routes = () => {
    const user = useSelector(state => state.userReducer.isLogin);
    return (

        <BrowserRouter>
            <Switch>
                {/* add routes with layouts */}
                {user == true ?
                    <>
                    {/* <Route path="/auth/login" component={Auth} /> */}
                    <Route path="/auth/login" exact component={Auth} />
                        {/* add redirect for first page */}
                        <Redirect from="*" to="/auth/login" />
                       
                      
                    </>

                    :
                    <>
                         <Route path="/admin" component={Admin} />
                        <Route path="/Index" component={Index} />
                        <Route path="/Profile" component={Profile} />
                        <Route path="/Artikel" component={Artikel} />
                        <Route path="/Kontak" component={Kontak} />
                        <Route path="/Landing" component={Landing} />
                        {/* <Route path="/admin/penjualan" component={Admin} /> */}
                        {/* <Route path="/admin/penjualan" exact component={Admin} /> */}
                        {/* add redirect for first page */}
                        <Redirect from="*" to="/Index" />
                        
                    </>

                }
                {/* add routes without layouts */}
                {/* <Route path="/landing" exact component={Landing} /> */}
                {/* <Route path="/user" exact component={adduser} /> */}
                {/* <Route path="/profile" exact component={Profile} /> */}
                {/* <Route path="/profile" exact component={Profile} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile" exact component={Profile} /> */}

            </Switch>
        </BrowserRouter>


    )
}

export default Routes