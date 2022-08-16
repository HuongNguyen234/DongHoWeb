import Slider from 'react-material-ui-carousel'
import React from 'react'
import './Carousel.css'
function Carousel(){
    return (
        <div className='container-fluid mt-4 my-carousel'>
            <Slider>
                <div className='slide-item'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/hongquan-c16c6.appspot.com/o/quoc%2Fsummer_2021_slide_1.jpg?alt=media&token=2d09ddd8-9a05-44e2-891c-9178c0ca0695" style={{width:'100%'}}/>
                </div>
                <div  className='slide-item' >
                    <img src="https://firebasestorage.googleapis.com/v0/b/hongquan-c16c6.appspot.com/o/quoc%2Fsummer_2021_slide_2.jpg?alt=media&token=31abd10b-d28e-4854-8e12-3044f5c6ae44" style={{width:'100%'}} />
                </div>
                {/* <div  className='slide-item'>
                    <img src="https://kfcvietnam.com.vn/uploads/banner/2ec32651d4cffd624c986cd801691dd4.png" style={{width:'100%'}}/>
                </div> */}
            </Slider>
        </div>
    )
}
export default Carousel