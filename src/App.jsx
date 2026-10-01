import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout/Layout";
import ItemListContainer from "./components/Products/ItemListContainer";
import ProductDetail from "./components/Products/ProductDetail";

function App() {


  return (
    <>
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<h1>Inicio</h1>}/>
            <Route path="/products" element={<ItemListContainer/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/contact" element={<h3>Contact</h3>}/>
        </Route>
    </Routes>
    </>
  )
}

export default App
