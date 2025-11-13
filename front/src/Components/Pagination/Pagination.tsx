import Link from "next/link";
import React from "react";
import {IPagination} from "@/types/pagination";
import {MdOutlineNavigateNext} from "react-icons/md";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

interface Props {
    pagination: IPagination;
    queryString: URLSearchParams;
    siblingCount?: number;
}

const DOTS = "...";


export default function Pagination({pagination, queryString, siblingCount = 1}: Props) {
    const totalPages = pagination?.totalPages || 1;
    const currentPage = pagination?.page || 1;

    if (totalPages <= 1) return null;

    const range = (start: number, end: number) =>
        Array.from({length: end - start + 1}, (_, i) => start + i);

    const getPaginationRange = () => {
        const totalPageNumbers = siblingCount * 2 + 5;

        if (totalPageNumbers >= totalPages) return range(1, totalPages);

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const showLeftDots = leftSiblingIndex > 2; //pag===4 => true
        const showRightDots = rightSiblingIndex < totalPages - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!showLeftDots && showRightDots) {
            const leftItemCount = 2 + 2 * siblingCount;
            return [...range(1, leftItemCount), DOTS, lastPageIndex];
        }

        if (showLeftDots && !showRightDots) {
            const rightItemCount = 2 + 2 * siblingCount;
            return [firstPageIndex, DOTS, ...range(totalPages - rightItemCount + 1, totalPages)];
        }

        return [firstPageIndex, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, lastPageIndex];
    };

    const paginationRange = getPaginationRange();

    const buildQuery = (page: number) => {
        queryString.set("page", page.toString());
        return queryString.toString();
    };

    return (
        <nav className="mt-10 flex flex-row-reverse justify-center items-center gap-2">
            {/* Prev */}
            {currentPage > 1 ? (
                <Link href={`/products?${buildQuery(currentPage - 1)}`}>
                    <FaArrowLeft className="text-red-700  mx-2 text-xl"  />
                </Link>
            ) : ('')}

            {/* Page Numbers */}
            {paginationRange.map((page, idx) =>
                page === DOTS ? (
                    <span key={`dots-${idx}`} className="px-2 py-1  rounded  text-red-700">{DOTS}</span>
                ) : (
                    <Link key={page} href={`/products?${buildQuery(Number(page))}`}>
                          <span
                              className={`px-3 py-1 border rounded ${page === currentPage ? "bg-red-700 text-white border-red-700" : "bg-white text-red-700 border-red-700"}`}>
                           {page}
                            </span>
                    </Link>
                )
            )}

            {/* Next */}
            {currentPage < totalPages ? (
                <Link href={`/products?${buildQuery(currentPage + 1)}`}>
                        <FaArrowRight className="text-red-700  mx-2 text-xl"  />
                </Link>
            ) : ('')}
        </nav>
    );
}