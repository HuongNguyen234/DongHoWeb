import React from 'react'
import ReactStars from "react-rating-stars-component";
const RateChart = (props)=>{
    return (
        <div style={{marginTop:50, marginBottom:30}}>
            <h5>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h5>
            <div className="d-flex">
                <div className="flex-grow-1">
                    <div className="row align-items-center">
                    <div className="col-12 mb-2">
                        <h6>Số lượng đánh giá : {props.soluong}</h6>
                    </div>
                    <div className="col-1 text-left" style={{fontSize:16}}>
                        5 <span style={{fontSize:11}}><i className="fa fa-star fa-xs" aria-hidden="true" style={{color:"#ffd700"}}></i></span>
                    </div>
                    <div className="col-11">
                        <div className="progress" style={{height:4}}>
                            
                          <div className="progress-bar bg-info" role="progressbar" style={{width: props.five+'%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        
                    </div>

                    <div className="col-1 text-left" style={{fontSize:16}}>
                        4 <span style={{fontSize:11}}><i className="fa fa-star fa-xs" aria-hidden="true" style={{color:"#ffd700"}}></i></span>
                    </div>
                    <div className="col-11">
                        <div className="progress" style={{height:4}}>
                            
                          <div className="progress-bar bg-info" role="progressbar" style={{width: props.four+'%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        
                    </div>


                    <div className="col-1 text-left" style={{fontSize:16}}>
                        3 <span style={{fontSize:11}}><i className="fa fa-star fa-xs" aria-hidden="true" style={{color:"#ffd700"}}></i></span>
                    </div>
                    <div className="col-11">
                        <div className="progress" style={{height:4}}>
                            
                          <div className="progress-bar bg-info" role="progressbar" style={{width: props.three+'%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        
                    </div>



                    <div className="col-1 text-left" style={{fontSize:16}}>
                        2 <span style={{fontSize:11}}><i className="fa fa-star fa-xs" aria-hidden="true" style={{color:"#ffd700"}}></i></span>
                    </div>
                    <div className="col-11">
                        <div className="progress" style={{height:4}}>
                            
                          <div className="progress-bar bg-info" role="progressbar" style={{width: props.two+'%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        
                    </div>

                    <div className="col-1 text-left" style={{fontSize:16}}>
                        1 <span style={{fontSize:11}}><i className="fa fa-star fa-xs" aria-hidden="true" style={{color:"#ffd700"}}></i></span>
                    </div>
                    <div className="col-11">
                        <div className="progress" style={{height:4}}>
                            
                          <div className="progress-bar bg-info" role="progressbar" style={{width: props.one+'%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateChart