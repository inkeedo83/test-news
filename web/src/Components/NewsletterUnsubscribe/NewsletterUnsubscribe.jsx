import { useState } from "react";
import { post } from "../../services/api";
export default function NewsletterUnsubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("الرجاء إدخال عنوان البريد الإلكتروني");
      return;
    }

    setLoading(true);
    try {
      // Here you would make the API call to unsubscribe
      // const response = await fetch('/api/unsubscribe', {...})

      setStatus("تم إلغاء اشتراكك بنجاح من النشرة الإخبارية");
      setEmail(email);
      await post("/public/unsubscribe", { email });
    } catch (error) {
      setStatus("حدث خطأ. يرجى المحاولة مرة أخرى.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

        {status && (
          <div className="mt-6 text-sm text-center">
            <p
              className={`p-3 rounded-lg ${
                status.includes("بنجاح")
                  ? "bg-green-500/20 text-green-100"
                  : "bg-red-500/20 text-red-100"
              }`}
            >
              {status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
