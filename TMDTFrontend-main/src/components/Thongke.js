import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Bar } from "react-chartjs-2";
export default function Thongke() {
    const [tk,setTK] = useState([])
    const [data,setData] = useState();
    //const [options,setOptions] = useState();
    const header = {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('jwt') //the token is a variable which holds the token
          }
    }
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'thongke/',header)
        .then(res => setTK(res.data))
        .catch(err => console.log(err))
    },[])
    useEffect(()=>{
        const labels = tk.map(t =>{
            return t.thang
        })
        //
        const soluong = tk.map(t =>{
            return t.doanhthu
        })
        const myData = {
            labels:labels,
            datasets:[{
                label:"Doanh thu",
                backgroundColor: [
                    "#c45850",
                    "#e8c3b9",
                    "#3e95cd",
                    "#8e5ea2",
                    "#53a77c",
                    "#e0b335"
                   
                    
                    
                ],
                data:soluong
            }]
        }
        setData(myData)


        
    },[tk])
    const options={
        legend: { display: false },
        title: {
          display: true,
          text: "Thống kê "
        }
      }
    return (
        <div style={{width:'70%',marginTop:'8vh',marginLeft:'10vh'}}>
            <h4 className='mb-4' style={{textAlign: "center"}}>DOANH THU 6 THÁNG GẦN NHẤT</h4>
            <Bar data={data} options = {options}/>
        </div>
    )
}