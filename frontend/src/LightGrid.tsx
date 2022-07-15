import Light from "./Light";
import "./LightGrid.css";

export default function LightGrid() {
  const grid = [];
  for (let y = 0; y < 3; y++) {
    const row = [];
    for (let x = 0; x < 3; x++) {
      row.push(<Light x={x} y={y} />);
    }
    grid.push(<div className="LightRow">{row}</div>);
  }
  return (
    <div className="LightGrid">
      <h1>All lights</h1>
      {grid}
    </div>
  );
}
