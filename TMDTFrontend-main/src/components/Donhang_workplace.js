import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SanphamWorkplace.css'
import { useForm } from "react-hook-form";
function Donhang_workplace
  ({ slide, user }) {
  const [on, setOn] = useState(false)
  const [donhang, setDonhang] = useState([]);
  const [trangthai, setTrangthai] = useState(4)
  const { register, handleSubmit, setValue } = useForm();
  const [nhanvien, setNhanvien] = useState([]);
  const [nvgh, setNvgh] = useState(null);
  const [changett, setChangett] = useState(4)
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + 'donhang/')
      .then(response => {
        let myData = response.data;
        if (trangthai != 4) {
          myData = myData.map(dh => {
            if (dh?.trangthai == trangthai)
              return dh;
          })
        }
        setDonhang(myData)
      })
      .catch(erro => console.log(erro))

    axios.get(process.env.REACT_APP_API + 'nhanvien')
      .then(response => {
        setNhanvien(response.data)
        setNvgh(response.data[0])
      })
      .catch(erro => console.log(erro))
  }, [])
  const getDeleteDH = (madh) => {
    let agree = window.confirm(`Bạn có muốn xóa madh = ${madh}?`);
    if (!agree)
      return
    axios.delete(process.env.REACT_APP_API + 'donhang/' + madh)
      .then(response => {

        axios.get(process.env.REACT_APP_API + 'donhang/')
          .then(response => {
            setDonhang(response.data)
            alert("Xóa thành công !!!")
          })
          .catch(erro => alert('Xóa thất bại !!!'))

      })
      .catch(erro => console.log(erro))
  }

  const changeTT = (e, dh) => {
    const { value } = e.target
    setChangett(value);

  }

  const handleChange = (tt) => {
    setTrangthai(tt);
    for (let i = 0; i <= 4; i++) {
      let element = document.getElementById(i);
      if (i == tt) {
        element.classList.add('active');
      }
      else {
        element.classList.remove('active');
      }
    }

    axios.get(process.env.REACT_APP_API + 'donhang/')
      .then(response => {
        let myData = response.data;
        if (tt != 4) {
          const list = myData.filter(dh => {
            if (dh?.trangthai == tt)
              return { ...dh };

          })
          setDonhang(list)
          return
        }
        setDonhang(myData)
      })
      .catch(erro => console.log(erro))
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const savenvgh = (dh) => {
    dh.giaohang = nvgh
    dh.nhanvien = user
    dh.trangthai = 1
    axios.put(process.env.REACT_APP_API + 'donhang/', dh)
      .then(res =>
        axios.get(process.env.REACT_APP_API + 'donhang/')
          .then(response => setDonhang(response.data))
          .catch(erro => console.log(erro))
      )
      .catch(err => console.log(err))
      setNvgh(nhanvien[0])
  }

  const savett = (dh) => {
    if(changett){
      dh.trangthai = changett
      axios.put(process.env.REACT_APP_API + 'donhang/', dh)
        .then(res =>
          axios.get(process.env.REACT_APP_API + 'donhang/')
            .then(response => setDonhang(response.data))
            .catch(erro => console.log(erro))
        )
        .catch(err => console.log(err))
    }
  }

  const changeNV = (e) => {
    const { value } = e.target
    axios.get(process.env.REACT_APP_API + 'manhanvien/' + value)
      .then(response => {
        setNvgh(response.data)
      })
      .catch(erro => console.log(erro))
    setChangett(1);
    console.log(value)
  }

  return (
    <div className={slide ? "workplace" : "on-off-workplace"}>
      <h3 className={!on ? "form-head" : "d-none"}></h3>
      <ul className={!on ? "form-func" : "d-none"}>
      </ul>
      <button className="btn btn-outline-primary active" id="4" onClick={() => handleChange(4)}>Tất cả</button>
      <button className="btn btn-outline-primary" id="0" onClick={() => handleChange(0)} >Chưa xác nhận</button>
      <button className="btn btn-outline-primary" id="1" onClick={() => handleChange(1)}>Đã phân công NVGH </button>
      <button className="btn btn-outline-primary" id="2" onClick={() => handleChange(2)}>Đã hoàn tất</button>
      <button className="btn btn-outline-primary" id="3" onClick={() => handleChange(3)}>Đã hủy</button>
      <div className={!on ? "workplace_display" : "d-none"} >
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead">
            <tr>
              <th className="title-product">Mã đơn hàng</th>
              <th className="title-product">Tổng tiền</th>
              <th className="title-product">Ngày đặt</th>
              <th className="title-product">Trạng thái</th>
              <th className="title-product">Thanh toán</th>
              <th className="title-product">Nhân viên duyệt</th>
              <th className="title-product">Nhân viên giao hàng</th>
              <th className="title-product">Mã khách hàng</th>
              <th className="title-product">Tên khách hàng</th>
              <th className="title-product">Chi tiết đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {donhang.map(dh => {
              let tt = ''; let tn = "";
              if (dh?.trangthai == 3)
                tn = 'Đã Hủy'
              else if (dh?.trangthai == 2)
                tn = 'Đã hoàn tất'
              else if (dh?.trangthai == 1)
                tt = 'Đã phân công...'
              else if (dh?.trangthai == 0)
                tt = 'Chưa xác nhận'
              return (
                <tr key={dh?.madh}>
                  <td>{dh?.madh}</td>
                  <td>{numberWithCommas(dh?.tongtien) + '$'}</td>
                  <td>{dh?.ngaydat}</td>
                  <td>
                    {tn == '' ? <div className="btn btn-info btn-trangthai" data-toggle="modal" data-target={"#PC" + dh?.madh}>{tt}</div>
                      : <p className='text-secondary' style={{ fontSize: 13, fontStyle: 'italic' }}>{tn}</p>}
                  </td>
                  <td>{dh?.hinhthucthanhtoan == 1 ? 'Tiền mặt' : 'Paypal'}</td>

                  <td>{dh?.nhanvien ? dh?.nhanvien?.ho + ' ' + dh?.nhanvien?.ten : ''}</td>
                  <td>{dh?.giaohang ? dh?.giaohang?.ho + ' ' + dh?.giaohang?.ten : ''}</td>
                  <td>{dh?.khachhang?.makh}</td>
                  <td>{dh?.khachhang?.ho + ' ' + dh?.khachhang?.ten}</td>
                  <td>
                    <p style={{ cursor: 'pointer' }} className="text-info" data-toggle="modal" data-target={'#' + dh?.madh}>
                      Xem sản phẩm
                    </p>
                    <div className="modal fade" id={dh?.madh} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                          <div className="modal-header text-white">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ margin: 'auto', textAlign: 'center' }}>Chi tiết đơn hàng {dh?.madh}</h5>
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
                                  {dh?.listCTDH?.map(ct => (
                                    <tr key={ct?.sanpham?.masp}>
                                      <td>{ct?.sanpham?.masp}</td>
                                      <td>{ct?.sanpham?.tensp}</td>
                                      <td><img alt="pc" src={ct?.sanpham?.photo} style={{ width: 70 }} /></td>
                                      <td>{ct?.soluong}</td>
                                      <td>{numberWithCommas(ct?.gia) + '$'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>


                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" >Thoát</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal fade" id={"PC" + dh?.madh} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        {dh?.trangthai == 0 ?
                          <div className="modal-content">
                            <div className="modal-header text-white">
                              <h5 className="modal-title" id="exampleModalLabel" style={{ margin: 'auto', textAlign: 'center' }}>Phân công nhân viên giao hàng</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="table-responsive">

                                <div className="col-12">
                                  <label>Mã đơn hàng</label>
                                  <input className="form-control input-modal" value={dh?.madh} ref={register} name='madm' readOnly />
                                  <label className="label-modal">Nhân viên giao hàng</label>
                                  <select className="custom-sl" defaultValue={nvgh?.manv} onChange={(e) => changeNV(e)}>
                                    {nhanvien?.map(nv => (
                                      <option value={nv.manv} >{nv?.ho + ' ' + nv?.ten}</option>
                                    ))}
                                  </select>
                                </div>

                              </div>


                            </div>
                            <div className="modal-footer">
                              <button type="button" class="btn btn-primary" data-dismiss="modal" data-dismiss="modal" onClick={() => savenvgh(dh)}>Lưu</button>
                              <button type="button" className="btn btn-danger" data-dismiss="modal" >Thoát</button>
                            </div>
                          </div>
                          : <div className="modal-content">
                            <div className="modal-header text-white">
                              <h5 className="modal-title" id="exampleModalLabel" style={{ margin: 'auto', textAlign: 'center' }}>Thay đổi trạng thái đơn hàng</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="table-responsive">

                                <div className="col-12">
                                  <label>Mã đơn hàng</label>
                                  <input className="form-control input-modal" value={dh?.madh} ref={register} name='madm' readOnly />
                                  <label className="label-modal">Trạng thái</label>
                                  <select className="custom-sl" defaultValue={dh?.trangthai} onChange={(e) => changeTT(e, dh)}>
                                    {dh.trangthai == 0 || dh.trangthai == 1 ? <option value={1}>Đã phân công</option> : ''}
                                    {dh.trangthai == 1 || dh.trangthai == 2 ? <option value={2}>Đã hoàn tất</option> : ''}
                                    <option value={3}>Đã Hủy</option>

                                  </select>
                                </div>

                              </div>


                            </div>
                            <div className="modal-footer">
                              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => savett(dh)}>Lưu</button>
                              <button type="button" className="btn btn-danger" data-dismiss="modal" >Thoát</button>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </td>

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
export default Donhang_workplace
