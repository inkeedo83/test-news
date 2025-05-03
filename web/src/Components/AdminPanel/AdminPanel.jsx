// AdminPanel.jsx - Admin Panel for managing articles, tags, and weather API key
// -------------------------------------------------------------
// Imports
import { useState, useEffect } from "react";
import TagsManager from "../Tags/TagsManager";
import baseUrl from "../../assets/constants";
import { post, get, patch, del } from "../../services/api";
import { saveAuthToken } from "../../services/auth";
import PropTypes from "prop-types";
import { AUTH0_AUDIENCE } from "../../assets/env";

// -------------------------------------------------------------
// AdminPanel Component
export function AdminPanel({ getAccessTokenSilently }) {
  // -------------------- State Management --------------------
  // States for add, edit and delete functionalities
  const [addData, setAddData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
    isImportant: false,
    isVeryImportant: false,
    tags: "",
  });
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    image: null,
    isImportant: false,
    isVeryImportant: false,
    tags: "",
  });
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "info" });
  const [imagePreview, setImagePreview] = useState("");
  const [weatherApiKey, setWeatherApiKey] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "info" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // -------------------- Utility Functions --------------------
  // Update token before request
  const updateToken = async () => {
    try {
      console.log("AdminPanel: Getting a fresh access token...");
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      });
      console.log("AdminPanel: New token received, saving to localStorage");
      saveAuthToken(token);
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      setMessage({ text: "Error refreshing token", type: "error" });
      return false;
    }
  };

  // Handle authorization errors and retry if needed
  const handleAuthError = async (callback) => {
    try {
      return await callback();
    } catch (error) {
      if (error.message === "UNAUTHORIZED") {
        // If the token is invalid, try to update it and retry the request
        const tokenUpdated = await updateToken();
        if (tokenUpdated) {
          try {
            return await callback();
          } catch (retryError) {
            setMessage({
              text: "Authorization error. Please login again.",
              type: "error",
            });
            throw retryError;
          }
        } else {
          setMessage({
            text: "Authorization error. Please login again.",
            type: "error",
          });
          throw error;
        }
      }
      throw error;
    }
  };

  const validateImage = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPG, PNG and GIF images are allowed");
    }
    if (file.size > maxSize) {
      throw new Error("Image size should not exceed 5MB");
    }
  };

  const handleImageChange = async (file, setData) => {
    if (!file) return;

    try {
      setImageLoading(true);
      validateImage(file);

      // Create preview
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setData((prev) => ({ ...prev, image: file }));
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setImageLoading(false);
    }
  };

  // -------------------- Add Article Handlers --------------------
  // Handle input changes for add form
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: "", type: "info" });
  };

  // Handle image selection for add form
  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(file, setAddData);
  };

  // Handle checkbox changes for add form
  const handleAddCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setMessage("");
  };

  // Submit handler for adding an article
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (
      !addData.title.trim() ||
      !addData.content.trim() ||
      !addData.category.trim()
    ) {
      setMessage({ text: "العنوان والمحتوى والفئة مطلوبة", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(addData).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append("tagsIds", value.trim());
        } else if (key === "isImportant" || key === "isVeryImportant") {
          formData.append(key, value ? "true" : "false");
        } else {
          formData.append(key, value);
        }
      });
      await handleAuthError(async () => {
        await post("articles", formData);
      });
      setMessage({ text: "تم إضافة الخبر بنجاح", type: "success" });
      window.alert("تم إضافة الخبر بنجاح");
      setAddData({
        title: "",
        content: "",
        category: "",
        image: null,
        isImportant: false,
        isVeryImportant: false,
        tags: "",
      });
      setImagePreview("");
    } catch (err) {
      setMessage({
        text: err.message || "حدث خطأ أثناء إضافة الخبر",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Edit Article Handlers --------------------
  // Handle input changes for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: "", type: "info" });
  };

  // Handle image selection for edit form
  const handleEditImage = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(file, setEditData);
  };

  // Handle checkbox changes for edit form
  const handleEditCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setMessage("");
  };

  // Load article data for editing
  const loadArticle = async () => {
    if (!editData.id.trim()) {
      setMessage({ text: "الرجاء إدخال معرف الخبر للتحميل", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const article = await handleAuthError(async () => {
        return await get(`articles/${editData.id}`);
      });
      setEditData({
        id: editData.id,
        title: article.title || "",
        content: article.content || "",
        category: article.category || "",
        image: article.image || null,
        isImportant: article.isImportant,
        isVeryImportant: article.isVeryImportant,
        tags: Array.isArray(article.tags)
          ? article.tags.join(",")
          : article.tags || "",
      });
      if (article.image) {
        setImagePreview(article.image);
      }
      setMessage({ text: "تم تحميل الخبر بنجاح", type: "success" });
    } catch (err) {
      setMessage({
        text: err.message || "الخبر غير موجود",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit handler for editing an article
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      !editData.id.trim() ||
      !editData.title.trim() ||
      !editData.content.trim() ||
      !editData.category.trim()
    ) {
      setMessage({ text: "جميع الحقول مطلوبة للتعديل", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === "tags") {
            formData.append("tagsIds", value.trim());
          } else if (key === "isImportant" || key === "isVeryImportant") {
            formData.append(key, value); // Send boolean value directly
          } else if (key !== "id") {
            formData.append(key, value);
          }
        }
      });
      await handleAuthError(async () => {
        await patch(`articles/${editData.id}`, formData);
      });
      setMessage({ text: "تم تحديث الخبر بنجاح", type: "success" });
      window.alert("تم تحديث الخبر بنجاح");
      setImagePreview("");
    } catch (err) {
      setMessage({
        text: err.message || "حدث خطأ أثناء تحديث الخبر",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Delete Article Handler --------------------
  // Delete an article by ID
  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setMessage({ text: "الرجاء إدخال معرف الخبر للحذف", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await handleAuthError(async () => {
        await del(`articles/${deleteId}`);
      });
      setMessage({ text: "تم حذف الخبر بنجاح", type: "success" });
      window.alert("تم حذف الخبر بنجاح");
      setDeleteId("");
    } catch (err) {
      setMessage({
        text: err.message || "حدث خطأ أثناء حذف الخبر",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Weather API Key Handler --------------------
  // Update the weather API key
  const handleWeatherKeyUpdate = async (e) => {
    e.preventDefault();
    if (!weatherApiKey.trim()) {
      setMessage({ text: "يرجى إدخال مفتاح الطقس", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await handleAuthError(async () => {
        // Get a fresh token
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: AUTH0_AUDIENCE,
            scope: "openid profile email",
          },
        });
        await fetch("https://app-test-i.ru/api/key", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value: weatherApiKey }),
        });
      });
      setMessage({ text: "تم تحديث مفتاح الطقس بنجاح", type: "success" });
      window.alert("تم تحديث مفتاح الطقس بنجاح");
      setWeatherApiKey("");
    } catch (err) {
      setMessage({
        text: err.message || "حدث خطأ أثناء تحديث مفتاح الطقس",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Render UI
  return (
    <div className="max-w-4xl mx-auto pt-72 px-4">
      {/* -------------------- إضافة خبر Section -------------------- */}
      <section className="bg-teal-400 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-bold text-red-800 text-center mb-4">
          إضافة خبر
        </h1>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          {/* Title input */}
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            عنوان الخبر{" "}
          </p>
          <input
            type="text"
            name="title"
            value={addData.title}
            onChange={handleAddChange}
            placeholder="Title"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          {/* Content input */}
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            نص الخبر{" "}
          </p>
          <textarea
            name="content"
            value={addData.content}
            onChange={handleAddChange}
            placeholder="Content"
            className="w-full rounded-md bg-slate-400 p-2 min-h-[100px]"
          />
          {/* Category select */}
          <select
            name="category"
            value={addData.category}
            onChange={handleAddChange}
            className="w-full rounded-md bg-slate-400 p-2"
          >
            <option value="">Select Category</option>
            <option value="BRUSSELS">بروكسل</option>
            <option value="ANTWERP">انتورب</option>
            <option value="LIEGE">لياج</option>
            <option value="FLANDERS">فلاندرز</option>
            <option value="WALLONIA">والونيا</option>
            <option value="GERMANOPHONE">جرمانوفون</option>
            <option value="POLITIC">سياسة</option>
            <option value="ECONOMIC">اقتصاد</option>
            <option value="LAW">قوانين</option>
            <option value="ACCIDENT">حوادث</option>
            <option value="CULTURE">ثقافة</option>
            <option value="HEALTH">صحة</option>
            <option value="EDUCATION">تعليم</option>
            <option value="ARAB_COMMUNITY_NEWS"> هجره و لجوء </option>
            <option value="LOCAL_EVENTS">محليات</option>
          </select>
          {/* Image input */}
          <input
            type="file"
            onChange={handleAddImage}
            className="w-full text-white rounded-xl bg-red-800 p-3"
          />
          {/* Important checkboxes */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isImportant"
              checked={addData.isImportant}
              onChange={handleAddCheckboxChange}
            />
            <span>خبر هام</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVeryImportant"
              checked={addData.isVeryImportant}
              onChange={handleAddCheckboxChange}
            />
            <span>خبر مهم جدا </span>
          </label>
          {/* Tags input */}
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            tag Id{" "}
          </p>
          <input
            type="text"
            name="tags"
            value={addData.tags}
            onChange={handleAddChange}
            placeholder="أدخل الوسوم (مثال: politics, economy)"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          {/* Image preview */}
          {imagePreview && (
            <div className="bg-slate-600 p-4 rounded text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-[200px] mx-auto"
              />
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700"
          >
            {loading ? "جاري الإضافة..." : "إضافة الخبر"}
          </button>
        </form>
      </section>

      {/* -------------------- تعديل خبر Section -------------------- */}
      <section className="bg-orange-300 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-bold text-red-800 text-center mb-4">
          تعديل خبر
        </h1>
        {/* Article ID input and load button */}
        <div className="mb-4">
          <input
            type="text"
            name="id"
            value={editData.id}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, id: e.target.value }))
            }
            placeholder="Article ID"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          <button
            onClick={loadArticle}
            disabled={loading}
            className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700 mt-2"
          >
            {loading ? "جاري التحميل..." : "تحميل الخبر"}
          </button>
        </div>
        <p className="text-sm font-bold text-red-800 text-center mb-4">
          {" "}
          عنوان الخبر بعد التعديل{" "}
        </p>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {/* Title input */}
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            placeholder="Title"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          {/* Content input */}
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            نص الخبر بعد التعديل{" "}
          </p>
          <textarea
            name="content"
            value={editData.content}
            onChange={handleEditChange}
            placeholder="Content"
            className="w-full rounded-md bg-slate-400 p-2 min-h-[100px]"
          />
          {/* Category select */}
          <select
            name="category"
            value={editData.category}
            onChange={handleEditChange}
            className="w-full rounded-md bg-slate-400 p-2"
          >
            <option value="BRUSSELS">بروكسل</option>
            <option value="ANTWERP">انتورب</option>
            <option value="LIEGE">لياج</option>
            <option value="FLANDERS">فلاندرز</option>
            <option value="WALLONIA">والونيا</option>
            <option value="GERMANOPHONE">جرمانوفون</option>
            <option value="POLITIC">سياسة</option>
            <option value="ECONOMIC">اقتصاد</option>
            <option value="LAW">قوانين</option>
            <option value="ACCIDENT">حوادث</option>
            <option value="CULTURE">ثقافة</option>
            <option value="HEALTH">صحة</option>
            <option value="EDUCATION">تعليم</option>
            <option value="ARAB_COMMUNITY_NEWS">هجره و لجوء </option>
            <option value="LOCAL_EVENTS">محليات</option>
          </select>
          {/* Image input */}
          <input
            type="file"
            onChange={handleEditImage}
            className="w-full text-white rounded-xl bg-red-800 p-3"
          />
          {/* Important checkboxes */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isImportant"
              checked={editData.isImportant}
              onChange={handleEditCheckboxChange}
            />
            <span>خبر هام</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVeryImportant"
              checked={editData.isVeryImportant}
              onChange={handleEditCheckboxChange}
            />
            <span>خبر مهم جدا </span>
          </label>
          {/* Tags input */}
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            tag Id{" "}
          </p>
          <input
            type="text"
            name="tags"
            value={editData.tags}
            onChange={handleEditChange}
            placeholder="أدخل الوسوم (مثال: politics, economy)"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          {/* Image preview */}
          {imagePreview && (
            <div className="bg-slate-600 p-4 rounded text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-[200px] mx-auto"
              />
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700"
          >
            {loading ? "جاري التعديل..." : "تعديل الخبر"}
          </button>
        </form>
      </section>

      {/* -------------------- رسالة الحالة -------------------- */}
      {message.text && (
        <div
          className={`p-3 rounded mb-4 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* -------------------- حذف خبر Section -------------------- */}
      <section className="bg-red-300 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-red-800 text-center mb-4">
          حذف خبر
        </h1>
        <input
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="Article ID"
          className="w-full rounded-md bg-slate-400 p-2 mb-4"
        />
        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700"
        >
          {loading ? "جاري الحذف..." : "حذف الخبر"}
        </button>
      </section>

      {/* -------------------- Tags Manager Section -------------------- */}
      <section className="mt-8">
        <TagsManager getAccessTokenSilently={getAccessTokenSilently} />
      </section>

      {/* -------------------- Weather API Key Section -------------------- */}
      <section className="bg-blue-300 p-6 rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-red-800 text-center mb-4">
          تحديث مفتاح API للطقس
        </h1>
        <form onSubmit={handleWeatherKeyUpdate} className="space-y-4">
          <input
            type="text"
            value={weatherApiKey}
            onChange={(e) => setWeatherApiKey(e.target.value)}
            placeholder="Weather API Key"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700"
          >
            {loading ? "جاري التحديث..." : "تحديث مفتاح API"}
          </button>
        </form>
      </section>
    </div>
  );
}

// PropTypes for AdminPanel
AdminPanel.propTypes = {
  getAccessTokenSilently: PropTypes.func.isRequired,
};

export default AdminPanel;
