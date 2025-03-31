import { useState } from "react";
import { post } from "../../services/api";
import { Link } from "react-router-dom";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("الرجاء إدخال عنوان البريد الإلكتروني");
      return;
    }

    setLoading(true);
    try {
      await post("/public/subscribe", { email });
      setSubscribedEmail(email);
      setSuccess(true);
      setStatus("تم الاشتراك بنجاح في النشرة الإخبارية!");
      setEmail("");
    } catch (error) {
      setStatus("حدث خطأ. يرجى المحاولة مرة أخرى.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setStatus("");
  };

  return (
    <div className="bg-gradient-to-r from-red-950 to-zinc-900 w-full py-4 mt-52 sm:py-6 px-2 sm:px-4 relative overflow-hidden">
      <div className="relative text-center max-w-6xl mx-auto px-2">
        <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-red-200 border border-red-300 rounded-full mb-3 sm:mb-4 inline-block">
          اشترك في النشرة الإخبارية
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
          ابقى على اطلاع على اخر المستجدات
        </h2>
        <p className="text-red-100 mb-4 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto">
          اضف بريدك الإلكتروني لتصلك أحدث الأخبار والمقالات من موقعنا
        </p>

        {!success ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row items-center justify-center sm:gap-3 max-w-2xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ادخل بريدك الإلكتروني"
              className="w-full sm:w-96 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white/10 border border-red-400 text-white rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-red-200"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-white text-red-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-red-50 transition duration-150 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "جاري الاشتراك..." : "اشترك"}
            </button>
          </form>
        ) : (
          <div className="bg-green-500/20 text-green-100 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="mb-2">
              تم الاشتراك بنجاح! سيصلك آخر الأخبار على البريد: {subscribedEmail}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
              <p className="text-xs">
                يمكنك{" "}
                <Link
                  to="/newsletter/unsubscribe"
                  className="text-white underline"
                >
                  إلغاء الاشتراك
                </Link>{" "}
                في أي وقت
              </p>
              <button
                onClick={resetForm}
                className="text-xs text-white underline mt-2 sm:mt-0"
              >
                إضافة بريد إلكتروني آخر
              </button>
            </div>
          </div>
        )}

        {status && !success && (
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-red-200 bg-red-500/10 py-2 sm:py-3 px-4 sm:px-6 rounded-lg inline-block border border-red-400/20">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
