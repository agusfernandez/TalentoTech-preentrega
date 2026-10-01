import estilos from "./styles/FormProduct.module.css";

const FormProduct = ({manageChange, manageSend, manageChangeImage, datosForm}) => {

    return (
        <>
          <form onSubmit={manageSend} className={estilos.formulario}>
                <h3>Agregar Producto</h3>
                <div className={estilos.formGroup}>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={datosForm.name}
                        onChange={manageChange}
                    />
                </div>
                <div className={estilos.formGroup}>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={datosForm.price}
                        onChange={manageChange}
                    />
                </div>
                <div className={estilos.formGroup}>
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={datosForm.description}
                        onChange={manageChange}
                    />  
                </div>
                <div className={estilos.formGroup}>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="text"
                        id="stock"
                        name="stock"
                        value={datosForm.stock}
                        onChange={manageChange}
                    />
                </div>
                <div className={estilos.formGroup}>
                    <label htmlFor="image">Imagen:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={manageChangeImage}
                    />
                </div>
                <button type="submit" className={estilos.submitButton}>Guardar Productos</button>
          </form>
        </>
    )

}

export default FormProduct;