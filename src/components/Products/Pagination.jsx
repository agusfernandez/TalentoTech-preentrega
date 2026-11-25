import { ChevronLeft , ChevronRight } from 'lucide-react';
import styles from './styles/Pagination.module.css'

const Pagination = ({
    totalPages= 1,
    actualPage= 1,
    changePage,
    visibleMax= 3,
    disable

}) => {
    const segureFirstPage = Math.max(1, totalPages);

    const getPageNumber = () => {
        const half= Math.floor(visibleMax /2);
        let first = Math.max(1, actualPage-half);
        let last = Math.min(totalPages, first + visibleMax -1);

        if( last - first +1 < visibleMax){
            first = Math.max(1, last - visibleMax + 1);
        }

        const pages = []

        for (let i = first; i<=last; i++){
            pages.push(i);
        }

        return pages;
    }


    const visiblePages = getPageNumber();

    const previousDisable = disable || actualPage <=1;
    const nextDisable = disable || actualPage >= segureFirstPage;



    return (
        <>
            <nav className={styles.containerPagination} aria-label="Paginación">

                {/* Previus Arrow */}
                <button type="button" className={`${styles.buttonPagination} ${styles.buttonPrevius}`} onClick={()=>changePage(actualPage-1) } disabled={previousDisable} aria-label="Pagina anterior" >
                    <ChevronLeft strokeWidth={1} />
                </button>

                {/* Pages Numbers */}

                {visiblePages.map((number) => (
                    <button
                        key={number}
                        type="button"
                        className={`${styles.buttonPage} ${number === actualPage ? styles.activePage : ''}`}
                        onClick={() => changePage(number)}
                        disabled = {disable}
                        aria-current = {number === actualPage ? 'page' : undefined}
                        >
                        {number}
                    </button>
                ))}

                {/* Next Arrow */}

                   {/* Previus Arrow */}
                <button type="button" className={`${styles.buttonPagination} ${styles.buttonNext}`} onClick={()=>changePage(actualPage+1) } disabled={nextDisable} aria-label="Pagina posterior" >
                    <ChevronRight strokeWidth={1} />
                </button>   


            </nav>
        
        
        </>
    )


}

export default Pagination;