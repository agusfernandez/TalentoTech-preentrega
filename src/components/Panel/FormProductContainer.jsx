import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import FormProduct from "./FormProduct";
import Modal from "./Modal"; 

const IMGBB_APIKEY = import.meta.env.VITE_IMGBB_APIKEY;

const emptyForm = {
    title: '',
    price: '',
    description: '',
    stock: '',
    category: '',
};

const FormProductContainer = ({ productEdit, onProductAdded }) => {

    const [dataForm, setDataForm] = useState(emptyForm);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({isOpen:false, type:"success", title:"", message:"", onClose:null});


    const showModal = (type, title, message, onClose = null) =>
    setModal({ isOpen: true, type, title, message, onClose });

    const closeModal = () => {
        const callback = modal.onClose;
        setModal(prev => ({ ...prev, isOpen: false, onClose: null }));
        if (callback) callback();
    };

    // Si viene un producto a editar, pre-llenamos el form
    useEffect(() => {
        if (productEdit) {
            setDataForm(productEdit);
        } else {
            setDataForm(emptyForm);
        }
       setErrors({});
    }, [productEdit]);

    const manageChange = (e) => {
        const { name, value } = e.target;
        setDataForm(prev => ({ ...prev, [name]: value }));

        if (errors[name]){
            setErrors(prev => ({
                ...prev, [name]: null
            }))
        }
    };

    const manageChangeImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file && errors.image){
            setErrors(prev => ({...prev, image:null }));
        }
    };

    const validateErrors = () => {
        const newErrors = {};

        if (!dataForm.title.trim()) {
            newErrors.title = "El nombre no puede quedar vacío";
        }

        if (!dataForm.price) {
            newErrors.price = "El precio no puede quedar vacío";
        } else if (Number(dataForm.price) <= 0) {
            newErrors.price = "El precio debe ser mayor que 0";
        }

        if (dataForm.stock === "" || dataForm.stock === undefined || dataForm.stock === null) {
            newErrors.stock = "El stock no puede quedar vacío";
        } else if (Number(dataForm.stock) < 0) {
            newErrors.stock = "El stock no puede ser negativo";
        }

        if (!dataForm.category.trim()) {
            newErrors.category = "La categoría no puede estar vacía";
        }

        if (!dataForm.description.trim()) {
            newErrors.description = "La descripción no puede quedar vacía";
        }

        if (!productEdit && !image) {
            newErrors.image = "Debe seleccionar una imagen para el nuevo producto";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const uploadImage = async (file) => {

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch( `https://api.imgbb.com/1/upload?key=${IMGBB_APIKEY}`,{ 
            method: "POST", 
            body: formData 
        })
        
        const dataImg = await response.json();
        if(!dataImg.success) throw new Error ("Error al subir la imagen");
        return dataImg.data.url;
        
    }

    const manageSend = async (e) => {
        e.preventDefault();

        if(!validateErrors()) return;

        setLoading(true);

        try {
            let imageUrl = dataForm.image || "";

            // Solo subimos imagen si se seleccionó una nueva
            if (image) {
              imageUrl = await uploadImage(image);
            }

            const dataToSend= {
                ...dataForm,
                price: Number(dataForm.price),
                stock: Number(dataForm.stock),
                category: dataForm.category.trim().toLowerCase(),
                image: imageUrl
            }

            if (productEdit) {
                await updateDoc(doc(db, 'products', productEdit.id), dataToSend);

                    showModal(
                        "success",
                        "Producto actualizado",
                        "Los cambios se guardaron con éxito.",
                        () => onProductAdded?.({ id: productEdit.id, ...dataToSend }, true)
                    );

            } else {
            
                      const docRef = await addDoc(collection(db, 'products'), dataToSend);

                        setDataForm(emptyForm);
                        setImage(null);

                        showModal(
                            "success",
                            "Producto agregado",
                            "El producto se creó con éxito.",
                            () => onProductAdded?.({ id: docRef.id, ...dataToSend }, false)
                        );

            }

        } catch (error) {
            console.error("Error al guardar el producto:", error);
            showModal("error", "Ups, hubo un error", "No pudimos guardar el producto. Intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FormProduct
                dataForm={dataForm}
                manageChange={manageChange}
                manageSend={manageSend}
                manageChangeImage={manageChangeImage}
                loading={loading}
                isEditing={!!productEdit}
                errors={errors}
            />
            <Modal
                isOpen={modal.isOpen}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onClose={closeModal}
            />
        </>
    );
};

export default FormProductContainer;
