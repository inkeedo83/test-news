import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import ReadArticleByID from "../ReadArtical/ReadArticleByID";
import ReadArticleByCat from "../ReadArtical/ReadArticleByCat";
import PageNotFound from "../InvalidPath/PageNotFound";

function App() {
  return (
    <div className="relative min-h-screen bg-white ">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/articles/:id" element={<ReadArticleByID />} />
        <Route path="/categories/:id" element={<ReadArticleByCat />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
