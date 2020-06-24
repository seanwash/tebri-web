import React from "react";
import { CategoryNavGrid } from "./features/categories/CategoryNavGrid";
import { CategoryList } from "./features/categories/CategoryList";
import { CollectedItemCounter } from "./features/collected-items/CollectedItemCounter";

function App() {
  return (
    <div className="App">
      <div className="fixed top-0 left-0 w-full">
        <div className="bg-blue-200">
          <CollectedItemCounter />
        </div>
        <div className="bg-gray-800">
          <CategoryNavGrid />
        </div>
      </div>

      <div className="mx-auto max-w-2xl mt-20">
        <CategoryList />
      </div>
    </div>
  );
}

export default App;
