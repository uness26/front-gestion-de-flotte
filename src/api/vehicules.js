import api from "./api";

export const createVehicule = (body) => {
  return api.post("/Vehicules", body);
};
export const getVehicules = () => {
    return api.get("/Vehicules");
}

export const getVehiculeById = (id) => {
  return api.get(`/Vehicules/${id}`);
};

export const updateVehicule = (id, body) => {
  return api.patch(`/Vehicules/${id}`, body);
};

export const deleteVehicule = (id) => {
  return api.delete(`/Vehicules/${id}`);
};