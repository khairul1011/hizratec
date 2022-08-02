import React, { useEffect, useState, useMemo } from "react";

const PaginationComponent = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange

}) => {
    const [totalPages, setTotalPages] = useState(0);
    // const [val, setonChange] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} onClick={() => onPageChange(i)}>
                    <a href="#pablo" className={i == currentPage ? "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 text-white bg-lightBlue-500" : "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500"}>
                        {i}
                    </a>
                </li>
                // < TouchableOpacity
                //     onPress={() => onPageChange(i)}
                //     activeOpacity={1}
                //     key={i}
                //     style={{
                //         padding: 10,
                //         backgroundColor: i === currentPage ? '#517fa4' : 'grey',
                //         borderRadius: 4,
                //         flexDirection: 'row',
                //         justifyContent: 'center',
                //         alignItems: 'center',
                //     }}
                // >
                //     <Text style={{ color: '#fff' }}>{i}</Text>
                // </TouchableOpacity>

            );
            console.log(currentPage);
        }

        return pages;

    }, [totalPages, currentPage]);

    if (totalPages === 0) return null;

    return (
        <>
            <div className="py-2">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {/* <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500">
                                <i className="fas fa-chevron-left -ml-px"></i>
                                <i className="fas fa-chevron-left -ml-px"></i>
                            </a>
                        </li> */}
                        {currentPage === 1 ?
                            <li  >
                                <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 text-white bg-lightBlue-500">
                                    <i className="fas fa-chevron-left -ml-px"></i>
                                </a>
                            </li>
                            :
                            <li onClick={() => onPageChange(currentPage - 1)}>
                                <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500">
                                    <i className="fas fa-chevron-left -ml-px"></i>
                                </a>
                            </li>}

                        {paginationItems}

                        {/* <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500">
                                <i className="fas fa-chevron-right -mr-px"></i>
                            </a>
                        </li> */}
                        {currentPage == totalPages == 1 ?
                            <li  >
                                <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 text-white bg-lightBlue-500">
                                    <i className="fas fa-chevron-right -ml-px"></i>
                                </a>
                            </li> :
                            <li onClick={() => onPageChange(currentPage + 1)}>
                                <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500">
                                    <i className="fas fa-chevron-right -ml-px"></i>
                                </a>
                            </li>}

                        {/* <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500">
                                <i className="fas fa-chevron-right -mr-px"></i>
                                <i className="fas fa-chevron-right -mr-px"></i>
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default PaginationComponent