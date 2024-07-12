import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { worker } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number"),
  first_name: Yup.string().required("First name is required"),
  gender: Yup.string().required("Gender is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Phone number is required"),
});

const Index = ({ open, handleClose, item, setData }) => {
  const navigate = useNavigate();
  const initialValues = {
    email: item?.email || "",
    age: item?.age || "",
    first_name: item?.first_name || "",
    gender: item?.gender || "",
    last_name: item?.last_name || "",
    phone_number: item?.phone_number || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item) {
        const payload = {
          ...values,
          id: item.id,
        };
        response = await worker.update(payload);
        if (response.status === 200) {
          
          toast.success("Product updated successfully!");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Failed to update product.");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {item ? "Edit Worker" : "Add a Worker"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              touched,
              errors,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form id="submit" className="mt-6 space-y-4">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  id="email"
                  required
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  type="number"
                  id="age"
                  required
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  type="text"
                  id="first_name"
                  required
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                  margin="normal"
                />
                <FormControl component="fieldset" margin="normal">
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={values.gender}
                    onChange={(e) => setFieldValue("gender", e.target.value)}
                    className="ml-20"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
                {touched.gender && Boolean(errors.gender) && (
                  <Typography color="error" variant="body2">
                    {errors.gender}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  type="text"
                  id="last_name"
                  required
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  type="text"
                  id="phone_number"
                  required
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                  margin="normal"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button onClick={handleClose} variant="contained">
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Index;
