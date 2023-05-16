import React, { useContext, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SoNiceContext from '../SoNiceContext';
import Image from '../statics/images/sonice-logo.png'
import { isConstructorDeclaration } from 'typescript';

const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { shoppingBasket } = useContext(SoNiceContext);
  const [items,setItems]= useState(0);

   useEffect(() => {
    console.log(shoppingBasket.length)
    
   
     
           setItems(shoppingBasket.length);
         
     
  }, [items]);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">    <img
                                            className=" rounded ratio ratio-16x9"
                                            alt=""
                                            src={Image}
                                            style={{ width: "70px", height: "auto" }}
                                        /> </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/products">Browse</NavLink>
            </NavItem>
            <LoginMenu>
            </LoginMenu>
            <Link to="/checkout" className="btn btn-outline-dark me-3 d-none d-lg-inline" replace>
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{shoppingBasket.length}</span>
            </Link>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
