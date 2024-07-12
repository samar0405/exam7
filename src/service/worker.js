import http from "./config";

const worker = {
  create: (data) => http.post("/worker", data),
  get: () => http.get("/workers", { params: { page: 1, limit: 20 } }),
  delete: (id) => http.delete(`/worker/${id}`),
  update: (item) => http.put("/worker", item),
};

export default worker;
