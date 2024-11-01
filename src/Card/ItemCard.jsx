import React from "react";
import Button from "@mui/material/Button";

const ItemCard = ({ item, openUpdateDialog, handleDelete }) => (
  <div key={item.id} className="p-4 bg-white shadow-md rounded flex flex-col">
    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
    <p className="text-sm mb-4">{item.email}</p>
    <div className="flex flex-col space-y-2">
      <p>
        <strong>Age:</strong> {item.age}
      </p>
      <p>
        <strong>City:</strong> {item.city}
      </p>
    </div>
    <div className="flex justify-between mt-4">
      <Button
        onClick={() => openUpdateDialog(item)}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
      >
        Update
      </Button>
      <Button
        onClick={() => handleDelete(item.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </Button>
    </div>
  </div>
);

export default ItemCard;
