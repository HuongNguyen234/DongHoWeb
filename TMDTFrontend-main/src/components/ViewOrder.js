import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ViewOrder.css'
import { useHistory } from 'react-router-dom'

const ViewOrder = () => {

  const [user, setUser] = useState(null);
  const [donhang, setDonhang] = useState([])
  const myStore = window.localStorage;
  const jwt = myStore.getItem('jwt')
  const [find, setFind] = useState('');
  const history = useHistory()
  const [on, setOn] = useState(false)
  const username = myStore.getItem('username')
  useEffect(() => {
    if (username) {
      axios.get(process.env.REACT_APP_API + 'khachhang/' + username)
        .then(response => {

          setUser(response.data);
          axios.get(process.env.REACT_APP_API + 'donhang/' + response.data.makh)
            .then(res => setDonhang(res.data))
            .catch(err => console.log(err))
        })
        .catch(error => console.log(error))
    }
    else {
      history.push("/")
    }
  }, [])

  const getTinhtrang = (tt) => {
    if (tt === 4)
      return 'Đã hủy'
    else if (tt === 0)
      return 'Đang chờ xác nhận'
    else if (tt === 1)
      return 'Đã xác nhận'
    else if (tt === 2)
      return 'Hoàn tất'
    else if (tt === 3)
      return 'Đã hủy'
  }
  const huyDon = (madh) => {
    const kq = window.confirm('Bạn có chắc muốn hủy đơn hàng này')
    if (kq) {
      axios.put(process.env.REACT_APP_API + 'donhang/' + madh, null)
        .then(res => {
          alert('Hủy đơn hàng thành công !!!')
          axios.get(process.env.REACT_APP_API + 'donhang/' + user?.makh)
            .then(res => setDonhang(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => alert('Hủy đơn thất bại'))
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <div className="container-fluid view-container">
      <div className="card view-order">
        <div className="card-body">
          <div class="input-group mb-3" style={{ width: '80%', fontSize: 22 }}>
            DANH SÁCH ĐƠN HÀNG ĐÃ ĐẶT
          </div>

          {donhang?.map(dh => {
            if (dh?.madh.toLowerCase().includes(find.toLowerCase()))
              return (
                <div style={{ width: '100%', marginTop: 40 }}>
                  <div className="jumbotron" data-toggle="modal" data-target={'#'+dh?.madh} >
                    <h5 className="mb-2">Mã đơn hàng : {dh?.madh}</h5>
                    <h6>Ngày đặt : {dh?.ngaydat}</h6>
                    <h6>Tổng tiền : {numberWithCommas(dh?.tongtien)} $</h6>
                    <h6>Tình trạng đơn hàng : {getTinhtrang(dh?.trangthai)}</h6>
                    {dh?.hinhthucthanhtoan == 1 ? 'Đã thanh toán' :""}
                    {/* {dh?.trangthai==0?<p className="text-danger mt-3" onClick={()=>huyDon(dh?.madh)} style={{cursor:'pointer'}}>Hủy đơn hàng</p>:''} */}
                  </div>
                  {/* modal */}
                  <div className="modal fade" id={dh?.madh} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                      <div className="modal-content">
                        <div className="modal-header text-white">
                          <h5 className="modal-title" id="exampleModalLabel">THÔNG TIN CHI TIẾT ĐƠN HÀNG {dh?.madh}</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <div className="row">
                            <div className=" col-6">
                              <table className="table table-borderless table-font mt-4">
                                {dh?.listCTDH?.map(ct => (
                                  <tbody>
                                    <tr>
                                      <td style={{ color: '#868688' }}>Mã sản phẩm</td>
                                      <td>{ct?.sanpham?.masp}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ color: '#868688' }}>Tên sản phẩm</td>
                                      <td>{ct?.sanpham?.tensp}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ color: '#868688' }}>Số lượng</td>
                                      <td>{ct?.soluong}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ color: '#868688' }}>Giá</td>
                                      <td>{numberWithCommas(ct?.gia)} $</td>
                                    </tr>
                                    <tr>
                                      <td style={{ color: '#868688' }}>Hình ảnh</td>
                                      <td ><img src={ct.sanpham?.photo} alt="pt" style={{ width: 150 }} /></td>
                                    </tr>
                                  </tbody>
                                ))}
                              </table>


                            </div>
                          </div>

                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-dismiss="modal" >Thoát</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}
export default ViewOrder