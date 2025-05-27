import _ from "lodash";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalRecords, pageSize = import.meta.env.VITE_PAGE_SIZE, onPageChangeStart }) => {
    const pages = Math.ceil(totalRecords / pageSize);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = +searchParams.get('page') || 1;

    const goToPage = (pageNumber) => {
        if (onPageChangeStart) onPageChangeStart(); // فعال کردن لودینگ قبل از تغییر
        setSearchParams({ page: pageNumber });
    };

    return (
        <nav>
            <ul className="pagination pagination-lg">
                <li
                    className={`page-item ${currentPage === 1 ? 'disabled opacity-50' : ''}`}
                    onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                >
                    <a className="page-link">قبلی</a>
                </li>

                {_.times(pages, (index) => (
                    <li
                        key={`page${index + 1}`}
                        onClick={() => goToPage(index + 1)}
                        className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                    >
                        <a className="page-link">{index + 1}</a>
                    </li>
                ))}

                <li
                    className={`page-item ${currentPage === pages ? 'disabled opacity-50' : ''}`}
                    onClick={() => currentPage < pages && goToPage(currentPage + 1)}
                >
                    <a className="page-link">بعدی</a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
