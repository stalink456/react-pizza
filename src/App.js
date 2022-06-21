import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";

import "./scss/app.scss";

export const AppContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <Router>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/notfound" element={<NotFound />} />
            </Routes>{" "}
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
