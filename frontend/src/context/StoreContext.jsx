import { createContext, useEffect, useState } from "react";

//import { food_list } from "../assets/assets";
import PropTypes from "prop-types"
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {



   const [cartItems, setCartItems] = useState({});
  // const url = "http://localhost:4000"
   //const url = "https://food-delivery-app-z2r9.vercel.app"
   const url = "https://food-delivery-app-1-ywpm.onrender.com"
   const [token, setToken] = useState(false)
   const [showLogin, setShowLogin] = useState(false)
   const [food_list, setFoodList] = useState([])

   const addToCart = async (itemId) => {
      if (!cartItems[itemId]) {
         setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
      }
      else {
         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
      }
      if (token) {
         await axios.post(`${url}/api/cart/add`, { itemId }, { withCredentials: true } )
      }
   }

   const removeFromCart = async (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
      if (token) {
         await axios.post(`${url}/api/cart/remove`, { itemId }, {withCredentials: true} )
      }
   }



   const getTotalCartAmount = async () => {
      let totalAmount = 0;
      for (const item in cartItems) {
         if (cartItems[item] > 0) {
            let itemInfo = await food_list.find((product) => product._id === item)
            
            if (itemInfo) {
               totalAmount += itemInfo.price * cartItems[item];
            }
            
         }
      }
      return totalAmount
   }

   const fetchFoodList = async () => {

      try {
         const response = await axios.get(`${url}/api/food/list`, { withCredentials: true })
         if (response.data.success) {
            setToken(response.data.success)
            setFoodList(response.data.data)

         }
      } catch (err) {
         if (err.response && err.response.status === 401) {
            setToken(false)
            setShowLogin(true)

         } else {
            console.log(err);

         }
      }
   }

   const loadCartData = async () => {
      const response = await axios.get(`${url}/api/cart/get`, { withCredentials: true })
      setCartItems(response.data.cartData)
   }

   const handleLogout = async () => {
      try {
         const response = await axios.get(`${url}/api/user/logout`, { withCredentials: true })
         console.log(response);

         setToken(false)
         setFoodList([])
         setShowLogin(true)
      } catch (err) {
         console.log(err);

      }


   }

   useEffect(() => {

      async function loadData() {
         await fetchFoodList()
         await loadCartData()


      }
      loadData()
   }, [token])


   const [totalAmount, setTotalAmount] = useState(0);

   // Effect to calculate the total amount
   useEffect(() => {
     const calculateTotalAmount = async () => {
       const total = await getTotalCartAmount();
       
       
       setTotalAmount(total);
       
     };
 
     calculateTotalAmount();
   });
  

   const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken,
      handleLogout,
      showLogin,
      setShowLogin,
      totalAmount

   }
   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   )
}
StoreContextProvider.propTypes = {
   children: PropTypes.node.isRequired
}

export default StoreContextProvider 