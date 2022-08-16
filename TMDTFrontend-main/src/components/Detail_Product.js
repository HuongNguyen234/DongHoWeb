
import './Detail_Product.css'
import ReactStars from "react-rating-stars-component";
import RateChart from './RateChart'
import React,{useState,useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
import axios from 'axios'
function Detail_Product(){
    let history = useHistory();
    let {masp} = useParams();
    const [danhgia,setDanhgia] = useState(false)
    const [rate,setRate] = useState()
    const [dgUser,setDgUser] = useState(0);
    const [sl,setSl] = useState(1);
    const [sanpham,setSanpham] =useState();
    const [user,setUser] = useState({})
    const [cart,setCart] = useState([])
    const username = window.localStorage.getItem('username')
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'sanpham/'+masp)
        .then(response => setSanpham(response.data) )
        .catch(erro => console.log(erro))

        if(username!=null){
            axios.get(process.env.REACT_APP_API +'khachhang/'+username)
            .then(response => {
                setUser(response.data )
                axios.get(process.env.REACT_APP_API+`giohang/${response.data.makh}`)
                .then(res => setCart(res.data))
                .catch(er=> console.log(er))

                axios.get(process.env.REACT_APP_API +'ctdh/'+response.data.makh+'/'+masp)
                .then(res => setDanhgia(res.data))
                .catch(err => console.log(err))

                

                axios.get(process.env.REACT_APP_API +'danhgia/'+ response.data.makh +'/'+masp)
                .then(res => setDgUser(res.data))
                .catch(err => console.log(err))
            })
            .catch(error => console.log(error))
        }
        axios.get(process.env.REACT_APP_API +'danhgia/'+masp)
                .then(res => setRate(res.data))
                .catch(err => console.log(err))

    },[])
    const getMaxSL = (masp)=>{
        let sl = 0;
        cart.forEach(c=>{
            if(c.sanpham?.masp === masp){
                sl = c.soluong;
            }
        })
        return sl;
    }
    const ratingChanged = (newRating) => {
        const data ={
            id:{
                masp:masp,
                makh:user?.makh
            },
            khachhang:{
                makh:user?.makh
            },
            sanpham:{
                masp:masp
            },
            danhgia:newRating
        }
        axios.post(process.env.REACT_APP_API+`danhgia/`,data)
        .then(res => {
            axios.get(process.env.REACT_APP_API +'danhgia/'+masp)
            .then(res => setRate(res.data))
            .catch(err => console.log(err))
        })
        .catch(err =>console.log(err))

  };
    const addCart = (masp)=>{
        console.log(masp + sl)
        if(username == null){
        history.push('/login');
        }
        else{
        axios.post(process.env.REACT_APP_API+`giohang/${user.makh}/${masp}?soluong=${sl}`,{})
        .then(Response => alert('Thêm thành công !!!'))
        .catch(error => {alert('Thêm thất bại ' + error);console.log(error)})
        }
    }

    const img_detail  = (photo)=> {
        if(photo){
            return <div className="img-detail-product">
                    <div><img src={sanpham?.photo1} alt="Sanpham" style={{width:"90%"}}/></div>
                    <div><img src={sanpham?.photo2} alt="Sanpham" style={{width:"90%"}}/></div>
                </div>
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const gia = (giakm, dongia)=>{
        let elmLevel = <div class="price-item">
        <p class="content__suggest-description price-origin price-detail">{numberWithCommas(Number(dongia))} $       </p>
        <p class="content__suggest-description text-danger price-detail">{numberWithCommas(Number(giakm))} $</p>
        </div>;
        if(giakm <= 0){
          elmLevel = <div class="price-item">
            <p class="content__suggest-description text-danger price-detail">{numberWithCommas(Number(dongia))} $</p>
            </div>;
        }
        return elmLevel;
    }
    return (
        
        <div className="row detail_product">
            <div className="col-7">
                <img src={sanpham?.photo} alt="Sanpham" style={{width:"75%", height:'50%', paddingBottom:'15px'}}/>
                {img_detail(sanpham?.photo1)}
                {danhgia?
                    <div style={{marginTop:'40px'}}>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={20}
                            value={dgUser}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        
                    </div>    :''
                  }
            </div>
            <div className="col-5">
                <h3>{sanpham?.tensp}</h3>
                <div className="row">
                 {gia(sanpham?.khuyenMai, sanpham?.dongia)}
                </div>
                <div className="row">
                    <div className="col-1">
                        <p>Hãng: </p>
                    </div>
                    <div className="col-6 text-center">
                        <p>{sanpham?.hang}</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <p>Loại đồng hồ: {sanpham?.loai}</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <p>Mô chi tiết</p>
                    </div>
                    <div className="col-12 text-left">
                        <p>{sanpham?.mota_chitiet}</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-7">
                        <input type="number" onChange={(e)=>setSl(e.target.value)} className="form-control" min="1" defaultValue="1" max={sanpham?.soluong - getMaxSL(sanpham?.masp)} disabled={sanpham?.soluong == 0 || (sanpham?.soluong - getMaxSL(sanpham?.masp))<=0} />
                    </div>
                    <div className="col-5   ">
                        <button className="btn btn-outline-warning" onClick={()=>addCart(sanpham.masp)}>THÊM GIỎ HÀNG</button>
                    </div>
                </div>
                
            </div>
            <div className='col-12'>
                    <RateChart 
                            key={masp}
                            five = {rate?.five}
                            one = {rate?.one}
                            two = {rate?.two}
                            three = {rate?.three}
                            four = {rate?.four}
                            
                            soluong = {rate?.soluong}
                        />
            </div>
            <div className="row">
            <div className="col-12 mb-4 mt-4">
                <h5>   Bình luận khách hàng</h5>
                <div class="fb-comments" data-href={"https://localhost:8080/"+masp} data-width="" data-numposts="5"></div>
            </div>
            {/* <div className="col-2 mt-4">
                <img src={quan} alt="picture" style={{width:"90%"}} className="rounded-circle"/>
            </div>
            <div className="col-10 mt-4">
                <textarea className="form-control" rows="4" placeholder="Để lại bình luận của bạn !!!"></textarea>
            </div> */}
        </div>
         </div>
    )
}

export default Detail_Product;