import AxiosInstances from ".";

const createService = async (data) => {
  return await AxiosInstances.post("/service", data);
};

const getAllServices = async () => {
  return await AxiosInstances.get("/service");
};

const editService = async (id, data) => {
  return await AxiosInstances.put("/service/" + id, data);
};
const getServicesByMentor = async () => {
  return await AxiosInstances.get(`/service`); // Call the route as defined in your backend
};

const getServiceById = async (id) => {
  return await AxiosInstances.get(`/service/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllServices, createService, editService, getServiceById, getServicesByMentor };
