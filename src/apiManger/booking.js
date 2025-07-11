import AxiosInstances from ".";

// 🔹 Booking API Calls
const bookService = async (data) => {
  return await AxiosInstances.post("/booking/initiate-booking", data);
};

const getMentorBookings = async () => {
  return await AxiosInstances.get("/booking/mentor");
};

const getStudentBookings = async () => {
  return await AxiosInstances.get("/booking/");
};

const booking = {
  bookService,
  getMentorBookings,
  getStudentBookings, // ✅ Fixed typo from getStudentBookigs
};

export default booking;
