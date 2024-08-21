import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, food_list, removeFromCart, url, totalAmount } = useContext(StoreContext);
  
  const navigate = useNavigate()
  // const [addTotal, setAddTotal] = useState([])
  // const [subTotal, setSubTotal] = useState(0)
  // const [totalFee, setTotalFee] = useState(null)


  // useEffect(() => {
  //   const foodListTotal = food_list.reduce((acc, item) => {
  //     if (cartItems[item._id]) {
  //       const total = { ...item, total: cartItems[item._id] * item.price }
  //       acc.push(total)

  //     }
  //     return acc
  //   }, [])
  //   setAddTotal(foodListTotal)

  // }, [food_list, cartItems])

  // useEffect(() => {

  //   const sub = addTotal.reduce((acc, item) => {
  //     return acc + item.total
  //   }, 0)

  //   setSubTotal(sub)
  //   setTotalFee(sub + 2)

  // }, [addTotal])


 


  return (
    
    
    <div className="cart">
   
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {

            return (
              
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${cartItems[item._id] * item.price}</p>
                  <p onClick={() => { removeFromCart(item._id) }} className="cross">x</p>
                </div>
                <hr />
              </div>

            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmount}</p>


            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${totalAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount > 0 ? totalAmount + 2 : 0}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
