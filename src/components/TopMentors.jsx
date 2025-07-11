import React, { useEffect, useState, useCallback } from "react";
import MentorCard from "./MentorCard";
import mentorAPI from "../apiManger/mentor";
import useMentorStore from "../store/mentors";
import { NavLink } from "react-router-dom";
import { Button, Spin } from "antd";

const TopMentors = () => {
  const { setMentorsData } = useMentorStore();
  const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get 4 random mentors from the array
  const selectTopMentors = useCallback((mentors) => {
    const selected = [];
    const totalMentors = mentors.length;

    while (selected.length < 4 && selected.length < totalMentors) {
      const randomIndex = Math.floor(Math.random() * totalMentors);
      const randomMentor = mentors[randomIndex];

      if (!selected.includes(randomMentor)) {
        selected.push(randomMentor);
      }
    }
    return selected;
  }, []);

  const fetchAllMentors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await mentorAPI.getAllMentors();
      const allMentors = response?.data?.mentors || [];
      setMentorsData(allMentors);
      setTopMentors(selectTopMentors(allMentors));
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  }, [setMentorsData, selectTopMentors]);

  useEffect(() => {
    fetchAllMentors();
  }, [fetchAllMentors]);

  return (
    <div className="container mx-auto my-10">
      <h2 className="mb-8 text-3xl font-bold text-center text-green-700">
        Top Mentors
      </h2>
      {loading ? (
        <div className="flex justify-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {topMentors.map((mentor) => (
            <MentorCard mentor={mentor} key={mentor?._id} />
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <NavLink to="/mentors">
          <Button
            type="default"
            style={{
              background: "linear-gradient(135deg, #d4f8e8, #b0f2c2)",
              color: "#1b5e20",
              padding: "12px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "25px",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #a8e6cf, #7ddc99)";
              e.target.style.color = "white";
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #d4f8e8, #b0f2c2)";
              e.target.style.color = "#1b5e20";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            View All
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default TopMentors;
