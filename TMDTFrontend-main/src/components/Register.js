import React,{useState,useEffect,useContext} from 'react'
import firebase,{auth} from '../firebase'
import axios from 'axios'
const Register = ()=>{
    const [input,setInput] = useState({})
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.get(process.env.REACT_APP_API+'IsUserExits/'+ input.username)
        .then(response => {alert('Đã tồn tại username này !!!'); return})
        .catch(erro => {
            sendEmail()
            })
    
    }
    const sendEmail=()=>{
        let secretKey = Math.floor(Math.random() * 100000) + 1 //
        var actionCodeSettings = {
               
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: 'http://localhost:3000/activate/',
                // This must be true.
                handleCodeInApp: true
              };
              firebase.auth().sendSignInLinkToEmail(input.email, actionCodeSettings)
                .then(() => {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('register',JSON.stringify(input));
                    // ...
                    alert('Vào email để xác thực tài khoản')
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.log(`${errorCode} : ${errorMessage}`)
                });
    }
    const changeInput = (e)=>{

        const {name,value} = e.target;
        setInput({
            ...input,
            [name]:value
        })
    }
    return (
        <div className="container mt-4">
            <h3 className="title-form">ĐĂNG KÝ</h3>
            <div className="card" style={{width: '100%'}}>
              <div className="card-body">
              
                <form onSubmit={handleSubmit}>
                    
                    <div className="row">
                        <div className="col-6">
                            <p>HỌ</p>
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập vào họ của bạn" name="ho" onChange={changeInput} />
                            <p>TÊN</p>
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập vào tên của bạn" name="ten" onChange={changeInput} />
                            <p>GIỚI TÍNH</p>
                            <select className="custom-select my-1 mr-sm-2" name="gioitinh" onChange={changeInput}>
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                            </select>
                            <p>SỐ ĐIỆN THOẠI</p>
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập số thoại thoại" name="sdt" onChange={changeInput}/>
                            <button type="submit" className="btn btn-outline-success mr-4">ĐĂNG KÝ</button>
                            <button type="reset" className="btn btn-warning">LÀM MỚI</button>
                        </div>
                        <div className="col-6">
                        <p>EMAIL</p>
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập vào email" name="email" onChange={changeInput}/>
                            <p>TÀI KHOẢN</p>
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập vào tài khoản" name="username" onChange={changeInput}/>
                            <p>MẬT KHẨU</p>
                            <input type="password" className="form-control mb-2 mr-sm-2" placeholder="Nhập vào mật khẩu" name="password" onChange={changeInput}/>
                            <p>ĐỊA CHỈ</p>
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập vào địa chỉ" name="diachi" onChange={changeInput}/>
                            <div id="recaptcha-container" className="mt-4 mb-4"></div>
                            
                        </div>
                    </div>
                   
                </form>
              </div>
            </div>
        </div>
    )
};

export default Register