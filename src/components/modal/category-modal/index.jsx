import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { category } from "@service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const validationSchema = Yup.object({
  category_name: Yup.string().required("Category name is required"),
});

const Index = ({ open, handleClose, item, setData }) => {
  const initialValues = {
    category_name: item?.category_name || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item) {
        const payload = {
          ...values,
          category_id: item.category_id,
        };
        response = await category.update(payload);
        if (response.status === 200) {
          setData((prevData) =>
            prevData.map((cat) =>
              cat.category_id === item.category_id ? { ...cat, ...values } : cat
            )
          );
          toast.success("Category updated successfully!");
        } else {
          toast.error("Failed to update category.");
        }
      } else {
        response = await category.create(values);
        if (response.status === 200 || response.status === 201) {
          setData((prevData) => [...prevData, response.data]);
          toast.success("Category created successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        console.log(response);
      }

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } finally {
      setSubmitting(false);
      handleClose();
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
            {item ? "Edit Category" : "Add a category"}
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
            }) => (
              <Form id="submit" className="mt-6 space-y-4">
                <TextField
                  fullWidth
                  label="Category name"
                  name="category_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category_name}
                  type="text"
                  id="category_name"
                  required
                  error={touched.category_name && Boolean(errors.category_name)}
                  helperText={touched.category_name && errors.category_name}
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
