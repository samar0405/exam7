import http from "./config";

const product = {
  create: (data) => http.post("/product", data),
  get: () => http.get("/products", { params: { page: 1, limit: 500 } }),
  delete: (id) => http.delete(`/product/${id}`),
  update: (item) => http.put("/product", item),
};

export default product;
