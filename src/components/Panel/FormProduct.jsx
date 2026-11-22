import styles from "./styles/FormProduct.module.css";

const FormProduct = ({ manageChange, manageSend, manageChangeImage, dataForm, loading, isEditing, errors={} }) => {

    return (
        <form onSubmit={manageSend} className={styles.form}>

            <div className={styles.formGroup}>
                <label htmlFor="title">Nombre:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={dataForm.title}
                    onChange={manageChange}
                    placeholder="Nombre del producto"
                    required
                    className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                />
                {errors.title && <span className={styles.errorsMessage}>{errors.title}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={dataForm.price}
                    onChange={manageChange}
                    placeholder="0"
                    min="0"
                    required
                     className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
                />
                {errors.price && <span className={styles.errorsMessage}>{errors.price}</span>}

            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={dataForm.description}
                    onChange={manageChange}
                    placeholder="Descripción del producto"
                    rows={3}
                    className={`${styles.description} ${errors.description ? styles.inputError : ""}`}
                />
                {errors.description && <span className={styles.errorsMessage}>{errors.description}</span>}

            </div>

            <div className={styles.formGroup}>
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={dataForm.stock}
                    onChange={manageChange}
                    placeholder="0"
                    min="0"
                    className={`${styles.stock} ${errors.stock ? styles.inputError : ""}`}
                />
                {errors.stock && <span className={styles.errorsMessage}>{errors.stock}</span>}

            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Categoría:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={dataForm.category}
                    onChange={manageChange}
                    placeholder="Ej: decoración, muebles..."
                    className={`${styles.category} ${errors.category ? styles.inputError : ""}`}
                />
                {errors.category && <span className={styles.errorsMessage}>{errors.category}</span>}

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
                    className={`${styles.image} ${errors.image ? styles.inputError : ""}`}
                />
                
                {errors.image && <span className={styles.errorsMessage}>{errors.image}</span>}


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
