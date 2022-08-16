import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './SanphamWorkplace.css'
function Phieuphap_workplace
({slide,user}){
    const [on,setOn] = useState(false)
    const [input,setInput] = useState({})
    const [donhang,setDonhang] = useState([]);
    const [search,setSearch] = useState('')
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'phieunhap/')
        .then(response => setDonhang(response.data))
        .catch(erro => console.log(erro))
    },[])
    const getDeleteDH = (madh)=>{
        let agree = window.confirm(`Bạn có muốn xóa madh = ${madh}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API+'donhang/'+madh)
        .then(response => {
            
            axios.get(process.env.REACT_APP_API+'donhang/')
            .then(response => {
                setDonhang(response.data)
                alert("Xóa thành công !!!")
            })
            .catch(erro =>  alert('Xóa thất bại !!!'))
            
        } )
        .catch(erro => console.log(erro))
    }
    
    const changeTT = (e,dh)=>{
      if(window.confirm('Bạn có muốn thay đổi trạng thái đơn hàng'))
      {
        const {value} = e.target
      dh.trangthai = value
      dh.nhanvien = user
      axios.put(process.env.REACT_APP_API+'phieunhap/',dh)
      .then(res => 
        axios.get(process.env.REACT_APP_API+'phieunhap/')
        .then(response => setDonhang(response.data))
        .catch(erro => console.log(erro))
        )
      .catch(err => console.log(err))
      }
      else{
        window.location.reload();
      }
    }
    return(
        <div className={slide?"workplace":"on-off-workplace"}>
                <h3 className={!on?"form-head":"d-none"}></h3>  
                <ul className={!on?"form-func":"d-none"}>
                </ul>
                <div className={!on?"workplace_display":"d-none"}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead">
                            <tr>
                                <th>MÃ PHIẾU NHẬP</th>
                                <th>NGÀY NHẬP</th>
                                <th>MÃ NHÂN VIÊN</th>
                                <th>MÃ ĐƠN ĐẶT HÀNG</th>
                                <th>XEM CHI TIẾT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donhang.map(dh =>{
                              
                                    <tr key={dh.mapn}>
                                        <td>{dh.mapn}</td>
                                       <td>{dh.ngaylap}</td>
                                       <td>{dh.nhanvien?.manv}</td>
                                       <td>
                                             <p style={{cursor:'pointer'}}  className="text-info" data-toggle="modal" data-target={'#'+dh.madh}>
                                                   Xem sản phẩm
                                             </p>
                                             <div className="modal fade" id={dh.madh} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                 <div className="modal-dialog modal-xl" role="document">
                                                   <div className="modal-content">
                                                     <div className="modal-header bg-warning text-white">
                                                       <h5 className="modal-title" id="exampleModalLabel" style={{margin:'auto',textAlign:'center'}}>Chi tiết đơn hàng {dh.madh}</h5>
                                                     </div>
                                                     <div className="modal-body">
                                                       <div className="table-responsive">
                                                       <table className="table table-striped table-bordered table-dark table-hover">
                                                         <thead>
                                                           <tr>
                                                             <th scope="col">Mã sản phẩm</th>
                                                             <th scope="col">Tên sản phẩm</th>
                                                             <th scope="col">Hình ảnh</th>
                                                             <th scope="col">Số lượng</th>
                                                             <th scope="col">Đơn giá</th>
                                                           </tr>
                                                         </thead>
                                                         <tbody>
                                                           {dh.ctPhieunhap?.map(ct=>(
                                                               <tr key={ct.sanpham?.masp}>
                                                                   <td>{ct.sanpham?.masp}</td>
                                                                   <td>{ct.sanpham?.tensp}</td>
                                                                   <td><img alt="pc" src={ct.sanpham?.photo} style={{width:70}}/></td>
                                                                   <td>{ct.soluong}</td>
                                                                   <td>{ct.gia + '$'}</td>
                                                               </tr>
                                                           ))}
                                                         </tbody>
                                                       </table>
                                                       </div>
                                                       
                                             
                                                     </div>
                                                     <div className="modal-footer">
                                                       <button type="button" className="btn-custom" data-dismiss="modal" >Thoát</button>
                                                     </div>
                                                   </div>
                                                 </div>
                                               </div>
                                       </td>

                                    </tr>
                            })}
                        </tbody>
                    </table>         
                </div>
                <div>
                
            
        </div>
        </div>
    )
}
export default Phieuphap_workplace
