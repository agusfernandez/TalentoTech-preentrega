import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';

export const usePagination = ({
  db,
  nameCollection,
  sizePage = 6,
  orderCollection = 'name',
  directionOrder = 'asc',
}) => {
  const [elements, setElements] = useState([]);
  const [actualPage, setActualPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(true);

 
  const [lastDocs, setlastDocs] = useState({});

  const [rechargeCounter, setrechargeCounter] = useState(0);

  // Clean the data saved and recharged
  const recharge = () => {
    setlastDocs({});
    setrechargeCounter((anterior) => anterior + 1);
  };

  useEffect(() => {
    const calculateTotalPages = async () => {
      try {
        const coleccionRef = collection(db, nameCollection);
        const snapshot = await getCountFromServer(coleccionRef);
        const totalProducts = snapshot.data().count;

        // Divide the total of productos againt the size of the page 
        const pages = Math.max(1, Math.ceil(totalProducts / sizePage));
        setTotalPages(pages);

        if (actualPage > pages) {
          setActualPages(pages);
        }
      } catch (error) {
        console.error('Error al contar los productos:', error);
      }
    };

    calculateTotalPages();
  }, [db, nameCollection, sizePage, rechargeCounter, actualPage]);

  // Bring products 
  useEffect(() => {
    const bringProductsOfPage = async () => {
      setLoader(true);
      try {
        const coleccionRef = collection(db, nameCollection);
        let consult;

        if (actualPage === 1) {
          // Si es la pagina 1, traemos los primeros desde el principio
          consult = query(
            coleccionRef,
            orderBy(orderCollection, directionOrder),
            limit(sizePage)
          );
        } else {
          // Si es otra página (ej. página 2), necesitamos el último documento de la pagina anterior (ej. pagina 1)
          let lastDocument = lastDocs[actualPage - 1];

          // Si el usuario saltó directo a una pagina lejana (ej. de la 1 a la 4),
          // recorremos desde la 1 hasta la página anterior para conseguir ese documento
          if (!lastDocument) {
            let docPaso = null;
            for (let p = 1; p < actualPage; p++) {
              const consultPaso = docPaso
                ? query(coleccionRef, orderBy(orderCollection, directionOrder), startAfter(docPaso), limit(sizePage))
                : query(coleccionRef, orderBy(orderCollection, directionOrder), limit(sizePage));

              const snapPaso = await getDocs(consultPaso);
              docPaso = snapPaso.docs[snapPaso.docs.length - 1];
            }
            lastDocument = docPaso;
          }

          // Armamos la consult empezando DESPUES (startAfter) del último documento de la página anterior
          consult = query(
            coleccionRef,
            orderBy(orderCollection, directionOrder),
            startAfter(lastDocument),
            limit(sizePage)
          );
        }

        const snapshot = await getDocs(consult);

        // Transformamos los documentos de Firestore a un array normal de JavaScript
        const productsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setElements(productsList);

        // Guardamos cual fue el último producto de esta página por si después vamos a la siguiente
        if (snapshot.docs.length > 0) {
          const lastDocOfThisPage = snapshot.docs[snapshot.docs.length - 1];
          setlastDocs((anteriores) => ({
            ...anteriores,
            [actualPage]: lastDocOfThisPage,
          }));
        }
      } catch (error) {
        console.error('Error al traer la página:', error);
      } finally {
        setLoader(false);
      }
    };

    bringProductsOfPage();
  }, [db, nameCollection, actualPage, sizePage, orderCollection, directionOrder, rechargeCounter]);

  // Funciones para cambiar de página desde los botones
  const goToPage = (numberPage) => {
    if (numberPage >= 1 && numberPage <= totalPages) {
      setActualPages(numberPage);
    }
  };

  const nextPage = () => goToPage(actualPage + 1);
  const previousPage = () => goToPage(actualPage - 1);

  return {
    elements,
    setElements,
    actualPage,
    totalPages,
    loader,
    goToPage,
    nextPage,
    previousPage,
    recharge,
  };
};