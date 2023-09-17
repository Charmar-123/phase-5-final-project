import React from "react";
import ViewExerciseCard from "./ViewExerciseCard";

const ExerciseList = ({ items }) => {
  const cardStyle = {
    marginRight: "30px", // Adjust this value to control the spacing
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {items.map((item, index) => (
        <div key={item.id} style={index !== items.length - 1 ? cardStyle : {}}>
          <ViewExerciseCard selectedExercise={item} />
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
