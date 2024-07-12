import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  SignIn,
  Forgot,
  Main,
  Category,
  Products,
  Workers,
  ProductDetails,
} from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="main/*" element={<Main />}>
          <Route index element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="workers" element={<Workers />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
