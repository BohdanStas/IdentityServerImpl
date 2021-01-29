import * as React from 'react';
import {Route} from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import Callback from "./components/Callback";
import {useContext, useEffect} from "react";
import Store from "../src/store/store";
import Logout from "./components/Logout";
import Loading from "./components/Loading";


export default () => {

    const store = useContext(Store);
    useEffect(() => {
        store.loadUser()
    }, [store]);

    if (!store.appLoaded) {
        return (<Loading content={"Loading..."}/>)
    } else {
        return (
                <Layout>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/callback' component={Callback}/>
                    <Route exact path='/logout' component={Logout}/>
                </Layout>
        );
    }

}
