import { useState } from 'react';
import { db } from '../../firebase/config';
import Spinner from './Spinner';
import styles from './styles/Products.module.css';
import { Link } from "react-router-dom";
import SearchContainer from './SearchContainer';
import { useSearch } from '../../context/SearchContext';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../Products/Pagination';

const Products = () => {

    const {
        elements: products,
        actualPage,
        totalPages,
        loader,
        goToPage,
    } = usePagination({
        db,
        nameCollection: 'products',
        sizePage: 8,
        orderCollection: 'title',
        directionOrder: 'asc',
    });

    const { search } = useSearch();

    if (loader && products.length === 0) {
        return <Spinner />;
    }

    // Si hay búsqueda activa, delegamos al buscador
    if (search.trim()) {
        return <SearchContainer products={products} />;
    }

    return (
        <>
            <div className={styles.productsList}>
                {products.length === 0 ? (
                    <p>No hay productos habilitados.</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} className={styles.cardContainer}>
                            <div className={styles.imageContainer}>
                                <img src={product.imageProduct || product.image} alt={product.title} className={styles.productImage} />
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
                    ))
                )}
            </div>

            <Pagination
                actualPage={actualPage}
                totalPages={totalPages}
                changePage={goToPage}
                disable={loader}
            />
        </>
    );
};

export default Products;
