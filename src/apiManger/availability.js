import AxiosInstances from ".";

// 🔹 Create Mentor Availability
const createAvailability = async (availabilityData) => {
  return await AxiosInstances.post("/availability", availabilityData);
};

// 🔹 Get Mentor Availability (defaults to 60 minutes if not provided)
const getMentorAvailability = async (mentorId, durationInMinutes = 60) => {
  return await AxiosInstances.get(
    `/availability/${mentorId}?durationInMinutes=${durationInMinutes}`
  );
};

export default {
  createAvailability,
  getMentorAvailability,
};
