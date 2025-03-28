import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { DarkModeProvider } from "../../context/DarkModeContext";
import Auth0ProviderWithHistory from "../Auth0ProviderWithHistory/Auth0ProviderWithHistory";

// Lazy load components
const MainPage = React.lazy(() => import("../MainPage/MainPage"));
const ReadArticleByID = React.lazy(() =>
  import("../ReadArtical/ReadArticleByID")
);
const ReadArticleByCat = React.lazy(() =>
  import("../ReadArtical/ReadArticleByCat")
);
const PageNotFound = React.lazy(() => import("../InvalidPath/PageNotFound"));
const SearchResulte = React.lazy(() => import("../Search/SearchResulte"));
const SearchInvalidResulte = React.lazy(() =>
  import("../Search/SearchInvalidResulte")
);
const AdminProtectedRoute = React.lazy(() =>
  import("../AdminProtectedRoute/AdminProtectedRoute")
);
const NewsletterUnsubscribe = React.lazy(() =>
  import("../NewsletterUnsubscribe/NewsletterUnsubscribe")
);

function App() {
  return (
    <DarkModeProvider>
      <Auth0ProviderWithHistory>
        <div className="bg-slate-100 dark:bg-black">
          <Navbar />
          <Suspense
            fallback={<div className="text-center p-4">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Admin?" element={<AdminProtectedRoute />} />
              <Route path="/articles/:id" element={<ReadArticleByID />} />
              <Route path="/categories/:id" element={<ReadArticleByCat />} />
              <Route path="/articles/pattern/:id" element={<SearchResulte />} />
              <Route
                path="/articles/pattern/??"
                element={<SearchInvalidResulte />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Auth0ProviderWithHistory>
    </DarkModeProvider>
  );
}

export default App;
