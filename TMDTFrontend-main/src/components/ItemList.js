import React,{useEffect,useState} from 'react'
import Item from './Item'
import './ItemList.css'
import axiosClient from '../API/AxiosClient'
import {useParams} from 'react-router-dom'

export default function ItemList (){
    const [products,setProducts] = useState([])
    const {madm} = useParams();
    const {hang} = useParams();
    useEffect(async()=>{
        if(!madm && !hang){
          try {
            const data = await axiosClient.get('sanpham',null);
            setProducts(data);
          } catch (error) {
            console.log(error)
          }
        }
      }
    ,[]) 

    useEffect(async()=>{
      if(madm){
        try {
          const data = await axiosClient.get('sanpham/danhmuc/'+madm,null);
          setProducts(data);
        } catch (error) {
          console.log(error)
        }
      }
    }
  ,[madm]) 

  useEffect(async()=>{
    if(hang){
      try {
        const data = await axiosClient.get('sanpham/hang/'+hang,null);
        setProducts(data);
      } catch (error) {
        console.log(error)
      }
    }
  }
,[hang]) 

    return (
        <div className='my-carousel mt-4'>
            <h5 className='list-item__header'>DANH SÁCH SẢN PHẨM</h5>
            <div className='row text-center'>
                {products.map(product=>{
                    return (
                        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                            <Item product = {product} key={product.masp}/>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}