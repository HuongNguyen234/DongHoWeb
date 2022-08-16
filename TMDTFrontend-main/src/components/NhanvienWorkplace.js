import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './SanphamWorkplace.css'
function Admin_workplace({slide}){
    const [on,setOn] = useState(false)
    const [input,setInput] = useState({})
    const [search,setSearch] = useState('')
    const [nhanvien,setNhanvien] = useState([]);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'nhanvien/')
        .then(response => setNhanvien(response.data))
        .catch(erro => console.log(erro))
    },[])
    const getDeleteNV = (matk)=>{
        let agree = window.confirm(`Bạn có muốn xóa username : ${matk} ?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API+'nhanvien/'+matk)
        .then(response => {
            axios.get(process.env.REACT_APP_API+'nhanvien/')
            .then(response => 
                {
                    setNhanvien(response.data)
                    alert('Xóa thành công !!!')
                } )
            .catch(erro =>console.log(erro))
            
        } )
        .catch(erro =>alert('Xóa thất bại !!!'))
    }
    const getInsertTK = ()=>{
        setOn(true); 
    }
    const updateInput = (e)=>{
        const {name,value} = e.target;
        setInput({
            ...input,
            [name]:value
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.get(process.env.REACT_APP_API+'IsUserExits/'+ input.username)
        .then(response => {alert('Đã tồn tại username này !!!'); return})
        .catch(ero=>{
            axios.post(process.env.REACT_APP_API +'nhanvien',input)
            .then(res => {
                alert('Thêm nhân viên thành công !!!')
                axios.get(process.env.REACT_APP_API+'nhanvien/')
                .then(response => setNhanvien(response.data))
                .catch(erro => console.log(erro))
                setOn(false)
            })
            .catch(err => {console.log(err) ; alert('Thêm thất bại !!!')})
        })
    }
    return(
        <div className={slide?"workplace":"on-off-workplace"}>
                <h3 className={!on?"form-head":"d-none"}></h3>  
                <ul className={!on?"":"d-none"} style={{listStyle:'none'}}>
                        
                         <li className="add_form" onClick={()=>getInsertTK()}><button className="btn btn-outline-info"><i className="fa fa-plus-square-o" aria-hidden="true"></i>Thêm nhân viên</button></li>
                </ul>
                <div className={!on?"workplace_display":"d-none"}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead">
                            <tr>
                                <th className="title-product">Mã nhân viên</th>
                                <th className="title-product">Họ tên nhân viên</th>
                                <th className="title-product">Email</th>
                                <th className="title-product">Số điện thoại</th>
                                <th className="title-product">Giới tính</th>
                                <th className="title-product">Địa chỉ</th>
                                <th className="title-product">Username</th>
                                <th className="title-product">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nhanvien.map(nv =>{
                                const gender = ()=>{
                                    if(nv.gioitinh == '0'){
                                        return 'Nữ'
                                    }
                                    else if(nv.gioitinh == '1')
                                        return 'Nam'
                                    else
                                        return 'Khác'
                                }
                                if((nv.ho +' '+ nv.ten).toLowerCase().includes(search.toLowerCase()))
                                return (
                                    <tr key={nv.manv}>
                                       <td>{nv.manv}</td>
                                       <td>{nv.ho +' '+ nv.ten}</td>
                                       <td>{nv.email}</td>
                                       <td>{nv.sdt}</td>
                                       <td>{gender()}</td>
                                       <td>{nv.diachi}</td>
                                       <td>{nv.taikhoan?.username}</td>
                                       <td className="custom"><p className="custom-link" onClick={()=> getDeleteNV(nv.taikhoan.username)}>Delete</p> </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>         
                </div>
                <div>




                <div>
                    <div className={on?"workplace_input":"d-none"}>
                    <div className="card">
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <label>Họ nhân viên</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='ho' onChange={updateInput}/>
                                        <label>Tên nhân viên</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='ten' onChange={updateInput}/>
                                        <label>Email</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='email' onChange={updateInput}/>
                                        <label>Số  điện thoại</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='sdt' onChange={updateInput}/>
                                        <label>Giới tính</label>
                                        <select className="custom-select my-1 mr-sm-2" name="gioitinh" onChange={updateInput}>
                                            <option value={1}>Nam</option>
                                            <option value={0}>Nữ</option>
                                        </select>
                                        <label>Địa chỉ</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='diachi' onChange={updateInput}/>
                                        <label>Lương</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='luong' onChange={updateInput}/>
                                        <label>Username</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='username' onChange={updateInput}/>
                                        <label>Password</label>
                                        <input className="form-control" placeholder="Please enter here ..." name='password' type="password" onChange={updateInput}/>
                                        <button className="btn btn-warning mt-4 mr-4 btn-input"  type="submit" >Submit</button>
                                        <button className="btn btn-outline-danger mt-4 mr-4 btn-input" type="reset">Reset</button>
                                        <button className="btn btn-info mt-4 btn-input" type="button" onClick={()=>setOn(!on)}>Exit</button>
                                    </div>
                                    <div className="col-6">
                                                                                
                                    </div>
                                </div>
                                
                                {/* <CKEditor 
                                 name='motachitiet'
                                /> */}
                                
                                
                            </div>
                        </form>

                    </div>
                    </div>
                    </div>
            
                </div>
                
            
        </div>
        </div>
    )
}
export default Admin_workplace