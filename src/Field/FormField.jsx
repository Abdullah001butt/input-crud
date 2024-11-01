import React from "react";
import TextField from "@mui/material/TextField";

const FormField = ({ id, label, type, formik }) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={id} className="text-sm font-medium">
      {label}
    </label>
    <TextField
      id={id}
      name={id}
      type={type}
      variant="outlined"
      fullWidth
      value={formik.values[id]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
    />
  </div>
);

export default FormField;
