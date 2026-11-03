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

    //removeProduct method
    const removeProduct = (id) => {
        setCart( previusCart => previusCart.filter(item => item.id !== id));
    }

    //Increment and Decrement methods
    const increment = (id) => {
        setCart(prevCart =>
        prevCart.map(item =>
            item.id === id ? { ...item, ammount: item.ammount + 1 } : item
        )
        );
    };

    const decrement = (id) => {
        setCart(prevCart =>
        prevCart.map(item =>
            item.id === id && item.ammount > 1 ? { ...item, ammount: item.ammount - 1 } : item
        )
        );
    };

    //emptyCart method
    const emptyCart = () => {
        setCart([]);
    }

    //Sumatoria de items en el carrito
    const itemsInCart = () => {
        return cart.reduce((accumulator, item) => accumulator + item.ammount, 0);
    }

    //Sumatoria de precio total de items en el carrito
    const totalAmmount = () => {
        return cart.reduce((accumulator, item) => accumulator + (item.price * item.ammount), 0);
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            emptyCart,
            removeProduct,
            increment,
            decrement,
            itemsInCart,
            totalAmmount
        }}>{children}</CartContext.Provider>
    )

   
}

