import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import ReadArticleByID from "../ReadArtical/ReadArticleByID";
import ReadArticleByCat from "../ReadArtical/ReadArticleByCat";
import PageNotFound from "../InvalidPath/PageNotFound";
import SearchResulte from "../Search/SearchResulte";
import SearchInvalidResulte from "../Search/SearchInvalidResulte";
import { useState } from "react";
import AdminProtectedRoute from "../AdminProtectedRoute/AdminProtectedRoute";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);
  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="relative min-h-screen  transition-colors  duration 300  bg-slate-100 dark:bg-slate-950">
        <Navbar DarkTheme={darkMode} changeDarkTheme={setDarkMode} />
        <Routes onUpdate={() => window.scrollTo(0, 0)}>
          <Route path="/" element={<MainPage />} />
          <Route path="/Admin?" element={<AdminProtectedRoute />} />
          <Route path="/articles/:id" element={<ReadArticleByID />} />
          <Route path="/categories/:id" element={<ReadArticleByCat />} />
          <Route path="/articles/pattern/:id" element={<SearchResulte />} />
          <Route
            path="/articles/pattern/??"
            element={<SearchInvalidResulte />}
          />
          {/**page not found path  */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
