
import { useState } from 'react';
import { Link } from "react-router-dom"; 
import ButtonFavourite from './ButtonFavourite';
import style from './styles/Item.module.css';

const Item = ({id, title, price, description, image}) => {
    const [count, setCount] = useState(1);
    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

  return (
    <>
        <div className={style.cardContainer}>
            <ButtonFavourite/>
            
            <div className={style.imageContainer}>
                <Link to={`/product/${id}`} className={style.link}>
                    <img src={image} alt={title} className={style.imageProduct}/>
                </Link>
            </div>
    
            <div className={style.infoProduct}>
                <Link to={`/product/${id}`} className={style.productlink}>
                    <h2 className={style.productTitle}>{title}</h2>
                </Link>
                <p className={style.price}>Precio: ${price}</p>
                <span className={style.description}>{description}</span>


                <div className={style.actionsbottom}>
                    <div className={style.counter}>
                        <button onClick={decrement} className={style.buttondecrement}>
                            -
                        </button>
                        <span className={style.count}>{count}</span>
                        <button onClick={increment} className={style.buttonincrement}>
                            +
                        </button>
                    </div>
                    <div className={style.buttoncontainer}>
                        <button className={style.addToCartButton}>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Item;