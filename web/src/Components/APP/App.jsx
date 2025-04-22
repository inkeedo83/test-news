import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { DarkModeProvider } from "../../context/DarkModeContext";
import { LanguageProvider } from "../../context/LanguageContext";
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
const PrivacyPolicy = React.lazy(() =>
  import("../../pages/privacy-policy.jsx")
);
const ContactUs = React.lazy(() => import("../../pages/contact-us.jsx"));
const WhoAreWe = React.lazy(() => import("../../pages/who-are-we.jsx"));
const PrayerTime = React.lazy(() => import("../PrayerTime/PrayerTime"));
import Weather from "../Weather/DaysWeather.jsx";

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
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
                <Route
                  path="/articles/pattern/:id"
                  element={<SearchResulte />}
                />
                <Route
                  path="/articles/pattern/??"
                  element={<SearchInvalidResulte />}
                />
                <Route
                  path="/newsletter/unsubscribe"
                  element={<NewsletterUnsubscribe />}
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/who-are-we" element={<WhoAreWe />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/prayer" element={<PrayerTime />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Auth0ProviderWithHistory>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
