import styles from "./styles/Cart.module.css";
import {useCart} from '../context/CartContext';

const Cart = () => {
    const {cart, emptyCart, totalAmmount} = useCart();

    if (cart.length === 0){
        return(
            <div className={styles.cartemptySection}>
                <h1>El Carrito esta vacío</h1>
                <p>Agregar productos para continuar la compra.</p>
            </div>
        )
    }
    return (
        <>
            <div className={styles.cartSection}>
                <h1 className={styles.cartTitle}>Carrito de Compras</h1>
                    {cart.map(item => (

                        <div key={item.id} className={styles.cartProduct}>
                            <div className={styles.cartImage}><img src={item.image} alt={item.name} className={styles.image}/></div>
                            <div className={styles.cartDetails}>
                                <div className={styles.cartDetailsBox}>
                                    <h4 className={styles.cartProductName}>{item.name}</h4>
                                    <p className={styles.cartPrice}>${item.price}</p>
                                </div>
                        
                                <p className={styles.cartSubtotal}>Subtotal: ${(item.price * item.ammount).toFixed(2)}</p>

                            </div>
                        </div>
                    ))}

                    <div className={styles.cartTotal}>
                        <div className={styles.cartTotaltext}>Total a pagar: {totalAmmount().toFixed(2)}</div>
                        <button onClick={emptyCart}>Vaciar Carrito</button>
                    </div>
            </div>
        
        </>
    )
}

export default Cart;