import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Update from "./Update";
import Delete from "./Delete";

const fetchItems = async () => {
  const res = await axios.get(
    "https://66a3deab44aa63704582bdea.mockapi.io/users"
  );
  return res.data;
};

const Read = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  // Ensure data is an array
  const items = Array.isArray(data) ? data : [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Items</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="border p-2 mb-2 flex justify-between items-center rounded"
          >
            {item.name}
            <div className="flex">
              <Update item={item} />
              <Delete itemId={item.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
