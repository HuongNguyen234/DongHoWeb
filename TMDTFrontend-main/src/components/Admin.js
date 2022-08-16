import React,{useState,useEffect} from 'react'
import './Admin.css'
import SanphamWorkplace from './SanphamWorkplace'
import DanhMucWorkplace from './DanhMucWorkplace'
import NhaccWorkplace from './NhaCC_Workplace'
import KhachhangWorkplace from './KhachhangWorkplace'
import NhanvienWorkplace from './NhanvienWorkplace'
import DonhangWorkplace from './Donhang_workplace'
import Thongke from './Thongke'
import Phieuphap_workplace from './PhieuNhapWorkplace'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";

function Admin(){
    let myStore = window.localStorage
    let quyen = myStore.getItem('quyen')
    let history = useHistory();
    const username = myStore.getItem('username')
    const [user,setUser] = useState(null);
    useEffect(()=>{
        if(quyen == 2)
            history.push('/')
        if(username && (quyen == 3 || quyen == 1))
        axios.get(process.env.REACT_APP_API +'nhanvien/'+username)
        .then(response => {setUser(response.data)})
        .catch(error => console.log(error))
    }, []);


    let {adminPage} = useParams();
    const [slide,setSlide] = useState(true)
    let Page = '';
    switch(adminPage){
        case 'sanpham':{
            Page = <SanphamWorkplace slide={slide}/>
            break;
        }
        case 'index':{
            Page = <div className="page-admin"></div>
            break;
        }
        case 'danhmuc':{
            Page = <DanhMucWorkplace slide={slide}/>
            break;
        }
        case 'khachhang':{
            Page = <KhachhangWorkplace slide={slide}/>
            break;
        }
        case 'nhanvien':{
            Page = <NhanvienWorkplace slide={slide}/>
            break;
        }
        case 'donhang':{
            Page = <DonhangWorkplace slide={slide} user = {user}/>
            break;
        }
        case 'phieunhap':{
            Page = <Phieuphap_workplace slide={slide}/>
            break;
        }
        case 'nhacc':{
            Page = <NhaccWorkplace slide={slide}/>
            break;
        }
        case 'thongke':{
            Page = <Thongke />
            break;
        }
    }
    return(
        <div>
            <div className='header-admin'>       
                <h3 className="logo-admin"><span className="slide-button" onClick={toggleSlide}><i className="fa fa-bars" aria-hidden="true"></i></span>TRANG QUẢN TRỊ</h3>
                <p onClick={()=>{myStore.removeItem('username') ; history.push("/")}} className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Đăng xuất</p>
            </div>
            <div className='body-admin'>
                <div className={slide?"slide-bar":'slide-bar on-off'}  >
                    <div className={slide?"employee":"employee on-off-employee"}>
                        <div className="employee-image">
                            <img className="avatar-employee-image" src="data:image/png;base64,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"/>
                        </div>
                        <h4 className="employee-name">{user?.ho + ' ' + user?.ten}</h4>
                    </div>
                    <div className={slide?"slide-bar_list":"slide-bar_list on-off-menu"}>
                        <Link to="/admin/sanpham"><p><span className="ml-2" >Danh sách sản phẩm</span></p></Link>
                        <Link to="/admin/danhmuc"><p><span className="ml-2">Danh sách danh mục</span></p></Link>
                        <Link to="/admin/donhang"><p><span className="ml-2">Danh sách đơn hàng</span></p></Link>
                        {quyen == 1?
                            <div>
                                <Link to="/admin/khachhang"><p><span className="ml-2">Danh sách khách hàng</span></p></Link>
                        <Link to="/admin/nhanvien"><p><span className="ml-2">Danh sách nhân viên</span></p></Link>
                            </div>:''
                        }
                        
                        <Link to="/admin/thongke"><p><span className="ml-2">Thống kê</span></p></Link>
                        <Link to="/admin/nhacc"><p><span className="ml-2">Nhà cung cấp</span></p></Link>
                    </div>
                    
                </div>
                {Page}
            </div>
        </div>       
    )
    function toggleSlide(){
        setSlide(!slide)
    }
    
}

export default Admin