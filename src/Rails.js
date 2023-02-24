import React, { useContext } from "react";
import { BoardContext } from "./KBoard";
import CardItem from "./CardItem";
function Rails(props) {
  const { taskState, onDragStartHandler, onDragOverHandler } =
    useContext(BoardContext);
  return (
    <>
      {taskState
        .filter((x) => x.stage === props.stage.id)
        .map((item, index) => (
          <div
            draggable
            key={index}
            onDragStart={(event) =>
              onDragStartHandler(event, item.id, props.stage.id)
            }
            onDragOver={(event) => onDragOverHandler(event)}
          >
            <CardItem task={item} />
          </div>
        ))}
    </>
  );
}

export default Rails;
