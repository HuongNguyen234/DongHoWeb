import './App.css';
import React,{useEffect,useState} from 'react'
import Header from './components/Header'
import Carousel from './components/Carousel'
import ItemList from './components/ItemList'
import Search from './components/Search'
import Bottom from './components/Bottom'
import Commit from './components/Commit'
import Detail from './components/Detail'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'
import Activate from './components/Activate'
import Nhanvien from './components/Nhanvien'
import {UserProvider} from './context/UserContext'
import ViewOrder from './components/ViewOrder'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import SlideItem from './components/SlideItem';
import SlideBC from './components/SlideBC';
import SlideKM from './components/SlideKM';
function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);
  return props.children
}
function App() {
  return (
    
      <div className="App">     
      <Router>
      <UserProvider>
      <Switch>
        
        <_ScrollToTop>
          <Route path="/" exact>
          <Header />
          <Carousel />
          <SlideKM />
          <SlideItem />
          <SlideBC />
          <ItemList />
          <Bottom />
        </Route>

        <Route path="/search" exact>
          <Header />
          <Search />
          <Bottom />
        </Route>

        <Route path="/danhmuc/:madm" exact>
          <Header />
          <ItemList />
          <Bottom />
          
        </Route>

        <Route path="/hang/:hang" exact>
          <Header />
          <ItemList />
          <Bottom />
          
        </Route>

        <Route path="/viewOrder" exact>
          <Header />
          <ViewOrder />
          <Commit />
          <Bottom />
          
        </Route>
        <Route path="/product/:masp" exact>
         <Header />
          <Detail />
          <Bottom />
        </Route>
        <Route path="/cart" exact>
          <Header />
          <Cart /> 
          <Bottom />
        </Route>
        <Route path="/login" exact>
          <Header />
          <Login />
          <Bottom />
          
        </Route>
        <Route path="/activate" exact>
          <Header />
          <Activate />
          <Bottom />
          
        </Route>
        <Route path="/register" exact>
          <Header />
          <Register />
          <Bottom />
          
        </Route>
        <Route path="/admin/:adminPage" exact>
            <Admin />
        </Route>
        <Route path="/nhanvien/:nhanvienPage" exact>
            <Nhanvien />
        </Route>
        </_ScrollToTop>
        
    </Switch>
    </UserProvider>
      </Router>
      
    </div>
    
  );
}

export default App;
