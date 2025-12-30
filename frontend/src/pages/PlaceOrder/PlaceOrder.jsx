import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'


const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}) )
  }
 
 const placeholder = async(event)=>{
  event.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItem[item._id];
      orderItems.push(itemInfo);

    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
  }
  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if(response.data.success){
    const {session_url} = response.data;
    window .location.replace(session_url);
  }
  else{
    alert("error");
  }
 }
 
//  const navigate = useNavigate();

//   useEffect(()=>{
//     if(!token){
//       navigate('/cart')
//     }else if(getTotalCartAmount()===0){
//        navigate('/cart')
//     }
//   },[token])


  return (
   <form onSubmit={placeholder} className='place-order'>
    <div className='place-order-left'>
      <p className='title'>Delivery-Information</p>
        <div className='multi-fields'>
          <input  required name='firstName' onChange={onChangeHandler} value={data.fisrtName} type='text' placeholder='First Name'></input>
           <input  required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name'></input>
        </div>
           <input type='email' placeholder='Email address'></input>
           <input type='text' placeholder='Street'></input>
       <div className='multi-fields'>
          <input  required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'></input>
           <input  required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'></input>
        </div>
         <div className='multi-fields'>
          <input  required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code'></input>
           <input  required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'></input>
        </div>
         <input  required  name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'></input>
    </div>
    <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
             <div className='cart-total-details'>
              <p> Subtotal</p>
              <p> ₹ {getTotalCartAmount()} </p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()==0? 0: 20} </p>
            </div>
            <div className='cart-total-details'>
             <b>Total</b>
             <b>₹{getTotalCartAmount()==0?0:getTotalCartAmount()+20} </b>
            </div>
          </div>
          <button type='submit' >PROCEED TO Payment </button>

        </div>
    </div>
   </form>
  )
}

export default PlaceOrder
