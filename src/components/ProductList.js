import React, {useEffect, useState} from "react";
import { useNavigate , Link} from 'react-router-dom';
const ProductList = ()=>{
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect( ()=>{
        getProducts();
        console.log("Poducst :" + products);
        
       
    },[]);

    const getProducts = async ()=>{
        
        let result = await fetch('http://localhost:5000/products',{

            headers:{
                authorization:`beaer ${JSON.parse(localStorage.getItem('token'))}`    
            }
        });
        
        result = await result.json();
        
        setProducts(result);
        
        
    }

    const deleteProduct = async (id)=>{

        console.log("DELETING Product ID :" + id)
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization:`beaer ${JSON.parse(localStorage.getItem('token'))}`    
            }
        });
        result = await result.json();
        if(result){
            getProducts();
        }

    }
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{

            headers:{
                authorization:`beaer ${JSON.parse(localStorage.getItem('token'))}`    
            }
        });
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }
        
    }
    return (
        <div className="product-list"> 
            <h3>Product List</h3>
            <input type="text" placeholder="search product" className="search"
            onChange={searchHandle}/>
            <ul>
                <li> S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                
                products.length>0 ? products.map((item,index)=>
                    <ul key={item._id}>
                        <li> {index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Del</button>
                        <li><Link to={"/update/" + item._id }>Update</Link></li>
                        </li>
                    </ul>
                ):<h1> No result found</h1>
            }
        </div>
    )
}

export default ProductList;