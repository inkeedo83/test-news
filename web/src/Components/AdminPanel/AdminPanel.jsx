import { useState } from "react";
import TagsManager from "../Tags/TagsManager";
import baseUrl from "../../assets/constants";
import { post, get, patch, del } from "../../services/api";
import { saveAuthToken } from "../../services/auth";
import PropTypes from "prop-types";
import { AUTH0_AUDIENCE } from "../../assets/env";

export function AdminPanel({ getAccessTokenSilently }) {
  // States for add, edit and delete functionalities
  const [addData, setAddData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
    isImportant: false,
    tags: "",
  });
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    image: null,
    isImportant: false,
    tags: "",
  });
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Function to update token before request
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
      return false;
    }
  };

  // Function for handling authorization errors
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
            setMessage("Authorization error. Please login again.");
            throw retryError;
          }
        } else {
          setMessage("Authorization error. Please login again.");
          throw error;
        }
      }
      throw error;
    }
  };

  // Handlers for Add functionality
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCheckboxChange = (e) => {
    setAddData((prev) => ({ ...prev, isImportant: e.target.checked }));
    setMessage("");
  };

  // Updated function for adding an article
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (
      !addData.title.trim() ||
      !addData.content.trim() ||
      !addData.category.trim()
    ) {
      setMessage("العنوان والمحتوى والفئة مطلوبة");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(addData).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append("tagsIds", value.trim());
        } else {
          formData.append(
            key,
            typeof value === "boolean" ? value.toString() : value
          );
        }
      });

      // Using new API function with authorization error handling
      await handleAuthError(async () => {
        await post("articles", formData);
      });

      setMessage("تم إضافة الخبر بنجاح");
      setAddData({
        title: "",
        content: "",
        category: "",
        image: null,
        isImportant: false,
        tags: "",
      });
      setImagePreview("");
    } catch (err) {
      setMessage(err.message || "حدث خطأ أثناء إضافة الخبر");
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Edit functionality
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleEditImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditCheckboxChange = (e) => {
    setEditData((prev) => ({ ...prev, isImportant: e.target.checked }));
    setMessage("");
  };

  // Updated function for loading an article
  const loadArticle = async () => {
    if (!editData.id.trim()) {
      setMessage("الرجاء إدخال معرف الخبر للتحميل");
      return;
    }
    setLoading(true);
    try {
      // Using new API function with authorization error handling
      const article = await handleAuthError(async () => {
        return await get(`articles/${editData.id}`);
      });

      setEditData({
        id: editData.id,
        title: article.title || "",
        content: article.content || "",
        category: article.category || "",
        image: null,
        isImportant: article.isImportant || false,
        tags: article.tags || "",
      });
      if (article.image) {
        setImagePreview(`${baseUrl}/image/${article.image}`);
      }
      setMessage("تم تحميل الخبر بنجاح");
    } catch (err) {
      setMessage(err.message || "الخبر غير موجود");
    } finally {
      setLoading(false);
    }
  };

  // Updated function for editing an article
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      !editData.id.trim() ||
      !editData.title.trim() ||
      !editData.content.trim() ||
      !editData.category.trim()
    ) {
      setMessage("جميع الحقول مطلوبة للتعديل");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      ["title", "content", "category", "image", "isImportant", "tags"].forEach(
        (key) => {
          if (editData[key] !== null && editData[key] !== undefined) {
            if (key === "tags") {
              formData.append("tagsIds", editData[key].trim());
            } else {
              formData.append(
                key,
                typeof editData[key] === "boolean"
                  ? editData[key].toString()
                  : editData[key]
              );
            }
          }
        }
      );

      // Using new API function with authorization error handling
      await handleAuthError(async () => {
        await patch(`articles/${editData.id}`, formData);
      });

      setMessage("تم تحديث الخبر بنجاح");
      setEditData({
        id: "",
        title: "",
        content: "",
        category: "",
        image: null,
        isImportant: false,
        tags: "",
      });
      setImagePreview("");
    } catch (err) {
      setMessage(err.message || "حدث خطأ أثناء تحديث الخبر");
    } finally {
      setLoading(false);
    }
  };

  // Updated function for deleting an article
  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setMessage("الرجاء إدخال معرف الخبر للحذف");
      return;
    }
    setLoading(true);
    try {
      // Using new API function with authorization error handling
      await handleAuthError(async () => {
        await del(`articles/${deleteId}`);
      });

      setMessage("تم حذف الخبر بنجاح");
      setDeleteId("");
    } catch (err) {
      setMessage(err.message || "حدث خطأ أثناء حذف الخبر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-72 px-4">
      {/* إضافة خبر Section */}
      <section className="bg-teal-400 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-bold text-red-800 text-center mb-4">
          إضافة خبر
        </h1>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          {/* ...existing input fields... */}
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
          </select>
          <input
            type="file"
            onChange={handleAddImage}
            className="w-full text-white rounded-xl bg-red-800 p-3"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={addData.isImportant}
              onChange={handleAddCheckboxChange}
            />
            <span>خبر هام</span>
          </label>
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            tag Id{" "}
          </p>
          {/* New input field for tags */}
          <input
            type="text"
            name="tags"
            value={addData.tags}
            onChange={handleAddChange}
            placeholder="أدخل الوسوم (مثال: politics, economy)"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          {imagePreview && (
            <div className="bg-slate-600 p-4 rounded text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-[200px] mx-auto"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700"
          >
            {loading ? "جاري الإضافة..." : "إضافة الخبر"}
          </button>
        </form>
      </section>
      {/* تعديل خبر Section */}
      <section className="bg-orange-300 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-bold text-red-800 text-center mb-4">
          تعديل خبر
        </h1>

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
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            placeholder="Title"
            className="w-full rounded-md bg-slate-400 p-2"
          />
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
          </select>
          <input
            type="file"
            onChange={handleEditImage}
            className="w-full text-white rounded-xl bg-red-800 p-3"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editData.isImportant}
              onChange={handleEditCheckboxChange}
            />
            <span>خبر هام</span>
          </label>
          <p className="text-sm font-bold text-red-800 text-center mb-4">
            {" "}
            tag Id{" "}
          </p>
          {/* New input field for tags */}
          <input
            type="text"
            name="tags"
            value={editData.tags}
            onChange={handleEditChange}
            placeholder="أدخل الوسوم (مثال: politics, economy)"
            className="w-full rounded-md bg-slate-400 p-2"
          />
          {imagePreview && (
            <div className="bg-slate-600 p-4 rounded text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-[200px] mx-auto"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 text-white p-3 rounded-xl hover:bg-red-700"
          >
            {loading ? "جاري التعديل..." : "تعديل الخبر"}
          </button>
        </form>
      </section>
      {message && (
        <div
          className={`p-3 rounded mb-4 ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* حذف خبر Section */}
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
      {message && (
        <div
          className={`p-3 rounded mb-4 ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Tags Manager Section */}
      <section className="mt-8">
        <TagsManager getAccessTokenSilently={getAccessTokenSilently} />
      </section>
    </div>
  );
}

AdminPanel.propTypes = {
  getAccessTokenSilently: PropTypes.func.isRequired,
};

export default AdminPanel;
