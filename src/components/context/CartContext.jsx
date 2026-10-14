import {useState, useContext, createContext} from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);

    if(!context){
        throw new Error ('useCart debe ser usado dentro del un provider Context')
    }

    return context;

}

export const CartProvider = ({children}) => {
    const [cart , setCart] = useState([]);

    //AddToCart method
    const addToCart = ({product, ammount = 1}) => {
        const itemsInCart = cart.find(item => item.id === product.id);

        if(itemsInCart){
            const updatedCart = cart.map (item => item.id === product.id ? {...item, ammount:item.ammount + ammount} :item);
            setCart(updatedCart);
        } else {
            setCart (previusCart => [...previusCart, {...product, ammount}])
        }
        console.log("Añadiendo al carrito - Producto:", product, "Cantidad:", ammount);
    }


    const emptyCart = () => {
        setCart([]);
    }

    const itemsInCart = () => {
        return cart.reduce((accumulator, item) => accumulator + item.ammount, 0);
    }

    const totalAmmount = () => {
        return cart.reduce((accumulator, item) => accumulator + (item.price * item.ammount), 0);
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            emptyCart,
            itemsInCart,
            totalAmmount
        }}>{children}</CartContext.Provider>
    )

   
}

