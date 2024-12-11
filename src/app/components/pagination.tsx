import React from "react";

type Props = {
  value: number;
  onChange: any;
  // totalPages: number;
};

export default function Pagination({ value, onChange }: Props) {
  //   const pagesArray = Array.from(
  //     { length: totalPages },
  //     (_, idx: number) => idx + 1
  //   );

  const pagesArray = [1, 2, 3, 4, 5];
  const handlePreviousClick = () => {
    onChange(value - 1);
  };

  const handlePageNumberClick = (clickedPage: number) => {
    onChange(clickedPage);
  };

  const handleNextClick = () => {
    onChange(value + 1);
  };
  console.log(value);
  return (
    <div className="pagination-=component font-semibold">
      <button
        className="p-2 border-[1px] px-4 text-blue-400"
        onClick={handlePreviousClick}
        disabled={value === 1}
      >
        {" "}
        {"<< Previous"}
      </button>
      {pagesArray?.map((t, idx) => {
        return (
          <button
            className={`page-button p-2 border-[1px] px-4 ${
              value === t && "bg-gray-300"
            }`}
            key={idx}
            onClick={() => {
              handlePageNumberClick(t);
            }}
          >
            {t}
          </button>
        );
      })}
      <button
        className="p-2 border-[1px] px-4 text-blue-400"
        onClick={handleNextClick}
      >
        {" "}
        {"Next >>"}
      </button>
    </div>
  );
}
