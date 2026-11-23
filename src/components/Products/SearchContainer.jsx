import { useSearch } from '../../context/SearchContext';
import { Link } from 'react-router-dom';
import styles from './styles/Products.module.css';

const searchFormat = (texto = "") =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


const SearchContainer =({products})=> {
    const {search} = useSearch();
    const text = searchFormat(search);
    const filteredProducts = products.filter((p) => searchFormat(p.title).includes(text )|| searchFormat(p.category).includes(text));

    if(products.length===0) return <p>No hay productos habilitados</p>
    if(filteredProducts.length===0)
        return <p>No hay productos encontrados que coincidan con {search}</p>

    return (
        <>
        
            <div className={styles.productsList}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={styles.cardContainer}>

                            <div className={styles.imageContainer}>
                                <img src={product.image} alt={product.title} className={styles.productImage} />
                                <span className={styles.categorylegend}>{product.category}</span>
                        
                            </div>
                            <div className={styles.infoProduct}>
                                <Link to={`/product/${product.id}`} className={styles.productLink}>
                                        <h3 className={styles.productTitle}>{product.title}</h3>
                                </Link>
                                 <p className={styles.price}>Precio: ${product.price}</p>
                                <p className={styles.description}>{product.description}</p>
                                <p className={styles.stock}>Stock: {product.stock}</p>
                        </div>
                    </div>

                ))}


            </div>
            
        
        
        </>
    )

}

export default SearchContainer;

