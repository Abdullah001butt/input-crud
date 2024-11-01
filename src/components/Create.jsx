import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormDialog from "../Dialog/FormDialog";
import ItemCard from "../Card/ItemCard";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  age: Yup.number()
    .min(1, "Age must be greater than 0")
    .required("Age is required"),
  city: Yup.string().required("City is required"),
});

const Create = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const queryClient = useQueryClient();

  const fetchItems = async () => {
    const res = await axios.get(
      "https://66a3deab44aa63704582bdea.mockapi.io/users"
    );
    return res.data;
  };

  const {
    data: items,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const createMutation = useMutation({
    mutationFn: (newItem) =>
      axios.post("https://66a3deab44aa63704582bdea.mockapi.io/users", newItem),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setSubmittedData([...submittedData, data]); // Add the new item to the state
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedItem) =>
      axios.put(
        `https://66a3deab44aa63704582bdea.mockapi.io/users/${updatedItem.id}`,
        updatedItem
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setSubmittedData(
        submittedData.map((item) => (item.id === data.id ? data : item))
      ); // Update the item in the state
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://66a3deab44aa63704582bdea.mockapi.io/users/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setSubmittedData(submittedData.filter((item) => item.id !== id)); // Remove the item from the state
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (currentItem) {
        console.log("Updating item with ID:", currentItem.id);
        console.log("Updated item data:", values);
        updateMutation.mutate({ ...currentItem, ...values });
        setIsUpdateDialogOpen(false);
      } else {
        createMutation.mutate(values);
        setIsDialogOpen(false);
      }
    },
  });

  const openDialog = () => {
    setCurrentItem(null);
    formik.resetForm(); // Reset form values
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openUpdateDialog = (item) => {
    setCurrentItem(item);
    formik.setValues({
      name: item.name || "",
      email: item.email || "",
      age: item.age || "",
      city: item.city || "",
    });
    setIsUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    deleteMutation.mutate(id);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedItems = Array.isArray(items)
    ? items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
          <p className="text-gray-500">Please wait while we fetch the data.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading items
          </h2>
          <p className="text-gray-500">
            There was an error fetching the data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Button
        variant="contained"
        color="primary"
        onClick={openDialog}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create
      </Button>

      <FormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        formik={formik}
        title="Create Item"
      />
      <FormDialog
        isOpen={isUpdateDialogOpen}
        onClose={closeUpdateDialog}
        formik={formik}
        title="Update Item"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full mt-4">
        {paginatedItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            openUpdateDialog={openUpdateDialog}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <Pagination
        count={Math.ceil((items ? items.length : 0) / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        className="mt-8"
      />
    </div>
  );
};

export default Create;
