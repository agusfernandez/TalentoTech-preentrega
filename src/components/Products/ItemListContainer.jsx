import ItemList from "./ItemList";
import {useState, useEffect} from "react";

const ItemListContainer = () => {
 
  const [products, setProducts] = useState([]);
  const  API= '../public/data/products.json'


  useEffect(() => {
   fetch(API)
    .then(response => response.json())
    .then(data => setProducts(data));
  }, []);

  return (
    <>
        <ItemList products={products}/>   
    </>
  );
}

export default ItemListContainer;