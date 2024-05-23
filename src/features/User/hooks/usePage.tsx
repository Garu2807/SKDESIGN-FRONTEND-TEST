import { useState } from 'react';

const usePage = (totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const goFirtPage = () => {
    setCurrentPage(1);
  };
  const getPageBlocks = () => {
    const blocks = [];
    for (let i = 1; i <= totalPages; i += 5) {
      blocks.push(i);
    }
    return blocks;
  };

  return {
    currentPage,
    goToPage,
    goToNextPage,
    getPageBlocks,
    goFirtPage,
  };
};

export default usePage;
