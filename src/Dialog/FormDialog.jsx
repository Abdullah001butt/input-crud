import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormField from "../Field/FormField";

const FormDialog = ({ isOpen, onClose, formik, title }) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle className="bg-blue-500 text-white">{title}</DialogTitle>
    <DialogContent className="bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
        <FormField id="name" label="Name" type="text" formik={formik} />
        <FormField id="email" label="Email" type="email" formik={formik} />
        <FormField id="age" label="Age" type="number" formik={formik} />
        <FormField id="city" label="City" type="text" formik={formik} />
        <Button
          type="submit"
          color="primary"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Button>
      </form>
    </DialogContent>
    <DialogActions className="bg-gray-50">
      <Button
        onClick={onClose}
        color="secondary"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default FormDialog;
