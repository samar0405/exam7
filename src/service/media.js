import http from "./config";

const media = {
  upload: (product_id, data) =>
    http.post(`/media/upload-photo?id=${product_id}`, data),
  get: (product_d) => http.get(`/media/${product_d}`),
  delete: (id) => http.delete(`/media/${id}`),
};

export default media;
