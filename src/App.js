import "./styles/App.css";
import Maths from "./Components/Maths";
import Nav from "./Components/Nav";

function App() {
  return (
    <div className="app">
      {/* NAVBAR */}
      <Nav />
      {/* Question */}
      <Maths />
      {/* Answer */}
    </div>
  );
}

export default App;
