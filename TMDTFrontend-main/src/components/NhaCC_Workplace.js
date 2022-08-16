import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import './SanphamWorkplace.css'
function Admin_workplace({slide}){
    const [on,setOn] = useState(false)
    const [onUpdate,setOnUpdate] = useState(false)
    const {register, handleSubmit, setValue } = useForm();
    const [danhmuc,setDanhmuc] = useState([]);
    const [search,setSearch] = useState('')
    const checkDanhMuc = (mancc)=>{
        for(let i=0;i<danhmuc.length;i++){
            if(danhmuc[i].mancc === mancc)
            return true;
        }
        return false;
    }
    const onSubmit = data => {
        if(onUpdate){
            axios.put(process.env.REACT_APP_API +'nhacc',data)
            .then(response =>{
                console.log(response)
                setOn(!on)
                setOnUpdate(!onUpdate)
                axios.get(process.env.REACT_APP_API+'nhacc')
                .then(response => setDanhmuc(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            if(checkDanhMuc(data.mancc)){
                alert('Trùng mã nhà cung cấp !!!')
                return;
            }
            axios.post(process.env.REACT_APP_API +'nhacc',data)
            .then(response =>{
                console.log(response)
                setOn(!on)
                axios.get(process.env.REACT_APP_API+'nhacc')
                .then(response => setDanhmuc(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
    }
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'nhacc')
        .then(response => setDanhmuc(response.data) )
        .catch(erro => console.log(erro))
    },[])
    const getDeleteDM = (mancc)=>{
        let agree = window.confirm(`Bạn có muốn xóa mã nhà cung cấp mã: ${mancc}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API+'nhacc/'+mancc)
        .then(response => {
            axios.get(process.env.REACT_APP_API+'nhacc')
            .then(response => {setDanhmuc(response.data);alert('Xóa thành công !!!')} )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại !!!'))
    }
    const getUpdateDM =(dm)=>{
        setOnUpdate(true)
        setOn(true)
        setValue("mancc",dm.mancc)
        setValue("tenncc",dm.tenncc)
        setValue("sdt",dm.sdt)
        setValue("email",dm.email)
        setValue("diachi",dm.diachi)
    }
    const getInsertDM = ()=>{
        setOn(true); 
        setValue("mancc",'')
        setValue("tenncc",'')
        setValue("sdt",'')
        setValue("email",'')
        setValue("diachi",'')
    }
    const handleSearch = (e)=>{
        const {value} = e.target;
        setSearch(value)
    }
    return(
        <div className={slide?"workplace":"on-off-workplace"}>
                <h3 className={!on?"form-head":"d-none"}></h3>  
                <ul style={{listStyle:'none'}} className={!on?"":"d-none"} >
                <li className="" onClick={()=>getInsertDM()}><button className="btn btn-outline-info"><i className="fa fa-plus-square-o" aria-hidden="true"></i>Thêm nhà cung cấp</button></li>
                </ul>
                <div className={!on?"workplace_display":"d-none"}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead">
                            <tr>
                                <th  className="title-product">Mã nhà cung cấp</th>
                                <th  className="title-product">Tên nhà cng cấp</th>
                                <th  className="title-product">Số điện thoại</th>
                                <th  className="title-product">Email</th>
                                <th  className="title-product">Địa chỉ</th>
                                <th  className="title-product">Delete</th>
                                <th  className="title-product">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {danhmuc.map(dm =>{
                                if(dm.tenncc.toLowerCase().includes(search.toLowerCase()))
                                return (
                                    <tr key={dm.mancc}>
                                        <td>{dm.mancc}</td>
                                        <td>{dm.tenncc}</td>
                                        <td>{dm.sdt}</td>
                                        <td>{dm.email}</td>
                                        <td>{dm.diachi}</td>
                                        <td className="custom"><p className="custom-link" onClick={()=> getDeleteDM(dm.mancc)}>Delete</p> </td>
                                        <td className="custom"><p className="custom-link" onClick={()=> getUpdateDM(dm)}>Update</p></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                        

                </div>
                <div>
                <div className={on?"workplace_input":"d-none"}>
                <div className="card">
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <label>Mã nhà cung cấp</label>
                                    <input className="form-control" placeholder="Nhập mã nhà cung cấp" ref={register} name='mancc' readOnly={onUpdate?true:false}/>
                                    <label>Tên nhà cung cấp</label>
                                    <input className="form-control" placeholder="Nhập tên nhà cung cấp" ref={register} name='tenncc'/>
                                    <label>Số điện thoại</label>
                                    <input className="form-control" placeholder="Nhập số điện thoại" ref={register} name='sdt'/>
                                    <label>Email</label>
                                    <input className="form-control" placeholder="Nhập email" ref={register} name='email'/>
                                    <label>Địa chỉ</label>
                                    <input className="form-control" placeholder="Nhập địa chỉ" ref={register} name='diachi'/>
                                </div>        
                                <button className="btn btn-warning mt-4 mr-4 btn-input"  type="submit" >Submit</button>
                                <button className="btn btn-outline-danger mt-4 mr-4 btn-input" type="reset">Reset</button>
                                <button className="btn btn-info mt-4 btn-input" onClick={()=>setOn(!on)} type="button">Exit</button>
                            </div> 
                        </div>
                 </form>

                </div>
                </div>
                </div>
            
        </div>
        </div>
    )
}
export default Admin_workplace