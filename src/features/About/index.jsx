import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

About.propTypes = {};

function About(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default About;
