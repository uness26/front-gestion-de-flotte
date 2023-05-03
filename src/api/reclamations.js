import api from "./api";

export const createReclamation = (body) => {
  return api.post("/reclamations", body);
};
export const getReclamations = () => {
    return api.get("/reclamations");
}

export const getReclamationById = (id) => {
  return api.get(`/reclamations/${id}`);
};

export const updateReclamation = (id, body) => {
  return api.patch(`/reclamations/${id}`, body);
};

export const deleteReclamation = (id) => {
  return api.delete(`/reclamations/${id}`);
};