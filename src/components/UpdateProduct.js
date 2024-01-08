import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const UpdateProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(params);
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`    
            }
        });
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,
        {
            method:"Put",
            body: JSON.stringify({ price, name, category,company}),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        );

        navigate('/');
    }

    return (
        <div className="product">
            <input type="text" placeholder="Enter Product name" className="inputBox"
            onChange={(e)=>setName(e.target.value) } value={name} />
            

            <input type="text" placeholder="Enter Product price" className="inputBox"
            onChange={(e)=>setPrice(e.target.value) } value={price} />
            

            <input type="text" placeholder="Enter Product category" className="inputBox"
            onChange={(e)=>setCategory(e.target.value) } value={category} />
            

            <input type="text" placeholder="Enter Product company" className="inputBox"
            onChange={(e)=>setCompany(e.target.value) } value={company} />
            

            <button onClick={updateProduct} className="appButton"> Update </button>
        </div>
    )
}

export default UpdateProduct;