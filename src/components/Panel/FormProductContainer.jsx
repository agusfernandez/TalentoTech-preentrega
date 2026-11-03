import {useState} from "react";
import FormProduct from "./FormProduct";


const FormProductContainer = () => {
    const [datosForm, setDatosForm] = useState({
        name: '',
        price: '',
        description: '',
        stock: ''    
    });

    const manageChange = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    }

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const manageChangeImage = (e) => {
      setImage(e.target.files[0]);
    }

    const manageSend = async (e) => {
        e.preventDefault();
        if(!image) {
            alert('Por favor, selecciona una imagen antes de enviar el formulario.');
            return;
        }
        setLoading(true);

        const APIKEY= '89b00719fa2b5c71de2c3d943368663d';
        const formData = new FormData();
        formData.append("image", image);


        try {
            console.log("Subiendo imagen a Imgbb...");
            const responseImgbb = await fetch(
                `https://api.imgbb.com/1/upload?key=${APIKEY}`,
                {
                method: "POST",
                body: formData,
                },
            );

            const dataImgbb = await responseImgbb.json();

            if (dataImgbb.success) {
                console.log("Imagen subida con éxito. URL:", dataImgbb.data.url);

                const productComplete = {
                    ...datosForm,
                    urlImagen: dataImgbb.data.url,
                }

                console.log("Enviando los siguientes datos COMPLETOS a la API:", productComplete);
        
            } else {

                throw new Error("La subida de la imagen a Imgbb falló.");
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <FormProduct 
                datosForm={datosForm} 
                manageChange={manageChange} 
                manageSend={manageSend} 
                manageChangeImage={manageChangeImage}
                loading={loading}
            />
        </>
    )
}

export default FormProductContainer;