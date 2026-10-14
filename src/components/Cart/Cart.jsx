import {useCart} from '../context/CartContext';

const Cart = () => {
    const {cart, emptyCart, totalAmmount} = useCart();

    if (cart.length === 0){
        return(
            <div>
                <h1>El Carrito esta vacío</h1>
                <p>Agregar productos para continuar la compra.</p>
            </div>
        )
    }
    return (
        <>
            <div>
                <h1>Carrito de Compras</h1>
                    {cart.map(item => (

                        <div key={item.id}>
                            <img src={item.image} alt={item.name}/>
                            <div>
                                <h4>{item.name}</h4>
                                <p>Precio: ${item.price}</p>
                                <p>Subtotal: ${(item.price * item.ammount).toFixed(2)}</p>

                            </div>

                        </div>
                    ))}

                    <div>
                        <div>Total a pagar: {totalAmmount().toFixed(2)}</div>
                        <button onClick={emptyCart}>Vaciar Carrito</button>
                    </div>
            </div>
        
        </>
    )
}

export default Cart;