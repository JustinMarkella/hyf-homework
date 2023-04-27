export default function BorderComponent({ children }) {
  const BorderComponentStyle = {
    border: "3px solid black",
    margin: "10px 0px",
    padding: "5px",
  };
  return <div style={BorderComponentStyle}>{children}</div>;
}
