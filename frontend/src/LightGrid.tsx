import Light from "./Light";
import "./LightGrid.css";

export default function LightGrid() {
  const grid = [];
  for (let y = 0; y < 3; y++) {
    const row = [];
    for (let x = 0; x < 5; x++) {
      row.push(<Light key={x} x={x} y={y} />);
    }
    grid.push(
      <div key={y} className="LightRow">
        {row}
      </div>
    );
  }
  return (
    <div className="LightGrid">
      <h1>All lights</h1>
      {grid}
    </div>
  );
}
