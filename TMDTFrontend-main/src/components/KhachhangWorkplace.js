import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './SanphamWorkplace.css'
function Admin_workplace({slide}){
    const [on,setOn] = useState(false)
    const [khachhang,setkhachhang] = useState([]);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'khachhang/')
        .then(response => setkhachhang(response.data))
        .catch(erro => console.log(erro))
    },[])
    const getDeleteKH = (matk)=>{
        let agree = window.confirm(`Bạn có muốn xóa khách hàng makh = ${matk}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API+'khachhang/'+matk)
        .then(response => {
            axios.get(process.env.REACT_APP_API+'khachhang/')
            .then(response => 
                {
                    setkhachhang(response.data)
                    alert('Xóa thành công !!!')
                } )
            .catch(erro =>console.log(erro))
            
        } )
        .catch(erro =>alert('Xóa thất bại !!!'))
    }
    return(
        <div className={slide?"workplace":"on-off-workplace"}>
                <h3 className={!on?"form-head":"d-none"}></h3>  
                <ul className={!on?"":"d-none"}>
                </ul>
                <div className={!on?"workplace_display":"d-none"}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead">
                            <tr>
                                <th className="title-product">Mã khách hàng</th>
                                <th className="title-product">Họ tên khách hàng</th>
                                <th className="title-product">Địa chỉ</th>
                                <th className="title-product">Số điện thoại</th>
                                <th className="title-product">Email</th>
                                <th className="title-product">Giới tính</th>
                                <th className="title-product">Username</th>
                                <th className="title-product">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {khachhang.map(kh =>{
                                const gender = ()=>{
                                    if(kh.gioitinh == '0'){
                                        return 'Nữ'
                                    }
                                    else if(kh.gioitinh == '1')
                                        return 'Nam'
                                    else
                                        return 'Khác'
                                }
                                return (
                                    <tr key={kh.makh}>
                                       <td>{kh.makh}</td>
                                       <td>{kh.ho +' '+ kh.ten}</td>
                                       <td>{kh.diachi}</td>
                                       <td>{kh.sdt}</td>
                                       <td>{kh.email}</td>
                                       <td>{gender()}</td>
                                       <td>{kh.taikhoan?.username}</td>
                                       <td className="custom"><p className="custom-link" onClick={()=> getDeleteKH(kh.taikhoan.username)}>Delete</p> </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>         
                </div>
                <div>
                
            
        </div>
        </div>
    )
}
export default Admin_workplace