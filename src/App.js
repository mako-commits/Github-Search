import "./App.css";
import Results from "./components/Results/Results";
import Search from "./components/Search/Search";
import { useState } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="container">
      <Search setInputValue={setInputValue} />
      <Results inputValue={inputValue} />
    </div>
  );
}

export default App;
