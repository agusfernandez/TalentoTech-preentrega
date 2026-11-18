import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import {SquarePen, Trash} from 'lucide-react';
import FormProductContainer from './FormProductContainer'
import Cupon from '../Products/Cupon/Cupon';
import styles from './styles/Panel.module.css';

const Panel = () => {

    const [products, setProducts] = useState([]);
    const [productEdit, setProductEdit] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ open: false, product: null });
    const [tabOpen, setTabOpen] = useState('products');

    useEffect (() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(docs);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    const openDeleteModal = (product) => {
        setDeleteModal({ open: true, product });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, product: null });
    };

    const confirmDelete = async () => {
        const { product } = deleteModal;
        try {
            await deleteDoc(doc(db, 'products', product.id));
            setProducts(prev => prev.filter(p => p.id !== product.id));
            closeDeleteModal();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Error al eliminar el producto. Intentá de nuevo.');
        }
    };

    const openModalNewProduct = () => {
        setProductEdit(null);
        setModalOpen(true);
    }

    const openModalEditProduct = (product) => {
        setProductEdit(product);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setProductEdit(null);
    }

    const handleProductAdded = (productAdded, editProduct) => {
        if (editProduct) {
            setProducts(prev => prev.map(product => product.id === productAdded.id ? productAdded : product));
        } else {
            setProducts(prev => [...prev, productAdded]);
        }
        closeModal();
    }



    return (
        <>
            <section className={styles.panelContainer}>
                <div className={styles.panelTitle}>
                    <h2>Panel de Administración</h2>
                </div>

                <div className={styles.topActions}>
                    <div className={styles.tabBar}>
                        <button className={`${styles.tab} ${tabOpen === 'products' ? styles.activeTab : ''}`} onClick={ () => setTabOpen('products')} >Productos</button>
                        <button className={`${styles.tab} ${tabOpen === 'cupones' ? styles.activeTab : ''}`} onClick={ () => setTabOpen('cupones')} >Cupones</button>
                    </div>
                    <button onClick={openModalNewProduct} className={styles.addProductButton}>Agregar Producto</button>
                </div>


                {/* Tabvars Products / Cupons */}

                {tabOpen === 'products' && (
                    <div className={styles.productsSection}>

                        {products.length === 0 ? (
                            <p className={styles.emptyMsg}>No hay productos disponibles.</p>
                        ) : (
                            <div className={styles.tableWrapper}>
                                <table className={styles.productsTable}>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Producto</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>Descripción</th>
                                            <th>Categoría</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td>
                                                    <img
                                                        src={product.imageProduct || product.image || 'https://via.placeholder.com/50'}
                                                        alt={product.title}
                                                        className={styles.tableImg}
                                                    />
                                                </td>
                                                <td className={styles.productName}>{product.title}</td>
                                                <td>${product.price}</td>
                                                <td>{product.stock ?? '—'}</td>
                                                <td className={styles.descCell}>{product.description || '—'}</td>
                                                <td>{product.category || '—'}</td>
                                                <td>
                                                    <div className={styles.productActions}>
                                                        <SquarePen strokeWidth={1} onClick={() => openModalEditProduct(product)} className={styles.editButton}>Editar</SquarePen>
                                                        <Trash strokeWidth={1} onClick={() => openDeleteModal(product)} className={styles.deleteButton}>Eliminar</Trash>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {tabOpen === 'cupones' && (
                    <div className={styles.cuponesSection}>
                        <Cupon/>
                    </div>
                )}  


                 {/* Modal agregar / editar */}

                {modalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h3>{productEdit ? 'Editar Producto' : 'Agregar Producto'}</h3>
                                <button onClick={closeModal} className={styles.closeModalButton}>✕</button>
                            </div>
                            <FormProductContainer
                                productEdit={productEdit}
                                setProductEdit={setProductEdit}
                                onProductAdded={(product, editProduct) => handleProductAdded(product, editProduct)}
                            />
                        </div>
                    </div>
                )}

                {/* Modal eliminar */}

                {deleteModal.open && (
                    <div className={styles.modalOverlay} onClick={closeDeleteModal}>
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h3>Eliminar producto</h3>
                                <button onClick={closeDeleteModal} className={styles.closeModalButton}>✕</button>
                            </div>
                            <div className={styles.deleteModalBody}>
                                <p>¿Estás seguro que querés eliminar <strong>{deleteModal.product?.title}</strong>?</p>
                                <p className={styles.deleteWarning}>Esta acción no se puede deshacer.</p>
                            </div>
                            <div className={styles.deleteModalFooter}>
                                <button onClick={closeDeleteModal} className={styles.cancelButton}>Cancelar</button>
                                <button onClick={confirmDelete} className={styles.confirmDeleteButton}>Sí, eliminar</button>
                            </div>
                        </div>
                    </div>
                )}      



            </section>
        </>
    )
}

export default Panel