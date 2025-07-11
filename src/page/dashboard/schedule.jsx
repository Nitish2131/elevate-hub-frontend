import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Modal, Button, Checkbox, message, Spin } from "antd";
import moment from "moment";
import Dashboard from "./dashboard";
import apiManager from "../../apiManger/availability";
import useUserStore from "../../store/user";

const Schedule = () => {
  const { user } = useUserStore();
  const userId = user?.id || user?._id;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("User from Zustand Store:", user);
  console.log("Extracted User ID:", userId);

  const fetchAvailability = useCallback(async () => {
    if (!userId) {
      console.warn("User ID is missing while fetching availability.");
      return;
    }

    try {
      setLoading(true);
      const response = await apiManager.getMentorAvailability(userId, 60); // GET /v1/availability/:id?durationInMinutes=60

      console.log("Fetched Availability Response:", response?.data);

      if (response?.data?.availability) {
        const booked = response.data.availability.flatMap((dayEntry) =>
          dayEntry.slots.map((slot) => ({
            date: dayEntry.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
          }))
        );

        setBookedSlots(booked);
      }
    } catch (error) {
      message.error("Failed to load availability.");
      console.error("Fetch Availability Error:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      message.error("User ID not found. Please log in again.");
      return;
    }
    fetchAvailability();
  }, [fetchAvailability, userId]); // ✅ Fixed: added userId to deps
  

  const handleSelectDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (moment(formattedDate).isBefore(moment().format("YYYY-MM-DD"))) return;

    setSelectedDate(formattedDate);
    setSelectedDates((prevDates) => [...new Set([...prevDates, formattedDate])]);
    setShowModal(true);
  };

  const handleScheduleSave = async () => {
    if (!selectedDate || !selectedSlots[selectedDate]?.length) {
      message.error("Please select a date and at least one time slot.");
      return;
    }

    const availabilityData = {
      weeklyAvailability: {
        [moment(selectedDate).format("dddd").toLowerCase()]: selectedSlots[selectedDate].map(
          (slot) => {
            const [startTime, endTime] = slot.split(" - ");
            return { startTime, endTime };
          }
        ),
      },
    };

    console.log("📤 Sending Availability Data:", JSON.stringify(availabilityData, null, 2));

    try {
      const response = await apiManager.createAvailability(availabilityData);
      console.log("✅ Availability saved:", response);

      message.success("Availability saved successfully!");

      setBookedSlots((prev) => [
        ...prev,
        ...selectedSlots[selectedDate].map((slot) => {
          const [startTime, endTime] = slot.split(" - ");
          return { date: selectedDate, startTime, endTime };
        }),
      ]);

      setShowModal(false);
      setSelectedSlots({});
    } catch (error) {
      console.error("❌ Failed to save availability:", error?.response?.data || error);
      message.error("Failed to save availability");
    }
  };

  const handleSlotChange = (date, slots) => {
    setSelectedSlots((prev) => ({ ...prev, [date]: slots }));
  };

  // ✅ FINAL UPDATED CELL RENDER: matches by full formatted date
  const cellRender = (value) => {
    const formattedDate = moment(value).format("YYYY-MM-DD");
    const bookedOnThisDate = bookedSlots.filter((slot) => slot.date === formattedDate);

    return bookedOnThisDate.length ? (
      <div className="space-y-1">
        {bookedOnThisDate.map((slot, index) => (
          <div key={index} className="bg-green-200 p-1 rounded text-xs text-center">
            {slot.startTime} - {slot.endTime}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <Dashboard>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Schedule Time Slots</h2>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Calendar cellRender={cellRender} onSelect={handleSelectDate} />
        )}

        <Modal
          title="Select Available Time Slots"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={handleScheduleSave}>
              Save Slots
            </Button>,
          ]}
        >
          {selectedDates.map((date) => (
            <div key={date} className="mb-4">
              <h4 className="font-semibold">{moment(date).format("dddd, MMMM D, YYYY")}</h4>
              <Checkbox.Group
                options={[
                  "9:00 AM - 9:59 AM",
                  "10:00 AM - 10:59 AM",
                  "11:00 AM - 11:59 AM",
                  "12:00 PM - 12:59 PM",
                ]}
                onChange={(slots) => handleSlotChange(date, slots)}
              />
            </div>
          ))}
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Schedule;
