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

    const [dataForm, setDataForm] = useState(emptyForm);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

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

        if(!dataForm.title.trim()){
            newErrors.title= "El nombre no puede quedar vacio"
        }

        if(!dataForm.price()){
            newErrors.price= "El precio no puede quedar vacio"
        } else if ( Number(dataForm.price) <= 1){
            newErrors.price= "El precio debe ser mayor que 1"
        }

        if (!dataForm.stock === "" || dataForm.stock === undefined){
            newErrors.stock = "El stock no puede quedar vacio"
        } else if (Number(dataForm.stock) <= 0) {
            newErrors.stock = "El stock no puede ser negativo"
        }

        if(!dataForm.category.trim()){
            newErrors.category = "La categoria no puede estar vacio"
        }

        if (!dataForm.description.trim()){
            newErrors.description = "La descripción no puede quedar vacio"
        }

        if (!productEdit && !image){
            newErrors.image = "Debe seleccionar una imagen para el nuevo producto"
        }


        setErrors(newErrors)

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
                // ── EDITAR producto existente ──
                const docRef = doc(db, 'products', productEdit.id);
                await updateDoc(docRef, dataToSend);

                alert("Producto Actualizado con éxito");
                console.log("Producto actualizado:", productEdit.id);
                
                if(onProductAdded) {
                    onProductAdded({id:onProductAdded.id, ...dataToSend}, true);
                }

            } else {
            
                const docRef = await addDoc(collection(db, 'products'), dataToSend);
                alert("Producto agregado con éxito");
                console.log("Producto creado con id:", docRef.id);
                    
                if(onProductAdded) {
                    onProductAdded({id:onProductAdded.id, ...dataToSend}, false);
                }

                setDataForm(emptyForm)

                setImage(null)


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
            dataForm={dataForm}
            manageChange={manageChange}
            manageSend={manageSend}
            manageChangeImage={manageChangeImage}
            loading={loading}
            isEditing={!!productEdit}
            errors={errors}
        />
    );
};

export default FormProductContainer;
