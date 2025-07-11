import React from "react";
import { FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle card click
  const onCardClick = () => {
    // Navigate to MentorDetails page, passing the username
    navigate(`/mentor/${mentor?.username}`);
  };

  return (
    <div
      onClick={onCardClick} // Trigger navigation on click
      className="relative transition-transform transform bg-white border rounded-full shadow-md cursor-pointer hover:scale-105 hover:shadow-xl w-80 h-80 flex flex-col justify-center items-center"
    >
      <div className="relative group w-40 h-40 rounded-full overflow-hidden shadow-md">
        <img
          src={
            mentor?.photoUrl ||
            `https://ui-avatars.com/api?name=${mentor?.name}`
          }
          alt={`${mentor?.name}'s avatar`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full p-2 text-center text-white">
          <h4 className="text-lg font-bold group-hover:text-yellow-400">
            {mentor?.profile?.title || "Title"}
          </h4>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="py-2 text-2xl font-bold text-gray-800 group-hover:text-yellow-600">
          {mentor?.name || "Name"}
        </h3>
        <div className="flex items-center justify-center gap-x-2 mt-2">
          <FaUniversity className="text-yellow-600" />
          <p className="text-sm text-gray-600">
            {mentor?.profile?.college || "College"}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {mentor?.profile?.tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full hover:bg-yellow-200"
              >
                {tag || "Tag"}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
