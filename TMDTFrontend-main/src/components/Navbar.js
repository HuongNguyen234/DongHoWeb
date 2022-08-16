import React,{useState,useEffect} from 'react'
import logo from './logo.png'
import './Navbar.css'
import axiosClient from '../API/AxiosClient'

import {
  BrowserRouter as Router,
  useHistory,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
function Navbar(){
    let history =useHistory();
    const [danhmuc,setDanhMuc] = useState(null);
    const [hang,setHang] = useState(null);
    const myStorage = window.localStorage;
    useEffect(()=>{
      axios.get(process.env.REACT_APP_API+'danhmuc/')
      .then(response => setDanhMuc(response.data))
      .catch(error => console.log(error))
    },[])

    useEffect(()=>{
      axios.get(process.env.REACT_APP_API+'hang/')
      .then(response => setHang(response.data))
      .catch(error => console.log(error))
    },[])

    const [search,setSearch] = useState('')
    const [isSearch,setIsSearch] = useState(false)
    const [products,setProducts] = useState([])
    useEffect(async()=>{
        try {
          const data = await axiosClient.get('sanpham',null);
          setProducts(data);
        } catch (error) {
          console.log(error)
        }
    },[]) 
    const handleSearch = async(e)=>{
      const {value} = e.target
      setSearch(value)
    }

    const onSearch = () => {
      myStorage.setItem('search',search)
      history.push('/search')
    }

    return(
      
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <a className="navbar-brand d-block d-sm-none" to="/#">
            <img src={logo} className='logo'/>
         </a>
         <Link to='/'>
          <a className="navbar-brand d-none d-sm-block" to="/#">
          <img src="https://i.pinimg.com/originals/b1/2e/e7/b12ee7389041544b207b9488c55301ef.png" style={{width:100}}/> MIA WATCH
          </a>
         </Link>
        
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon" />
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                 <ul className="navbar-nav mr-auto">
                   <li className="nav-item">
                   <Link to='/'>
                     <a className='nav-link' to="/#">TRANG CHỦ</a>
                    </Link>
                   </li>
                   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">DANH MỤC</a>
                            <div className="dropdown-menu">
                                 {danhmuc?.map(dm=>{
                                   return (
                                    <Link to = {"/danhmuc/"+dm.madm}><p className="dropdown-item">{dm.tendm}</p></Link>
                                   )
                                 })}
                            </div>
                   </li>
                   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">HÃNG</a>
                            <div className="dropdown-menu">
                                 {hang?.map(dm=>{
                                   return (
                                    <Link to = {"/hang/"+dm.mahang}><p className="dropdown-item">{dm.tenhang}</p></Link>
                                   )
                                 })}
                            </div>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>THÔNG TIN</a>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>LIÊN HỆ</a>
                   </li>
                 </ul>
                 
               </div>
               
               <form className='search input-group ' onFocus={()=>setIsSearch(true)} onBlur={()=>setIsSearch(false)}>
            <input className='form-control' placeholder='Nhập để tìm kiếm . . .' onChange={handleSearch} />
            <div className="input-group-append">
                <button className='btn btn_search' onClick={onSearch}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
            {isSearch?
              <div className="searchBox">
              <div className="table-responsive">
              <table className="table table-borderless table-hover table-dark" >
                <tbody>
                  {products.map(sp=>{
                    if(sp.tensp.toLowerCase().includes(search.toLowerCase()) || sp.loai.toLowerCase().includes(search.toLowerCase()) || sp.hang.toLowerCase().includes(search.toLowerCase()))
                    return (
                      <tr key={sp.masp} onMouseDown={()=> window.location.href="/product/"+sp.masp}  >
                        <td><img alt="pr" src={sp.photo} style={{width:70}}/></td>
                        <td>{sp.tensp}</td>
        
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
              
            </div>:''
            }
        </form>
             </nav>
    )
}
export default Navbar;