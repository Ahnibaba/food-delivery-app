import { useContext } from "react"
import "./FoodDisplay.css"
import { StoreContext } from "../../context/StoreContext"
import FoodItem from "../FoodItem/FoodItem"
import PropTypes from "prop-types"
import Loading from "../Loading/Loading"

const FoodDisplay = ({ category }) => {
    const { food_list, token } = useContext(StoreContext)
    
    
    
    
  return (
     !token ? <Loading />:
     (
      <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
       {food_list.map((item, index) => {
           if (category === "All" || category === item.category) {
             return <FoodItem  key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
           }
           
       })}
      </div>
   </div>
     )
  )
}

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired
}

export default FoodDisplay