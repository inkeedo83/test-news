import { useState } from "react";
import axios from "axios";
import BeReporter from "../../assets/BeReporter.png";

export function AdminPanel() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [delId, setDelId] = useState("");

  const validateForm = () => {
    if (!formData.title.trim()) return "العنوان مطلوب";
    if (!formData.content.trim()) return "نص الخبر مطلوب";
    if (!formData.category) return "الفئة مطلوبة";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", category: "", image: null });
    setImagePreview("");
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      await axios.post("https://app-test-i.ru/api/articles", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("تم نشر الخبر بنجاح");
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء نشر الخبر");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!delId.trim()) {
      setError("الرجاء إدخال معرف الخبر");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`https://app-test-i.ru/api/articles/${delId}`);
      setSuccess("تم حذف الخبر بنجاح");
      setDelId("");
    } catch (err) {
      setError("حدث خطأ أثناء حذف الخبر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6 px-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3  rounded mb-4">
          {success}
        </div>
      )}

      <h1 className="text-2xl  mt-72 font-bold text-red-800 text-center mb-8">
        واجهة الادمن
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-orange-300 p-6 rounded-lg space-y-4"
      >
        <div>
          <label className="block text-red-800 mb-2">الفئات</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-400 p-2"
          >
            <option value="">اختر الفئة</option>
            <option value="BRUSSELS">بروكسل</option>
            <option value="ANTWERP">انتورب</option>
            <option value="LIEGE">لياج</option>
            <option value="FLANDERS">فلاندرز</option>
            <option value="WALLONIA">والونيا</option>
            <option value="GERMANOPHONE">جرمانوفون</option>
            <option value="LAW">قوانين</option>
            <option value="ECONOMIC">اقتصاد و مال</option>
            <option value="ACCIDENT">حوادث و جريمه</option>
            <option value="CULTURE">ثقافه</option>
          </select>
        </div>

        <div>
          <label className="block text-red-800 mb-2">العنوان</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-400 p-2"
            type="text"
          />
        </div>

        <div>
          <label className="block text-red-800 mb-2">نص الخبر</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-400 p-2 min-h-[200px]"
          />
        </div>

        <div>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-white rounded-xl bg-red-800 p-3"
          />
        </div>

        {imagePreview && (
          <div className="bg-slate-600 p-4 rounded">
            <p className="text-white mb-2">معاينة الخبر</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-[400px] max-h-[400px] object-contain mx-auto"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "جاري النشر..." : "اضف الخبر"}
        </button>
      </form>

      <div className="mt-8 bg-orange-300 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">حذف خبر</h2>
        <input
          type="text"
          value={delId}
          onChange={(e) => setDelId(e.target.value)}
          placeholder="ادخل معرف الخبر"
          className="w-full rounded-md bg-slate-400 p-2 mb-4"
        />
        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "جاري الحذف..." : "حذف الخبر"}
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
