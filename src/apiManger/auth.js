import AxiosInstances from ".";

const signup = (data) => {
  return AxiosInstances.post("/auth/signup", data);
};

const signin = (data) => {
  return AxiosInstances.post("/auth/signin", data);
};

// ✅ Fix: assign object to variable before default export
const authAPI = {
  signup,
  signin,
};

export default authAPI;
