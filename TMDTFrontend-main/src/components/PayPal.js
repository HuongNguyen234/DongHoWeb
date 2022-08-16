import React,{useRef,useEffect} from 'react'

export default function Paypal(props) {
    const paypal = useRef()

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder:(data,actions,err)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                            description:"MIA",
                            amount:{
                                currency_code:"USD",
                                value: Number(props.price)
                            }
                        }
                    ]
                })
            },
            onApprove:async (data,actions)=>{
                const order = await actions.order.capture()
                props.paymentStatus(true);
            },
            onError: (err)=>{
                props.paymentStatus(false);
            }
        }).render(paypal.current)
    },[])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}