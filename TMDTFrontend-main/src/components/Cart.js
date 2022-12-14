import React, { useState, useEffect, useContext } from 'react'
import PayPal from './PayPal'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './Cart.css'
import { UserContext } from '../context/UserContext'
import emailjs from 'emailjs-com';
export default function Cart() {
    let myStorage = window.localStorage;

    const [user, setUser] = useState({});
    const [total, setTotal] = useState(0)
    const history = useHistory();
    const [thanhtoan, setThanhtoan] = useState(1)
    const [checkout, setCheckout] = useState(false);
    const [userUpdate, setUserUpdate] = useState(null)

    const header = {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('jwt') //the token is a variable which holds the token
        }
    }
    const [sl, setSl] = useContext(UserContext)
    const [cart, setCart] = useState([])
    const [slt, setSlt] = useState(null)
    const [sanpham, setSanpham] = useState([])
    const getMaxSL = (masp) => {
        axios.get(process.env.REACT_APP_API + 'soluongton/' + masp)
            .then(response => {
                setSlt(response.data)
            })
            .catch(erro => console.log(erro))
    }
    let username = myStorage.getItem('username')
    useEffect(() => {
        if (username == null)
            history.push('/login')

        else {
            axios.get(process.env.REACT_APP_API + 'khachhang/' + username, header)
                .then(response => {
                    setUser(response.data)
                    axios.get(process.env.REACT_APP_API + `giohang/${response.data.makh}`, header)
                        .then(response => {
                            setCart(response.data)
                            const temp = response.data.map(sanph => {
                                return {
                                    masp: sanph.sanpham?.masp,
                                    soluong: sanph.soluong,
                                    dongia: sanph.sanpham?.dongia,
                                }
                            })

                            setSanpham(temp)
                        })
                        .catch(erro => console.log(erro))

                })
                .catch(error => console.log(error))

        }


    }, [])
    const deleteCart = (masp) => {

        setSanpham(sanpham.filter(sp => {
            if (sp.masp !== masp)
                return sp
        }))

        axios.delete(process.env.REACT_APP_API + `giohang/${user.makh}/${masp}`, header)
            .then(response =>
                axios.get(process.env.REACT_APP_API + `giohang/${user.makh}`, header)
                    .then(response => {
                        setCart(response.data)
                        axios.get(process.env.REACT_APP_API + 'numcart/' + user.makh, header)
                            .then(res => setSl(res.data))
                            .catch(err => console.log(err))
                    })
                    .catch(erro => console.log(erro))
            )
            .catch(erro => console.log(erro))
    }
    const changeNum = (e, sp) => {
        let masp = sp.masp
        getMaxSL(masp);
        let num = e.target.value;
        if (num > slt) {
            alert("S??? l?????ng s???n ph???m kh??ng ?????!")
            e.target.value = 1
        } else {
            const newSP = sanpham.map(s => {
                if (s.masp === masp) {
                    return {
                        ...s,
                        soluong: num
                    }
                }
                else
                    return { ...s }
            })
            setSanpham(newSP)

            axios.get(process.env.REACT_APP_API + `giohang/${user.makh}/${masp}?soluong=${num}`, header)
                .then(res => {
                    axios.get(process.env.REACT_APP_API + `giohang/${user.makh}`, header)
                        .then(response => {
                            setCart(response.data)
                            axios.get(process.env.REACT_APP_API + 'numcart/' + user.makh, header)
                                .then(res => setSl(res.data))
                                .catch(err => console.log(err))
                        })
                        .catch(erro => console.log(erro))
                })
                .catch(err => console.log(err))
        }


    }
    const checkSP = (e, sp, soluong) => {


        const mySP = { ...sp, soluong: soluong }


        if (e.target.checked) {
            setSanpham([...sanpham, mySP])

        }
        else {
            setSanpham(sanpham.filter(s => s.masp !== sp.masp))
        }
        //console.log(sanpham)
    }
    useEffect(() => {
        console.log(sanpham)
        let tam = 0;
        sanpham.forEach(sp => {
            tam += Number(sp?.dongia) * Number(sp?.soluong)

        })
        setTotal(tam);
    }, [sanpham])

    const tongsp = () => {
        let tong = 0;
        sanpham.forEach(sp => {
            tong += Number(sp?.soluong);
        })
        return tong
    }
    const sendEmail = (myMessage) => {
        var templateParams = {
            to_name: user.ho + ' ' + user.ten,
            from_name: 'MIAWATCH',
            message: myMessage,
            notes: 'Check this out!',
            email: user?.email
        };

        emailjs.send('service_c4h4x3s', 'template_iy1y5te', templateParams, 'user_eXT3mcACRHWvnrHkCZPaZ')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    const order = () => {
        if (thanhtoan == 0) {
            if (!checkout) {
                alert('B???n ch??a thanh to??n !!!')
                return
            }
        }

        const dh = {
            ten: userUpdate?.ten,
            ho: userUpdate?.ho,
            diachi: userUpdate?.diachi,
            email: userUpdate?.email,
            sdt: userUpdate?.sdt,
            donhang: sanpham
        }
        axios.post(process.env.REACT_APP_API + `donhang/${user.makh}?thanhtoan=${thanhtoan}`, dh)
            .then(res => {
                alert('?????t h??ng th??nh c??ng');
                const myMessage = myEmail
                sendEmail(myMessage);
                setSanpham([]);
                axios.get(process.env.REACT_APP_API + `giohang/${user.makh}`, header)
                    .then(response => setCart(response.data))
                    .catch(erro => console.log(erro))
            })
            .catch(err => alert('?????t h??ng th???t b???i'))
    }

    const isInList = (masp) => {
        return sanpham.some(sp => sp.masp === masp)
    }
    const myEmail =
        `<div>
                  <h4 className="text-secondary">Th??ng tin kh??ch h??ng</h4>
                    <hr/>
                        <table className="table table-borderless table-cart">
                            <tr>
                                <td>H??? T??N</td>
                                <td>${user.ho + ' ' + user.ten}</td>
                            </tr>
                            <tr>
                                <td>S??? ??I???N THO???I</td>
                                <td>${user.sdt}</td>
                            </tr>
                            <tr>
                                <td>EMAIL</td>
                                <td>${user.email}</td>
                            </tr>
                            <tr>
                                <td>?????A CH???</td>
                                <td>${user.diachi}</td>
                            </tr>
                        </table>
                    <hr/>
                  <h4>Danh s??ch ????n h??ng ??ang ch??? x??c nh???n</h4>
                  <table>
                  ${cart.map(c => {
            if (isInList(c.sanpham.masp))
                return `
                            <tr key={c.sanpham.masp}>
                                <td><img src=${c.sanpham.photo} alt="picture" style="width:100px;padding:5px 30px" /></td>
                                <td style="padding:5px 30px">${c.sanpham.tensp}</td>
                                <td style="padding:5px 30px">S??? l?????ng : ${c.sanpham.soluong}</td>
                                <td style="padding:5px 30px">${c.sanpham.dongia * c.soluong} $</td>
                            </tr>`
        }
        )}
                  </table>
                  <hr/>
              </div>`
    const paymentStatus = (status) => {
        setCheckout(status);
        alert('Thanh to??n th??nh c??ng')

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserUpdate({
            ...userUpdate,
            [name]: value
        })
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>

            <div className='container'>
                <div className='row'>

                    <div className='col-12'>
                        <h4 className="cart-header">DANH S??CH GI??? H??NG</h4>
                        <table className="table table-border table-cart">
                            {cart.map(c => (
                                <tr key={c.sanpham.masp}>
                                    <td onClick={() => deleteCart(c.sanpham.masp)} className="deleteCart">&#10005;</td>
                                    <td><img src={c.sanpham.photo} alt="picture" style={{ width: "70px", marginRight: "30px" }} /> {c.sanpham.tensp}</td>
                                    <td style={{ width: "15%" }}><input type="number" className="form-control" min="1" max={c.sanpham.soluong} defaultValue={c.soluong} onChange={(e) => changeNum(e, c.sanpham)} /></td>
                                    <td><p className="text-danger">{numberWithCommas(c.sanpham.dongia * c.soluong)} $</p></td>
                                    <td><input type="checkbox" className="form-check-input" defaultChecked onClick={(e) => checkSP(e, c.sanpham, c.soluong)} /></td>
                                </tr>
                            ))}
                        </table>
                        <div className="cart-hr"></div>
                        <div className="cart-total mt-4">
                            <p>T???ng s???n ph???m :</p>
                            <p>{tongsp()}</p>
                        </div>
                        <div className="cart-total text-success">
                            <h4>T???m t??nh :</h4>
                            <h4>{numberWithCommas(total)} $</h4>
                        </div>
                        {sanpham.length > 0 ? <button className="btn btn-success btn-lg mt-4 btn-order" data-toggle="modal" data-target="#exampleModal">?????t h??ng</button> : ''}
                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">TI???N H??NH ?????T H??NG</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">??</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-secondary">Th??ng tin kh??ch h??ng</p>
                                        <hr />
                                        <table className="table table-borderless table-cart">
                                            <tr>
                                                <td>H???</td>
                                                <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.ho} name="ho" onChange={handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>T??n</td>
                                                <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.ten} name="ten" onChange={handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>S??? ??I???N THO???I</td>
                                                <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.sdt} name="sdt" onChange={handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>EMAIL</td>
                                                <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.email} name="email" onChange={handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>?????A CH???</td>
                                                <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.diachi} name="diachi" onChange={handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>GHI CH??</td>
                                                <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue='' name="ghichu" /></td>
                                            </tr>
                                        </table>
                                        <hr />
                                        <p className="text-secondary">Danh s??ch s???n ph???m</p>
                                        <hr />
                                        <table className="table table-borderless table-cart">
                                            {cart.map(c => {
                                                if (isInList(c.sanpham.masp))
                                                    return (
                                                        <tr key={c.sanpham.masp}>
                                                            <td><img src={c.sanpham.photo} alt="picture" style={{ width: "70px", marginRight: "30px" }} /> {c.sanpham.tensp}</td>
                                                            <td style={{ width: "15%" }}>S??? l?????ng : {c.soluong}</td>
                                                            <td className="text-danger">{numberWithCommas(c?.sanpham?.dongia * c?.soluong)} $</td>
                                                        </tr>)
                                            }
                                            )}
                                            <hr />
                                            <tr>
                                                <td colSpan="2" style={{ fontSize: "23px" }}>T???ng ti???n</td>
                                                <td style={{ fontSize: "23px" }}>{numberWithCommas(total)} $</td>
                                            </tr>
                                            <tr>
                                                <td>Thanh to??n</td>
                                                <td colSpan="2"><select className="custom-select my-1 mr-sm-2" onChange={(e) => setThanhtoan(e.target.value)}>
                                                    <option value={1}>Ti???n m???t</option>
                                                    <option value={0}>Online </option>
                                                </select></td>
                                            </tr>
                                            {thanhtoan == 0 ? <tr>
                                                <PayPal paymentStatus={paymentStatus} price={total}></PayPal>
                                            </tr> : ''}
                                        </table>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Tho??t</button>
                                        <button type="button" className="btn btn-primary" onClick={order} data-dismiss="modal">X??c nh???n</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}