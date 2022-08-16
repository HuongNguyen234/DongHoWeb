import React, { useState, useEffect } from 'react'
import { store } from '../firebase'
import { useForm } from "react-hook-form";
import axios from 'axios'
import './SanphamWorkplace.css'
function Admin_workplace({ slide }) {
    const [products, setProducts] = useState([])
    const [on, setOn] = useState(false)
    const [onUpdate, setOnUpdate] = useState(false)
    const { register, handleSubmit, setValue } = useForm();
    const [danhmuc, setDanhMuc] = useState(null);
    const [hang, setHang] = useState(null);
    const [nhacc, setNhacc] = useState(null);

    const checkSanPham = (masp) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].masp === masp)
                return true;
        }
        return false;
    }
    const onSubmit = data => {
        const myData = {
            ...data,
            photo: fileUrl,
            photo1: fileUrl1,
            photo2: fileUrl2
        }
        //console.log(process.env)
        //console.log(myData)
        const myAlterData = {
            masp: myData.masp,
            tensp: myData.tensp,
            soluong: myData.soluong,
            trangthai: myData.trangthai,
            dongia: myData.dongia,
            mota_chitiet: myData.mota_chitiet,
            photo: myData.photo,
            photo1: myData.photo1,
            photo2: myData.photo2,
            hang: myData.mahang ? {
                mahang: myData.mahang
            } : null,
            danhmuc: myData.madm ? {
                madm: myData.madm
            } : null,
            nhacc: myData.mancc ? {
                mancc: myData.mancc
            } : null
        }
        if (onUpdate) {
            console.log("update")
            console.log(fileUrl)
            axios.put(process.env.REACT_APP_API + 'sanpham', myAlterData)
                .then(response => {
                    console.log(response)
                    setOn(!on)
                    setOnUpdate(!onUpdate)
                    axios.get(process.env.REACT_APP_API + 'sanphamad')
                        .then(response => setProducts(response.data))
                        .catch(erro => console.log(erro))
                }).catch(error => console.log(error))
        }
        else {
            if (checkSanPham(data.masp)) {
                alert('Trùng mã sản phẩm !!!')
                return;
            }
            axios.post(process.env.REACT_APP_API + 'sanpham', myAlterData)
                .then(response => {
                    console.log(response)
                    setOn(!on)
                    axios.get(process.env.REACT_APP_API + 'sanphamad')
                        .then(response => setProducts(response.data))
                        .catch(erro => console.log(erro))
                }).catch(error => console.log(error))
        }
    }

    const [fileUrl, setFileUrl] = useState('');
    const [fileUrl1, setFileUrl1] = useState('');
    const [fileUrl2, setFileUrl2] = useState('');
    const handleImage = async (e) => {
        // code here
        var file = e.target.files[0];
        const fileNameFirst = file?.name;
        const fileNameFinal = fileNameFirst?.replace(/ /g, '')
        var storageRef = store.ref().child("photo/" + fileNameFinal)

        await storageRef.put(file);
        store.ref().child('photo').child(fileNameFinal).getDownloadURL().then(url => setFileUrl(url));
    }

    const handleImage1 = async (e) => {
        // code here
        var file = e.target.files[0];
        const fileNameFirst = file?.name;
        const fileNameFinal = fileNameFirst?.replace(/ /g, '')
        var storageRef = store.ref().child("quoc/" + fileNameFinal)

        await storageRef.put(file);
        store.ref().child('quoc').child(fileNameFinal).getDownloadURL().then(url => setFileUrl1(url));
    }

    const handleImage2 = async (e) => {
        // code here
        var file = e.target.files[0];
        const fileNameFirst = file?.name;
        const fileNameFinal = fileNameFirst?.replace(/ /g, '')
        var storageRef = store.ref().child("quoc/" + fileNameFinal)

        await storageRef.put(file);
        store.ref().child('quoc').child(fileNameFinal).getDownloadURL().then(url => setFileUrl2(url));
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'sanphamad/')
            .then(response => setProducts(response.data))
            .catch(erro => console.log(erro))

        //
        axios.get(process.env.REACT_APP_API + 'danhmuc/')
            .then(response => setDanhMuc(response.data))
            .catch(error => console.log(error))

        axios.get(process.env.REACT_APP_API + 'nhacc/')
            .then(response => setNhacc(response.data))
            .catch(error => console.log(error))

        axios.get(process.env.REACT_APP_API + 'hang/')
            .then(response => setHang(response.data))
            .catch(error => console.log(error))
    }, [])
    const getDeleteSP = (masp) => {
        let agree = window.confirm(`Bạn có muốn xóa masp = ${masp}?`);
        if (!agree)
            return
        axios.delete(process.env.REACT_APP_API + 'sanpham/' + masp)
            .then(response => {
                alert('Delete successfully !!!')
                axios.get(process.env.REACT_APP_API + 'sanphamad')
                    .then(response => setProducts(response.data))
                    .catch(erro => alert('Xóa thất bại !!!'))
            })
            .catch(erro => alert('Xóa thất bại'))
    }
    const getUpdateSP = (sp) => {
        setOnUpdate(true)
        setOn(true)
        setValue("masp", sp.masp)
        setValue("tensp", sp.tensp)
        setValue("soluong", sp.soluong)
        setValue("trangthai", sp.trangthai)
        setValue("dongia", sp.dongia)
        setValue("mota_chitiet", sp.mota_chitiet)
        setFileUrl(sp.photo)
        setFileUrl1(sp.photo1)
        setFileUrl2(sp.photo2)
    }
    const getInsertSP = () => {
        setOn(true);
        setValue("masp", '')
        setValue("tensp", '')
        setValue("soluong", '')
        setValue("dongia", '')
        setValue("trangthai", '')
        setValue("mota_chitiet", '')
        setFileUrl('')
        setFileUrl1('')
        setFileUrl2('')
        setValue("photo", null)
        setValue("photo1", null)
        setValue("photo2", null)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getTrangThai = (tt) => {
        if (tt == 0) {
            return "Mới"
        } else if (tt == 1) {
            return "Cũ"
        } else {
            return "Ngừng bán"
        }
    }

    return (
        <div className={slide ? "workplace" : "on-off-workplace"}>
            <h3 className={!on ? "form-head" : "d-none"}></h3>
            <ul className={!on ? "" : "d-none"} style={{ listStyle: 'none' }}>
                <li className="" onClick={() => getInsertSP()}><button className="btn btn-outline-info"><i className="fa fa-plus-square-o" aria-hidden="true"></i>Thêm sản phẩm</button></li>
            </ul>
            <div className={!on ? "workplace_display" : "d-none"}>
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead">
                        <tr>
                            <th className="title-product">Mã sản phẩm</th>
                            <th className="title-product">Tên sản phẩm</th>
                            <th className="title-product">Số lượng</th>
                            <th className="title-product">Đơn giá</th>
                            <th className="title-product">Danh mục</th>
                            <th className="title-product">Trạng thái</th>
                            <th className="title-product">Delete</th>
                            <th className="title-product">Update</th>
                            <th className="title-product">Hình ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const target = '#id' + product.masp;
                            return (
                                <tr key={product.masp}>
                                    <td>{product.masp}</td>
                                    <td>{product.tensp}</td>
                                    <td>{product.soluong}</td>
                                    <td>{numberWithCommas(product.dongia)} $</td>
                                    <td>{product.danhmuc?.tendm}</td>
                                    <td>{getTrangThai(product.trangthai)}</td>
                                    <td className="custom"><p className="custom-link" onClick={() => getDeleteSP(product.masp)}>Delete</p> </td>
                                    <td className="custom"><p className="custom-link" onClick={() => getUpdateSP(product)}>Update</p> </td>
                                    <td>
                                        <img src={product.photo} alt="" style={{ width: "100px" }} />
                                    </td>



                                    <div className="modal" id={'id' + product.masp}>
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">


                                                <div className="modal-header">
                                                    <h3 className="modal-title display-4">{product.tensp}</h3>
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>


                                                <div className="modal-body px-4">
                                                    <div className="row detail_product_admin px-4">
                                                        <div className="col-5">
                                                            <img src={product.photo} alt="" style={{ width: "90%" }} />
                                                        </div>
                                                        <div className="col-7">
                                                            <h3>{product.tensp}</h3>
                                                            <h4 className="text-danger">{product.dongia} $</h4>
                                                            <hr />
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <p>Loại</p>
                                                                </div>
                                                                <div className="col-6 text-right">
                                                                    <p>{product.danhmuc?.madm}</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <p>Hãng</p>
                                                                </div>
                                                                <div className="col-6 text-right">
                                                                    <p>{product.hang?.mahang}</p>
                                                                </div>
                                                            </div>

                                                            <hr />
                                                            <div className="row">
                                                                <div className="col-5">
                                                                    <p>Hàng trong kho</p>
                                                                </div>
                                                                <div className="col-7 text-right">
                                                                    <p>Còn : {product.soluong}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='col-12 mt-4'>
                                                            <h5>Mô tả chi tiết</h5>
                                                            <p>{product.mota_chitiet}</p>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>


            </div>
            <div>
                <div className={on ? "workplace_input" : "d-none"}>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <label>Mã sản phẩm</label>
                                            <input className="form-control" placeholder="" ref={register} name='masp' readOnly={onUpdate ? true : false} />
                                            <label>Tên sản phẩm</label>
                                            <input className="form-control" placeholder="" ref={register} name='tensp' />
                                            <label>Trạng thái</label>
                                            <select className="form-control" ref={register} name='trangthai'>
                                                <option label='Mới' value={0}></option>
                                                <option label='Cũ' value={1}></option>
                                                <option label='Ngừng bán' value={2}></option>
                                            </select>
                                            <label>Số lượng</label>
                                            <input className="form-control" placeholder="" ref={register} name='soluong' type='number' readOnly={onUpdate ? true : false} />
                                            <label>Đơn giá</label>
                                            <input className="form-control" placeholder="" ref={register} name='dongia' type='number' />
                                            
                                            <label>Hình ảnh 1</label>
                                            <div className="form-group">
                                                <input className="form-control-file border" placeholder="" ref={register} name='photo' type="file" onChange={handleImage} />
                                            </div>
                                            <label>Hình ảnh 2</label>
                                            <div className="form-group">
                                                <input className="form-control-file border" placeholder="" ref={register} name='photo1' type="file" onChange={handleImage1} />
                                            </div>
                                            <label>Hình ảnh 3</label>
                                            <div className="form-group">
                                                <input className="form-control-file border" placeholder="" ref={register} name='photo2' type="file" onChange={handleImage2} />
                                            </div>

                                            
                                            <label>Danh mục</label>
                                            <select className="form-control" ref={register} name='madm'>
                                                {danhmuc?.map(dm => (
                                                    <option label={dm.tendm} value={dm.madm}></option>
                                                ))}
                                            </select>
                                            <label>Hãng</label>
                                            <select className="form-control" ref={register} name='mahang'>
                                                {hang?.map(dm => (
                                                    <option label={dm.tenhang} value={dm.mahang}></option>
                                                ))}
                                            </select>
                                            <label>Nhà cung cấp</label>
                                            <select className="form-control" ref={register} name='mancc'>
                                                {nhacc?.map(dm => (
                                                    <option label={dm.tenncc} value={dm.mancc}></option>
                                                ))}
                                            </select>

                                            <label>Mô tả chi tiết</label>
                                            <textarea className="form-control" placeholder="" ref={register} name='mota_chitiet' rows="5" />
                                            <div className="photo-pproduct">
                                            {<div className={fileUrl !== '' ? "photo" : "d-none"}>
                                                <img src={fileUrl} alt="" style={{ width: "200px", height:"200px", padding: "3px" }} />
                                            </div>}
                                            {<div className={fileUrl1 !== '' ? "photo" : "d-none"}>
                                                <img src={fileUrl1} alt="" style={{ width: "200px", height:"200px", padding: "3px" }} />
                                            </div>}
                                            {<div className={fileUrl2 !== '' ? "photo" : "d-none"}>
                                                <img src={fileUrl2} alt="" style={{ width: "200px", height:"200px" , padding: "3px"}} />
                                            </div>}
                                            </div>
                                            <button className="btn btn-warning mt-4 mr-4 btn-input" type="submit" >Submit</button>
                                            <button className="btn btn-outline-danger mt-4 mr-4 btn-input" type="reset" onClick={() => setFileUrl('')}>Reset</button>
                                            <button className="btn btn-info mt-4 btn-input" onClick={() => setOn(!on)} type="button">Exit</button>
                                        </div>
                                        <div className="col-6">

                                        </div>
                                    </div>

                                    {/* <CKEditor 
                                ref={register} name='motachitiet'
                            /> */}


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