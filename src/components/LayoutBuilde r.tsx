import React, { useState } from "react";
import Split from "react-split";

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Partition = ({ color, onSplitVertical, onSplitHorizontal, onRemove }) => {
  return (
    <div style={{ backgroundColor: color, flexGrow: 1, position: "relative" }}>
      <button onClick={onSplitVertical}>V</button>
      <button onClick={onSplitHorizontal}>H</button>
      <button onClick={onRemove}>-</button>
    </div>
  );
};

const LayoutBuilder = () => {
  const [partitions, setPartitions] = useState([{ id: 1, color: randomColor() }]);

  const splitVertical = (id) => {
    // Implement splitting logic
  };

  const splitHorizontal = (id) => {
    // Implement splitting logic
  };

  const removePartition = (id) => {
    // Implement removal logic
  };

  return (
    <Split sizes={[50, 50]} minSize={100} direction="horizontal" style={{ height: "100vh" }}>
      {partitions.map((partition) => (
        <Partition
          key={partition.id}
          color={partition.color}
          onSplitVertical={() => splitVertical(partition.id)}
          onSplitHorizontal={() => splitHorizontal(partition.id)}
          onRemove={() => removePartition(partition.id)}
        />
      ))}
    </Split>
  );
};

export default LayoutBuilder;
