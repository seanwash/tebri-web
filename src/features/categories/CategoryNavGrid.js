import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategories, getAllCategories } from "./categorySlice";

export function CategoryNavGrid(props) {
  const categories = useSelector(allCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="bg-gray-800 w-full flex overflow-y-scroll shadow-md">
      {categories.map((category) => (
        <a
          key={category.id}
          href={`#${category.id}`}
          className="block whitespace-no-wrap px-2 py-1 text-white text-sm rounded-sm"
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}
