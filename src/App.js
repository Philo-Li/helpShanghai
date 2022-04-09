/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { isBefore } from 'date-fns';
import Navbar from 'react-bootstrap/Navbar';
import Home from './components/home/Home';
import Discover from './components/discover/Discover';
import Footer from './components/Footer';
import Profile from './components/profile/Profile';
import Settings from './components/profile/Settings';
import ArticleDetails from './components/article-page/ArticleDetails';
import CollectionDetails from './components/collection-page/CollectionDetails';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import useField from './hooks/useField';
import NavSearchBar from './components/others/NavSearchBar';
import SearchPage from './components/search-article/SearchPage';
import License from './components/license/License';
import LicenseZh from './components/license/LicenseZh';
import About from './components/about/About';
import AboutZh from './components/about/AboutZh';
import ContactUs from './components/ContactUs';
import Create from './components/create/Create';
import Edit from './components/create/Edit';
import logo from './img/logo/logo-w-dark-192.jpg';
import './index.css';
import TokenExpireModal from './components/others/TokenExpireModal';

const navStyle = {
  // fontStyle: 'bold',
  fontSize: '1rem',
};

const App = () => {
  const client = useApolloClient();
  const searchValue = useField('searchValue');
  const [newSearchValue, setNewSearchValue] = useState('');
  const [showTokenExpireModal, setShowTokenExpireModal] = useState(false);

  const Menu = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    const username = localStorage.getItem('username');

    const handleLogout = async (event) => {
      event.preventDefault();
      localStorage.clear();
      client.resetStore();
    };

    let userPage;
    if (token) userPage = `/@${username}`;

    const checkTokenExpire = isBefore(new Date(expirationTime), new Date(Date.now()));

    useEffect(() => {
      if (token && !expirationTime) {
        setShowTokenExpireModal(true);
      }
      if (token && checkTokenExpire) {
        setShowTokenExpireModal(true);
      }
    });

    return (
      <div style={navStyle}>
        <Navbar collapseOnSelect expand="md" bg="white" variant="light" fixed="sticky">
          <Navbar.Brand href="/" className="container-row-navbar-brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="margin-right-5"
              alt="Waldon brand logo"
            />
            Help Shanghai
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <div className="container-row-navbar-searchbox">
                <NavSearchBar placeholder="Search..." />
              </div>
            </Nav>
            <Nav className="justify-content-end container-row-0 navbar-link">
              {/* <a className="navbar-link" href="/discover">Discover</a> */}
              {/* <a className="navbar-link" href="/about">About</a> */}
              {!token && <a className="navbar-link" href="/signin">登录</a>}
              {token && (
                <NavDropdown title="我的账户" id="basic-nav-dropdown">
                  <NavDropdown.Item className="navbar-link" href={userPage}>主页</NavDropdown.Item>
                  <NavDropdown.Item href="/user/edit">设置</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {token && <button className="navbar-button-logout" type="submit" onClick={handleLogout}>登出</button>}
                </NavDropdown>
              )}
              {token && <a href="/create" className="navbar-button-join">发布信息</a>}
              {!token && <a href="/signup" className="navbar-button-join">注册</a>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <TokenExpireModal
          showTokenExpireModal={showTokenExpireModal}
          setShowTokenExpireModal={setShowTokenExpireModal}
        />
      </div>
    );
  };

  return (
    <Router>
      <div>
        <Menu />
        <div>
          <Switch>
            <Route path="/discover" exact>
              <Discover />
            </Route>
            <Route path="/license" exact>
              <License />
            </Route>
            <Route path="/license/zh" exact>
              <LicenseZh />
            </Route>
            <Route path="/faq" exact>
              <License />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/about/zh" exact>
              <AboutZh />
            </Route>
            <Route path="/contact" exact>
              <ContactUs />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/create" exact>
              <Create />
            </Route>
            <Route path="/search" render={() => (<SearchPage />)}>
              {/* <SearchPage authorizedUser={authorizedUser} /> */}
            </Route>
            <Route path="/user/edit" exact>
              <Settings />
            </Route>
            <Route path="/:username" exact>
              <Profile />
            </Route>
            <Route path="/article/:id" exact>
              <ArticleDetails />
            </Route>
            <Route path="/collection/:id" exact>
              <CollectionDetails />
            </Route>
            <Route path="/edit/:id" exact>
              <Edit />
            </Route>
            <Route path="/" exact>
              <Home
                searchValue={searchValue}
                newSearchValue={newSearchValue}
                setNewSearchValue={setNewSearchValue}
              />
            </Route>
            <Redirect to="/" />
            <Redirect from="/search?" to="/search?" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
