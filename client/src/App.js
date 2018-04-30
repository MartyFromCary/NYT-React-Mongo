import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Articles from "./pages/Articles";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Articles} />
    </div>
  </Router>
);

export default App;
