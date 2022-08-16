import React, { useEffect, useState } from 'react'
import Item from './Item'
import './ItemList.css'
import axiosClient from '../API/AxiosClient'
import { useParams } from 'react-router-dom'

export default function Search() {
  const [products, setProducts] = useState([])
  const { madm } = useParams();
  const { hang } = useParams();
  let myStorage = window.localStorage;
  let search = myStorage.getItem('search')
  useEffect(async () => {
    if (!madm && !hang) {
      try {
        const data = await axiosClient.get('sanpham', null);
        setProducts(data);
      } catch (error) {
        console.log(error)
      }
    }
  }
    , [])

  useEffect(async () => {
    if (madm) {
      try {
        const data = await axiosClient.get('sanpham/danhmuc/' + madm, null);
        setProducts(data);
      } catch (error) {
        console.log(error)
      }
    }
  }
    , [madm])

  useEffect(async () => {
    if (hang) {
      try {
        const data = await axiosClient.get('sanpham/hang/' + hang, null);
        setProducts(data);
      } catch (error) {
        console.log(error)
      }
    }
  }
    , [hang])

  return (
    <div className='my-carousel mt-4'>
      <h5 className=''>Kết quả tìm kiếm {search}</h5>
      <div className='row text-center'>
        {products.map(sp => {
          if (sp.tensp.toLowerCase().includes(search.toLowerCase()) || sp.loai.toLowerCase().includes(search.toLowerCase()) || sp.hang.toLowerCase().includes(search.toLowerCase()))
            return (
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                <Item product={sp} key={sp.masp} />
              </div>
            )
        })}
      </div>

    </div>
  )
}