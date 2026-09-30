import ItemList from "./ItemList";

const ItemListContainer = () => {
 
  const products = [
    { id: 1, name: "Velas Aromáticas", price: 8440 },
    { id: 2, name: "Florero Cerámico", price: 12500 },
    { id: 3, name: "Lampara de Mesa", price: 28500 },
  ];  

  return (
    <>
        <ItemList products={products}/>   
    </>
  );
}

export default ItemListContainer;