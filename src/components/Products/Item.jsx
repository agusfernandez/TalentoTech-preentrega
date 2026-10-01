
import { useState } from 'react';
import { Link } from "react-router-dom"; 
import ButtonFavourite from './ButtonFavourite';
import estilo from './styles/Item.module.css';

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
        <div className={estilo.item}>
            <ButtonFavourite/>

            <Link to={`/product/${id}`} className={estilo.link}>
                <img src={image} alt={title} className={estilo.image}/>
            </Link>

            <div className={estilo.infoProduct}>
                <Link to={`/product/${id}`} className={estilo.link}>
                    <h2 className={estilo.productTitle}>{title}</h2>
                </Link>
                <p>Precio: ${price}</p>
                <p>{description}</p>
                <div className={estilo.counter}>
                    <button onClick={decrement}>-</button>
                    <span>{count}</span>
                    <button onClick={increment}>+</button>
                </div>
            </div>
        </div>
    </>
  );
}

export default Item;