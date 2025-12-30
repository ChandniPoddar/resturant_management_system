import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Scroll to top when Cart page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate totals safely
  const totalAmount = Object.keys(cartItems).reduce((sum, itemId) => {
    const quantity = cartItems[itemId] || 0;
    const itemInfo = food_list.find(f => f._id === itemId);
    if (!itemInfo || quantity <= 0) return sum;
    return sum + itemInfo.price * quantity;
  }, 0);

  const deliveryFee = totalAmount > 0 ? 20 : 0;
  const grandTotal = totalAmount + deliveryFee;

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {Object.keys(cartItems).length === 0 ? (
          <p style={{ padding: '20px', fontSize: '18px' }}>Your cart is empty!</p>
        ) : (
          Object.keys(cartItems).map((itemId) => {
            const quantity = cartItems[itemId] || 0;
            if (quantity <= 0) return null;

            const itemInfo = food_list.find(f => f._id === itemId);
            if (!itemInfo) return null; // Prevent crash if item not in food_list

            return (
              <div className='cart-items-title cart-items-item' key={itemId}>
                <img src={url + "/images/" + itemInfo.image} alt={itemInfo.name} />
                <p>{itemInfo.name}</p>
                <p>₹{itemInfo.price}</p>
                <p>{quantity}</p>
                <p>₹{itemInfo.price * quantity}</p>
                <p className="remove-btn" onClick={() => removeFromCart(itemId)}>✖</p>
              </div>
            );
          })
        )}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{grandTotal}</b>
            </div>
          </div>
          <button
            onClick={() => {
              if (totalAmount > 0) navigate('/order');
              else alert('Your cart is empty!');
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here!</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
