import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout/Layout";
import ItemListContainer from "./components/Products/ItemList/ItemListContainer";
import Products from "./components/Products/Products";
import ProductDetail from "./components/Products/ProductDetail/ProductDetail";
import Home from "./components/Home/Home";
import Contact from "./components/Layout/Contact";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Panel from "./components/Panel/Panel";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RouteProtected from './components/Auth/RouteProtected';
import './components/Layout/styles/Global.module.css'

function App() {


  return (
    <>
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/new" element={<ItemListContainer/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/:idCategory" element={<Categories/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/panel" element={ 
                <RouteProtected allowedUsers={['admin']}>
                  <Panel/>
                </RouteProtected>
            }/>
        </Route>
    </Routes>
    </>
  )
}

export default App
