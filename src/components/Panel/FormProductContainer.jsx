import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import FormProduct from "./FormProduct";

const IMGBB_APIKEY = '89b00719fa2b5c71de2c3d943368663d';

const emptyForm = {
    title: '',
    price: '',
    description: '',
    stock: '',
    category: '',
};

const FormProductContainer = ({ productEdit, onProductAdded }) => {

    const [datosForm, setDatosForm] = useState(emptyForm);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Si viene un producto a editar, pre-llenamos el form
    useEffect(() => {
        if (productEdit) {
            setDatosForm({
                title:       productEdit.title       || '',
                price:       productEdit.price       || '',
                description: productEdit.description || '',
                stock:       productEdit.stock       || '',
                category:    productEdit.category    || '',
            });
        } else {
            setDatosForm(emptyForm);
        }
        setImage(null);
    }, [productEdit]);

    const manageChange = (e) => {
        const { name, value } = e.target;
        setDatosForm(prev => ({ ...prev, [name]: value }));
    };

    const manageChangeImage = (e) => {
        setImage(e.target.files[0]);
    };

    const manageSend = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = productEdit?.imageProduct || productEdit?.image || '';

            // Solo subimos imagen si se seleccionó una nueva
            if (image) {
                console.log("Subiendo imagen a Imgbb...");
                const formData = new FormData();
                formData.append("image", image);

                const responseImgbb = await fetch(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_APIKEY}`,
                    { method: "POST", body: formData }
                );
                const dataImgbb = await responseImgbb.json();

                if (!dataImgbb.success) throw new Error("La subida de imagen a Imgbb falló.");
                imageUrl = dataImgbb.data.url;
                console.log("Imagen subida:", imageUrl);
            }

            const productData = {
                title:        datosForm.title,
                price:        Number(datosForm.price),
                description:  datosForm.description,
                stock:        Number(datosForm.stock),
                category:     datosForm.category,
                imageProduct: imageUrl,
            };

            if (productEdit) {
                // ── EDITAR producto existente ──
                const docRef = doc(db, 'products', productEdit.id);
                await updateDoc(docRef, productData);
                console.log("Producto actualizado:", productEdit.id);
                onProductAdded({ id: productEdit.id, ...productData }, true);
            } else {
                // ── AGREGAR producto nuevo ──
                if (!image) {
                    alert('Por favor, seleccioná una imagen para el nuevo producto.');
                    setLoading(false);
                    return;
                }
                const docRef = await addDoc(collection(db, 'products'), productData);
                console.log("Producto creado con id:", docRef.id);
                onProductAdded({ id: docRef.id, ...productData }, false);
            }

        } catch (error) {
            console.error("Error al guardar el producto:", error);
            alert("Hubo un error al guardar el producto. Intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProduct
            datosForm={datosForm}
            manageChange={manageChange}
            manageSend={manageSend}
            manageChangeImage={manageChangeImage}
            loading={loading}
            isEditing={!!productEdit}
        />
    );
};

export default FormProductContainer;
