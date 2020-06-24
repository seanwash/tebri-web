import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategories, getAllCategories } from "./categorySlice";
import { collectedItemCountByItemId } from "../collected-items/collectedItemSlice";
import {
  addCollectedItem,
  removeLastCollectedItem,
} from "../collected-items/collectedItemSlice";

const CategoryItemListItemForm = (props) => {
  const defaultQuantity = 1;
  const [quantity, setQuantity] = useState(defaultQuantity);
  const dispatch = useDispatch();
  const collectedItemCount = useSelector(
    collectedItemCountByItemId(props.item.id)
  );

  const handleQuantityIncrement = (item) => (event) => {
    const location = { lat: 123, lon: 456 };
    dispatch(addCollectedItem({ id: item.id, location }));
  };

  const handleQuantityDecrement = (item) => (event) => {
    if (collectedItemCount === 0) return;

    dispatch(removeLastCollectedItem(item.id));
  };

  return (
    <div className="p-2 bg-gray-200 flex justify-between">
      <span>{props.item.name}</span>

      <div className="flex items-center">
        <button
          type="button"
          onClick={handleQuantityDecrement(props.item)}
          type="submit"
          className="bg-gray-800 text-white rounded"
        >
          <span className="sr-only">Remove</span>
          <svg fill="currentColor" viewBox="0 0 20 20" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <span className="px-2">{collectedItemCount}</span>

        <button
          type="button"
          onClick={handleQuantityIncrement(props.item)}
          type="submit"
          className="bg-gray-800 text-white rounded"
        >
          <span className="sr-only">Add</span>
          <svg fill="currentColor" viewBox="0 0 20 20" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
        </button>
      </div>
    </div>
  );
};

export function CategoryList(props) {
  const nestedCategories = useSelector(allCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      {nestedCategories.map((category) => {
        return (
          <div key={category.id} id={category.id} className="py-4">
            <span className="text-2xl">{category.name}</span>

            <ul>
              {category.items.map((item) => {
                return (
                  <li key={item.id}>
                    <CategoryItemListItemForm item={item} />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
