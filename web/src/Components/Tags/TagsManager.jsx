import { useState, useEffect } from "react";
import baseUrl from "../../assets/contants";

export function TagsManager() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/tags`);
      if (!response.ok) throw new Error("Error fetching tags");
      const data = await response.json();
      // Update setTags to match the API response structure.
      // If the API returns an array directly, use:
      setTags(data.data);
      console.log(data.data);
    } catch (err) {
      setMessage(err.message || "Error fetching tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTag = async () => {
    const tagStr = newTag.trim();
    console.log("Adding tag:", tagStr); // Debug log
    if (!tagStr) {
      setMessage("يرجى إدخال الوسم");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // using JSON
        // Change key from "tag" to "name"
        body: JSON.stringify({ name: tagStr }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`حدث خطأ أثناء إضافة الوسم: ${errorText}`);
      }
      const data = await response.json();
      console.log("Response data:", data);
      setMessage("تم إضافة الوسم بنجاح");
      setNewTag(""); // Clear input value
      fetchTags(); // Refresh list
    } catch (err) {
      setMessage(err.message || "حدث خطأ أثناء إضافة الوسم");
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (tagId) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/tags/${tagId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("حدث خطأ أثناء حذف الوسم");
      setMessage("تم حذف الوسم بنجاح");
      fetchTags();
    } catch (err) {
      setMessage(err.message || "حدث خطأ أثناء حذف الوسم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">مدير الوسوم</h2>
      {message && <div className="mb-2 text-sm text-red-600">{message}</div>}
      <div className="mb-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="أدخل وسم جديد"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={addTag}
          disabled={loading}
          className="mt-2 p-2 bg-blue-600 text-white rounded"
        >
          {loading ? "جاري الإضافة..." : "إضافة وسم"}
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">الوسوم الموجودة:</h3>
        <ul>
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <span>{tag.name || "بدون اسم"}</span> {/* display tag name */}
              <span>{tag.id || "بدون اسم"}</span> {/* display tag name */}
              <button
                onClick={() => deleteTag(tag.id)}
                disabled={loading}
                className="text-red-500"
              >
                حذف
              </button>
            </li>
          ))}
          {tags.length === 0 && <li>لا توجد وسوم</li>}
        </ul>
      </div>
    </div>
  );
}

export default TagsManager;
