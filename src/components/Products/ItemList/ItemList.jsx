import Item from "./Item";
import estilo from "./styles/ItemList.module.css";


const ItemList = ({products}) => {
  return (
    <>
        <div className={estilo.itemList}>
            {products.map((product) => (
               <Item key={product.id} {...product}/>    
            ))}
        </div>
    </>
  );
}

export default ItemList;