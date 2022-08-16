import React,{useState,useEffect} from 'react'
import SanphamWorkplace from './SanphamWorkplace'
import DanhMucWorkplace from './DanhMucWorkplace'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";


function Nhanvien(){
    let myStore = window.localStorage
    let quyen = myStore.getItem('quyen')
    let history = useHistory();
    useEffect(()=>{
        if(quyen != 3)
            history.push('/')
    })
    
    
    let {nhanvienPage} = useParams();
    const [slide,setSlide] = useState(true)
    let Page = '';
    switch(nhanvienPage){
        case 'sanpham':{
            Page = <SanphamWorkplace slide={slide}/>
            break;
        }
        case 'index':{
            Page = <div style={{maxWidth:'85%',height:'92vh'}}><img src="https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg" alt="picture" style={{width:'100%',height:'100%',overflowY:'hidden'}}/></div>
            break;
        }
        case 'danhmuc':{
            Page = <DanhMucWorkplace slide={slide}/>
            break;
        }
        // case 'donhang':{
        //     Page = <D slide={slide}/>
        //     break;
        // }
    }
    return(
        <div>
            <div className='header-admin'>       
                <h3 className="logo-admin"><span className="slide-button" onClick={toggleSlide}><i className="fa fa-bars" aria-hidden="true"></i></span>Quản lý kho <span className="logo-name">FAS ENTERPRISE</span></h3>
                <p onClick={()=>{myStore.removeItem('user'); myStore.removeItem('jwt') ; history.push("/")}} className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Đăng xuất</p>
            </div>
            <div className='body-admin'>
                <div className={slide?"slide-bar":'slide-bar on-off'}  >
                    <div className={slide?"employee":"employee on-off-employee"}>
                        <div className="employee-image">
                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                        </div>
                        <h4 className="employee-name">Name</h4>
                    </div>
                    <div className={slide?"slide-bar_list":"slide-bar_list on-off-menu"}>
                        <Link to="/admin/sanpham"><p><i className="fa fa-list-alt" aria-hidden="true"></i><span className="ml-2" >Danh sách sản phẩm</span></p></Link>
                        <Link to="/admin/danhmuc"><p><i className="fa fa-users" aria-hidden="true"></i><span className="ml-2">Danh sách danh mục</span></p></Link>
                        <Link to="/admin/khachhang"><p><i className="fa fa-calendar-check-o" aria-hidden="true"></i><span className="ml-2">Danh sách khách hàng</span></p></Link>
                        <Link to="/admin/nhanvien"><p><i className="fa fa-calendar" aria-hidden="true"></i><span className="ml-2">Danh sách nhân viên</span></p></Link>
                        <Link to="/admin/sanpham"><p><i className="fa fa-sign-out" aria-hidden="true"></i><span className="ml-2">Thoát</span></p></Link>
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

export default Nhanvien