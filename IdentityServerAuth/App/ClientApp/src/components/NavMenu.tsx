import * as React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import {observer} from "mobx-react-lite";
import Store from "../store/store"
import {useContext} from "react";
import Loading from "./Loading";

const NavMenu = () => {

    const store = useContext(Store);
    const {user, isLoggedIn} = store;

    if (!store.appLoaded) {
        return (<Loading content={"Loading..."}/>)
    } else {
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">IdentityAPI</NavbarBrand>
                    <NavbarToggler onClick={store.toggle} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={store.isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            {isLoggedIn
                                ?
                                <>
                                    <NavItem>
                                        <NavLink style={{cursor:"pointer"}} onClick={store.logout} className="text-dark">Logout</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/callback">Callback</NavLink>
                                    </NavItem>
                                </>
                                :
                                <NavItem>
                                    <NavLink style={{cursor:"pointer"}} onClick={() => store.login()} className="text-dark">Login</NavLink>
                                </NavItem>
                            }


                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}}

export default observer(NavMenu)
