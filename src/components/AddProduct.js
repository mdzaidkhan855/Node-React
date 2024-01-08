import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
const AddProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const addProduct = async ()=>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        let userid = JSON.parse(localStorage.getItem("user"))._id;
        console.log(userid);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ price, name, category,company,userid }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="product">
            <input type="text" placeholder="Enter Product name" className="inputBox"
            onChange={(e)=>setName(e.target.value) } value={name} />
            {error && !name && <span className="invalid-input"> Enter valid name</span> }

            <input type="text" placeholder="Enter Product price" className="inputBox"
            onChange={(e)=>setPrice(e.target.value) } value={price} />
            {error && !price && <span className="invalid-input"> Enter valid price</span> }

            <input type="text" placeholder="Enter Product category" className="inputBox"
            onChange={(e)=>setCategory(e.target.value) } value={category} />
            {error && !category && <span className="invalid-input"> Enter valid category</span> }

            <input type="text" placeholder="Enter Product company" className="inputBox"
            onChange={(e)=>setCompany(e.target.value) } value={company} />
            {error && !company && <span className="invalid-input"> Enter valid company</span> }

            <button onClick={addProduct} className="appButton"> Add Product</button>
        </div>
    )
}

export default AddProduct;