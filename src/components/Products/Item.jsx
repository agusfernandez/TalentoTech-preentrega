
import { useState } from 'react';
import estilo from './Item.module.css';

const Item = ({name, price}) => {
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

            <h2>{name}</h2>
            <p>Precio: ${price}</p>
            <div className={estilo.counter}>
                <button onClick={decrement}>-</button>
                <span>{count}</span>
                <button onClick={increment}>+</button>
            </div>
      </div>
    </>
  );
}

export default Item;