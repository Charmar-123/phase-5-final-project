import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
import WorkoutCard from "./WorkoutCard";

const Grid = () => {
  const [items, setItems] = React.useState([
    
    1,
    2,
    3,
    

  ]);
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
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
            <GridItem key={item} className="griditemUI">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <WorkoutCard/>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
}

export default Grid