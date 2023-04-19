

// import layout page
import Layout from "./Layout";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Layout>

    <div className="App">
      <h1>Surfer App</h1>
      
      {/* <Login /> */}
    </div>
    </Layout>
  );
}

export default App;

