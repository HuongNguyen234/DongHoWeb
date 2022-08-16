import React,{useState} from 'react'
import axios from 'axios'
import {useHistory,Link} from 'react-router-dom'
import './Login.css'
function Login(){
    let history =useHistory();
    const myStorage = window.localStorage;
    const [login,setLogin] = useState({})
    const alterInput = (e)=>{
        const {value,name} = e.target;
        setLogin({
            ...login,
            [name]:value
        })
        //console.log(login)
    }
    const handleSubmit = ()=>{
        axios.post(process.env.REACT_APP_API +'login',login)
        .then(response => {
            console.log(response.data)
            myStorage.setItem('username',login.username)
            let quyen = response.data.quyen.maquyen;
            myStorage.setItem('quyen',quyen)
            if(quyen == 1)
                history.push('/admin/index')
            else if(quyen == 2)
                history.push('/')
            else if(quyen == 3)
            history.push('/admin/index')
            
        })
        .catch(erro => alert('login thất bại !!!'))
    }
    return(
        <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-4'>               
                        <Detail_Portfolio />
                        <Detail_Portfolio />
                    </div> */}
                    <div className='col-12 login-main'>     

                        <div className="login_container">
                                <div className="login-ct">

                                <div className="col-md-6 m-auto">
                                <form>
                                    <h3 className="title-form">ĐĂNG NHẬP</h3>
                                    <div className="form-group">
                                    <label htmlFor="username" style={{color:'tomato',fontSize:'25px'}}>TÀI KHOẢN</label>
                                    <input type="email" name="username" className="form-control" id="username" aria-describedby="emailHelp" onChange={alterInput} placeholder="Nhập tài khoản" />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="password" style={{color:'tomato',fontSize:'25px'}}>MẬT KHẨU</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={alterInput} placeholder="Nhập mật khẩu" />
                                    </div>
                                    <a href ="/register">Tạo tài khoản</a>
                                    <button onClick={handleSubmit} type="submit" className="btn btn-primary float-right">
                                    Đăng nhập
                                    </button>
                                </form>
                                </div>
                            </div>

                                </div>
                            
                        </div>
                </div>
            </div>
    )
}
export default Login