import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
import ExerciseCard from "./ExerciseCard";

const Grid = ({items, updateExerciseOrder}) => {

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    // setItems(nextState);
    updateExerciseOrder(nextState)

  }

  return (
    <div className="App">
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={4}
          rowHeight={500}
          style={{ height: "400px" }}
        >
          {items.map((item) => (
            <GridItem key={item.id} className="griditemUI">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ExerciseCard
                
                selectedExercise={item}
              />
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
}

export default Grid
