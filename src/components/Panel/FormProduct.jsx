import styles from "./styles/FormProduct.module.css";

const FormProduct = ({ manageChange, manageSend, manageChangeImage, datosForm, loading, isEditing }) => {

    return (
        <form onSubmit={manageSend} className={styles.formulario}>

            <div className={styles.formGroup}>
                <label htmlFor="title">Nombre:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={datosForm.title}
                    onChange={manageChange}
                    placeholder="Nombre del producto"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={datosForm.price}
                    onChange={manageChange}
                    placeholder="0"
                    min="0"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={datosForm.description}
                    onChange={manageChange}
                    placeholder="Descripción del producto"
                    rows={3}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manageChange}
                    placeholder="0"
                    min="0"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Categoría:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={datosForm.category}
                    onChange={manageChange}
                    placeholder="Ej: decoración, muebles..."
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="image">
                    Imagen {isEditing && <span className={styles.optionalLabel}>(dejá vacío para mantener la actual)</span>}:
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={manageChangeImage}
                />
            </div>

            <div className={styles.formFooter}>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Agregar producto'}
                </button>
            </div>

        </form>
    );
};

export default FormProduct;
