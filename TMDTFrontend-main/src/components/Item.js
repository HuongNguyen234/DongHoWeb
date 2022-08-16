import React,{useState,useEffect} from 'react'
import './Item.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import axios from 'axios'
export default function Item ({product}){
  let history = useHistory();
  let myStorage = window.localStorage;
  const [user,setUser] = useState({})
  let username = myStorage.getItem('username')

  useEffect(()=>{
    if(username)
    axios.get(process.env.REACT_APP_API +'khachhang/'+username)
    .then(response => setUser(response.data))
  },[])
  const addCart = (masp)=>{
    if(username == null){
      history.push('/login');
    }
    else{
      axios.post(process.env.REACT_APP_API+`giohang/${user.makh}/${masp}?soluong=1`,{})
    .then(Response => alert('Thêm thành công !!!'))
    .catch(error => {alert('Thêm thất bại ' + error);console.log(error)})
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const gia = (giakm, dongia)=>{
  let elmLevel = <div class="price-item">
  <p class="content__suggest-description price-origin">{numberWithCommas(Number(dongia))} $</p>
  <p class="content__suggest-description text-danger">{numberWithCommas(Number(giakm))} $</p>
  </div>;
  if(giakm <= 0){
    elmLevel = <div class="price-item">
      <p class="content__suggest-description text-danger">{numberWithCommas(Number(dongia))} $</p>
      </div>;
  }
  return elmLevel;
}

    return (
          <div className='myItem' style={{width:'95%'}}>
            <div>
              <div onClick={()=> window.location.href="/product/"+product.masp}>
                <div className="image"><img className="card-img-top" style={{width:'100%',height:'200px'}} src={product.photo} alt="profile"/></div>
                <div className="mt-4">
                  <h5 className="product-name">{product.tensp}</h5>
                  {gia(product.khuyenMai, product.dongia)}
                </div>
              </div>
              <button className='btn btn-info btn-add-cart' onClick={()=>addCart(product.masp)}>THÊM GIỎ HÀNG</button>
            </div>
            
        </div>
    )
}