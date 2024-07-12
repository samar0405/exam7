import React, { useState } from "react";
import { TextField, Button, FormHelperText } from "@mui/material";
import { auth } from "@service";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import ForgotModal from "../../components/modal/forgot-modal";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const Index = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.forgot_password(values);
      if (response.status === 200) {
        // localStorage.setItem("access_token", response?.data?.access_token);
        localStorage.setItem("email", values.email);
        toast.success("Successfully signed in!");
        setModal(true);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setModal(false);
    navigate("/forgot");
  };

  return (
    <>
      <ForgotModal open={modal} toggle={handleModalClose} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-center my-6 text-[40px]">Forgot password?</h1>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <Field name="email">
                  {({ field, meta }) => (
                    <div>
                      <TextField
                        {...field}
                        type="email"
                        fullWidth
                        label="Enter your email"
                        error={meta.touched && Boolean(meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <FormHelperText error>{meta.error}</FormHelperText>
                      )}
                    </div>
                  )}
                </Field>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;
