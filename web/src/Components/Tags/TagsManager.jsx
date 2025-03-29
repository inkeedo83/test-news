import { useState, useEffect } from "react";

import { get, post, del } from "../../services/api";
import { saveAuthToken } from "../../services/auth";
import PropTypes from "prop-types";
import { AUTH0_AUDIENCE } from "../../assets/env";

export function TagsManager({ getAccessTokenSilently }) {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to update token before request
  const updateToken = async () => {
    try {
      console.log("TagsManager: Getting a fresh access token...");
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      });
      console.log("TagsManager: New token received, saving to localStorage");
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

  const fetchTags = async () => {
    setLoading(true);
    try {
      // Using new API function with authorization error handling
      const response = await handleAuthError(async () => {
        return await get("tags");
      });

      // Update setTags to match the API response structure.
      setTags(response.data);
      console.log(response.data);
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
      // Using new API function with authorization error handling
      const data = await handleAuthError(async () => {
        return await post("tags", { name: tagStr });
      });

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
      // Using new API function with authorization error handling
      await handleAuthError(async () => {
        await del(`tags/${tagId}`);
      });

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

TagsManager.propTypes = {
  getAccessTokenSilently: PropTypes.func.isRequired,
};

export default TagsManager;
