import { useState } from "react";
import { post } from "../../services/api";
import { Link } from "react-router-dom";

export default function NewsletterUnsubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unsubscribedEmail, setUnsubscribedEmail] = useState("");

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("الرجاء إدخال عنوان البريد الإلكتروني");
      return;
    }

    setLoading(true);
    try {
      await post("/public/unsubscribe", { email });
      setUnsubscribedEmail(email);
      setSuccess(true);
      setStatus("تم إلغاء اشتراكك بنجاح من النشرة الإخبارية");
      setEmail("");
    } catch (error) {
      if (error.message.includes("404")) {
        setStatus("لم يتم العثور على هذا البريد الإلكتروني في قائمة المشتركين");
      } else {
        setStatus("حدث خطأ. يرجى المحاولة مرة أخرى.");
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-950 to-zinc-900 p-4 ">
      <div className="w-full max-w-md mt-10 bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            إلغاء الاشتراك من النشرة الإخبارية
          </h2>
          <p className="text-red-100 text-sm">
            نأسف لرؤيتك تغادر. أدخل بريدك الإلكتروني لإلغاء الاشتراك من النشرة
            الإخبارية.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleUnsubscribe} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full px-4 py-3 bg-white/10 border border-red-400 text-white rounded-lg 
                  focus:ring-2 focus:ring-red-300 focus:border-transparent 
                  placeholder:text-red-200"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg
                hover:bg-red-700 transition duration-150 disabled:opacity-50"
            >
              {loading ? "جاري إلغاء الاشتراك..." : "إلغاء الاشتراك"}
            </button>
          </form>
        ) : (
          <div className="bg-green-500/20 text-green-100 p-4 rounded-lg">
            <p className="mb-4">
              تم إلغاء اشتراك البريد: {unsubscribedEmail} بنجاح
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-block mt-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg
                  hover:bg-red-700 transition duration-150"
              >
                العودة إلى الصفحة الرئيسية
              </Link>
              <button
                onClick={resetForm}
                className="inline-block mt-2 px-6 py-2 bg-red-600/50 text-white font-semibold rounded-lg
                  hover:bg-red-700 transition duration-150"
              >
                إلغاء اشتراك بريد آخر
              </button>
            </div>
          </div>
        )}

        {status && !success && (
          <div className="mt-6 text-sm text-center">
            <p className="p-3 rounded-lg bg-red-500/20 text-red-100">
              {status}
            </p>
          </div>
        )}

        {!success && (
          <div className="mt-8 text-center text-xs text-red-200">
            <Link to="/" className="hover:text-white underline">
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
