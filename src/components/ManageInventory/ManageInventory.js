import React from "react";
import fakeData from "../../fakeData";

const ManageInventory = () => {
  const handleAddProductBtn = () => {
    fetch("https://safe-harbor-53165.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(fakeData),
    });
  };

  return (
    <div>
      <button onClick={handleAddProductBtn}>Add Product</button>
    </div>
  );
};

export default ManageInventory;
