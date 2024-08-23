import { useEffect, useState } from "react"
import { assets } from "../../assets/assets"
import "./Add.css"
import axios from "axios"
import { toast } from "react-toastify"



// eslint-disable-next-line react/prop-types
const Add = ({ url }) => {

  const category = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"]

  const optionList = category.map((item, index) => {
    return <option key={index} value={item} required>{item}</option>
  })

  
  const [image, setImage] = useState(false)
  const [add, setAdd] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"

  })
  
  
  
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData( data => ({ ...data, [name]: value }))
    
  

    
  }
  useEffect(() => {
    
    
    if (data.name && data.description && data.price && data.category && image.name) {
      setAdd(true)
    } else {
      setAdd(false)
    }
  }, [data, image])
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    
    const response = await axios.post(`${url}/api/food/add`, formData)
    console.log(data);

    const previous = () => {
      setData(prev => ({ ...prev, category: prev[category]  }))
      return data.category
    }
    
    
    

    if (response.data.success) {
      
      setData({
        name: "",
        description: "",
        price: "",
        category: previous()
      }) 
      setImage(false)
      
      toast.success(response.data.message)
    }  
    else {
      toast.error(response.data.message)
    }
  }
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" id="" required>
              {optionList}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" />

          </div>
        </div>
        {add ? <button type="submit" className="add-btn">ADD</button> : <button type="submit" className="add-btn disabled" disabled>ADD</button>}
      </form>
    </div>
  )
}


export default Add