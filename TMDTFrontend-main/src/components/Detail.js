import React from 'react'
import Detail_Product from './Detail_Product'
import './Detail.css'
export default function Detail(){
    return(
        <div>
            <div className='banner'>
                <h3>CHI TIẾT SẢN PHẨM</h3>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-4'>               
                        
                    </div>
                    <div className='col-12'>               
                        <Detail_Product />
                    </div>
                </div>
            </div>
        </div>
    )
}