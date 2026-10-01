
import { useState } from 'react';
import ButtonFavourite from './ButtonFavourite';
import estilo from './styles/Item.module.css';

const Item = ({title, price, description, image}) => {
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
            <img src={image} alt={title} className={estilo.image}/>
            <div className={estilo.infoProduct}>
                <h2>{title}</h2>
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