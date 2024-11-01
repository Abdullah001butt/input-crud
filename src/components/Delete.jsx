import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Delete = ({ itemId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(
        `https://66a3deab44aa63704582bdea.mockapi.io/users/${itemId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const handleDelete = () => {
    console.log("Deleting item with ID:", itemId);
    mutation.mutate();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white p-1 ml-2 rounded"
    >
      Delete
    </button>
  );
};

export default Delete;
