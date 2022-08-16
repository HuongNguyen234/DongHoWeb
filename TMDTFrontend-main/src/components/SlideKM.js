import React,{useEffect,useState} from 'react'
import Item from './Item'
import axios from 'axios'
import axiosClient from '../API/AxiosClient'
import {useParams} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/navigation/navigation.scss';
import './Item.css'


export default function SlideKM (){
    const [products,setProducts] = useState([])
    useEffect(async()=>{
      try {
        let data = await axiosClient.get('sanpham',null);
        const list = data.filter(dh=>{
          if(dh?.khuyenMai > 0)
          return {...dh};
        
        })
        setProducts(list)
      } catch (error) {
        console.log(error)
      }
      }
    ,[])
    
  return (
    <div className='my-carousel mt-4'>
            <h5 className='list-item__header'>SẢN PHẨM KHUYẾN MÃI</h5>
    
    <Swiper style={{paddingLeft:'12px', minHeight:'382px'}}
      spaceBetween={10}
      slidesPerView={5}
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
     
       
      <div className='row text-center' >
                {products.map(product=>{
                    return (
                      <SwiperSlide >
                        <div className='text-center'>
                            <Item product = {product} key={product.masp}/>
                        </div>
                        </SwiperSlide>
                    )
                })}
            </div>
    </Swiper>
    </div>
  )
}