import ItemList from "./ItemList";
import Spinner from "./Spinner";
import {useState, useEffect} from "react";

const ItemListContainer = () => {
 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const  API= '/data/products.json'


  useEffect(() => {
   fetch(API)
    .then(response => {
        if (!response.ok) {
            throw new Error('Los productos no se pudieron cargar. Error 404');
        }
        return response.json();
    })
    .then(data => setProducts(data))
    .catch(error => console.error('Error fetching products:', error))
    .finally(() => setLoading(false));
  }, []);

  return (
    <>
        {loading ? (
            <Spinner/>
        ) : (
            <ItemList products={products}/>   
        )}
    </>
  );
}

export default ItemListContainer;