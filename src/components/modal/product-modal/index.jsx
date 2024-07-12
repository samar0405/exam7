import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { product, category } from "@service";

// Modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxHeight: "100vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pl: 4,
  pr: 4,
  pt: 4,
  pb: 4,
  overflowY: "auto",
};


const validationSchema = Yup.object({
  product_name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number"),
  discount: Yup.number().required("Discount is required").min(0),
  for_gender: Yup.string().required("Gender is required"),
  made_in: Yup.string().required("Made in is required"),
  age_min: Yup.number().required("Minimum age is required").min(0),
  age_max: Yup.number()
    .required("Maximum age is required")
    .min(Yup.ref("age_min"), "Maximum age should be greater than minimum age"),
  count: Yup.number().required("Count is required").min(0),
  size: Yup.array().of(Yup.string().required("Size is required")),
});

const Index = ({ open, handleClose, item }) => {
  const [cate, setCate] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    product_name: item?.product_name || "",
    description: item?.description || "",
    category_id: item?.category_id || "",
    cost: item?.cost || 0,
    discount: item?.discount || 0,
    for_gender: item?.for_gender || "",
    made_in: item?.made_in || "",
    age_min: item?.age_min || 0,
    age_max: item?.age_max || 0,
    count: item?.count || 0,
    color: item?.color || [],
    size: item?.size || [],
  };

  const getData = async () => {
    try {
      const response = await category.get();
      if (response.status === 200 && response?.data?.categories) {
        setCate(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item) {
        response = await product.update({ ...item, ...values });
        if (response.status === 200) {
          toast.success("Product updated successfully!");
          setTimeout(() => {
            navigate("/main/products");
          }, 3000);
          window.location.reload();
        }
      } else {
        response = await product.create(values);
        if (response.status === 201) {
          toast.success("Product created successfully!");
          setTimeout(() => {
            navigate("/main/products");
          }, 3000);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the product.");
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
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            {item ? "Edit Product" : "Add a Product"}
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
              <Form>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 1,
                  }}
                >
                  <TextField
                    sx={{ width: "100%", height: "40px" }}
                    label="Age maximum"
                    name="age_max"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age_max}
                    type="number"
                    required
                    error={touched.age_max && Boolean(errors.age_max)}
                    helperText={touched.age_max && errors.age_max}
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    sx={{ width: "100%", height: "40px" }}
                    label="Count"
                    name="count"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.count}
                    type="number"
                    required
                    error={touched.count && Boolean(errors.count)}
                    helperText={touched.count && errors.count}
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    sx={{ width: "100%", height: "40px" }}
                    label="Age minimum"
                    name="age_min"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age_min}
                    type="number"
                    required
                    error={touched.age_min && Boolean(errors.age_min)}
                    helperText={touched.age_min && errors.age_min}
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    sx={{ width: "100%", height: "40px" }}
                    label="Discount"
                    name="discount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discount}
                    type="number"
                    required
                    error={touched.discount && Boolean(errors.discount)}
                    helperText={touched.discount && errors.discount}
                    margin="normal"
                    size="small"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category_id"
                      value={values.category_id}
                      onChange={(e) =>
                        setFieldValue("category_id", e.target.value)
                      }
                      onBlur={handleBlur}
                      required
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <em>Category</em>;
                        }
                        const selectedItem = cate.find(
                          (item) => item.category_id === selected
                        );
                        return selectedItem ? selectedItem.category_name : "";
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Category</em>
                      </MenuItem>
                      {cate.map((item) => (
                        <MenuItem
                          key={item.category_id}
                          value={item.category_id}
                        >
                          {item.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Made in</InputLabel>
                    <Select
                      name="made_in"
                      value={values.made_in}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      size="small"
                    >
                      {[
                        "Uzbekistan",
                        "China",
                        "Turkiye",
                        "Russia",
                        "England",
                        "USA",
                        "India",
                        "Persia",
                        "Saudi Arabia",
                        "Egypt",
                      ].map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select
                      labelId="color-label"
                      name="color"
                      multiple
                      value={values.color}
                      onChange={(event) =>
                        setFieldValue("color", event.target.value)
                      }
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {["Red", "Blue", "Green", "Yellow", "Black", "White"].map(
                        (color) => (
                          <MenuItem key={color} value={color}>
                            <Checkbox
                              checked={values.color.indexOf(color) > -1}
                              color="primary"
                            />
                            {color}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                  <FormControl component="fieldset" margin="normal">
                    <RadioGroup
                      row
                      name="for_gender"
                      value={values.for_gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="small"
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    sx={{ width: "100%", height: "40px" }}
                    label="Cost"
                    name="cost"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cost}
                    type="number"
                    required
                    error={touched.cost && Boolean(errors.cost)}
                    helperText={touched.cost && errors.cost}
                    margin="normal"
                    size="small"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel sx={{ height: "40px" }}>Size</InputLabel>
                    <Select
                      name="size"
                      multiple
                      value={values.size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      renderValue={(selected) => selected.join(", ")}
                      size="small"
                    >
                      {[
                        "M",
                        "CM",
                        "D",
                        "C",
                        "XC",
                        "L",
                        "XL",
                        "X",
                        "V",
                        "I",
                      ].map((size) => (
                        <MenuItem key={size} value={size}>
                          <Checkbox
                            checked={values.size.indexOf(size) > -1}
                            color="primary"
                          />
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  sx={{ width: "100%", height: "40px" }}
                  label="Product name"
                  name="product_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product_name}
                  required
                  error={touched.product_name && Boolean(errors.product_name)}
                  helperText={touched.product_name && errors.product_name}
                  margin="normal"
                  size="small"
                />
                <TextField
                  sx={{ width: "100%", height: "40px" }}
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  required
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  margin="normal"
                  multiline
                  size="small"
                />
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Index;
