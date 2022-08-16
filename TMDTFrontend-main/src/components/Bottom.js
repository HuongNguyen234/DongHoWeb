import React from 'react'
import './Bottom.css'
export default function Bottom(){
    return (
        <div className='bottom'>
            <div className='container '>
                <div className='row text-center '>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <img src="https://firebasestorage.googleapis.com/v0/b/hongquan-c16c6.appspot.com/o/quoc%2Fthi-truong-dong-ho-viet-nam-thumbnail-1-scaled.jpg?alt=media&token=e128b20f-09fc-4e2c-99a7-8533669f5435" alt='pictur' className="rounded" style={{width:'100%'}}></img>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left'>
                        <h4>LIÊN HỆ</h4>
                        <p className="contact-1">mia.watch@gmail.com</p>
                        <p className="contact-1">18008271</p>
                        <p className="contact-1">97 Man Thiện Q.9 TPHCM</p>

                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left'>
                        <h4>TRỢ GIÚP NHANH</h4>
                        <p className='section'>Hướng dẫn thanh toán</p>
                        <p className='section'>Liên hệ công ty</p>
                        <div className='contact'>
                           
                        </div>
                        <p className='section'>Chính sách bảo mật thông tin</p>
                        
                    </div> 
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left'>
                        <h4>CHÍNH SÁCH BÁN HÀNG</h4>
                        <p className='section'>Chính sách và quy định chung</p>
                        <p className='section'>Chính sách trả hàng</p>
                        <p className='section'>Chính sách bảo mật thông tin</p>
                    </div>
                    
                </div>
            </div>
            <footer className='text-center mt-4'>
                <span className="copyright"> &copy; Đồng hồ chính hãng</span>
                <div>CÔNG TY TNHH MIA WATCH 
                </div>
            </footer>
        </div>
    )
}