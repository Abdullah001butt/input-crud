import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Update = ({ item }) => {
  const [input, setInput] = useState(item.name);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedItem) =>
      axios.put(
        `https://66a3deab44aa63704582bdea.mockapi.io/users/${item.id}`,
        {
          name: updatedItem,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating item with ID:", item.id);
    console.log("Updated item data:", input);
    mutation.mutate(input);
  };

  return (
    <form onSubmit={handleSubmit} className="inline">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-1 mr-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-1 rounded">
        Update
      </button>
    </form>
  );
};

export default Update;
