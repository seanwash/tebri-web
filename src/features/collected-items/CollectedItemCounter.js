import React from "react";
import { useSelector } from "react-redux";
import { collectedItemCount } from "./collectedItemSlice";

export function CollectedItemCounter(props) {
  const numberOfItems = useSelector(collectedItemCount);

  return <div className="text-center">{numberOfItems} Items Collected</div>;
}
