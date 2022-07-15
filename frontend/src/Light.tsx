import "./Light.css";
type LightParams = {
  x: number;
  y: number;
};
export default function Light({ x, y }: LightParams) {
  return (
    <div className="Light">
      [{x}, {y}]
      <p>
        <small>loading</small>
      </p>
    </div>
  );
}
