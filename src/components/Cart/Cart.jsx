import styles from "./styles/Cart.module.css";
import {useCart} from '../context/CartContext';
import { Trash } from 'lucide-react';

const Cart = () => {
    const {cart, emptyCart, totalAmmount, removeProduct, increment, decrement} = useCart();

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
                             
                                </div>

                                <div className={styles.cartDescription}>
                                    <p>{item.description}</p>
                                </div>

                                <div className={styles.cartRow}>
                                    <div className={styles.cartQuantity}>
                                        <span className={styles.cartLegend}>Cantidad:</span>
                                        <span className={styles.cartData}>{item.ammount}</span>
                                    </div>
                                    <div className={styles.cartPriceDetail}>
                                        <div className={styles.cartPrice}>
                                            <span className={styles.cartLegend}>Precio Unitario:</span>
                                            <span className={styles.cartData}>${item.price}</span>
                                        </div>
                                        <div className={styles.cartSubtotal}>
                                            <span className={styles.cartLegend}>Subtotal:</span> 
                                            <span className={styles.cartData}>${(item.price * item.ammount).toFixed(2)}</span>
                                        </div>
                                    </div>
                       


                                </div>
                      


                                <div className={styles.cartDetailsLow}>
                                    <div className={styles.counterDetail}>
                                        <button className={styles.buttondecrementDetail} onClick={() => decrement(item.id)}>-</button>
                                        <span className={styles.counterDetailInput}>{item.ammount}</span>
                                        <button className={styles.buttonincrementDetail} onClick={() => increment(item.id)}>+</button>
                                    </div>
                                    <button className={styles.cartRemoveButton} onClick={() => removeProduct(item.id)}><Trash strokeWidth={1} /></button>

                            
                                
                                </div>   
                           

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