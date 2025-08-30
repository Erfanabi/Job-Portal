import Quill from "quill";
import "quill/dist/quill.snow.css"; // استایل ویرایشگر را ایمپورت کنید
import React, { useContext, useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function AddJobs() {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "Iran",
    category: "Programing",
    level: "Beginner level",
    salary: "",
  });

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Describe the job requirements, responsibilities, etc.",
      });

      quillRef.current.on("text-change", () => {
        setJobData((prevData) => ({
          ...prevData,
          description: quillRef.current.root.innerHTML,
        }));
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = backendUrl + "/company/post-job";

    try {
      const { data } = await axios.post(endpoint, jobData, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      toast.success(data.message);
      setJobData({
        title: "",
        description: "",
        location: "",
        category: "",
        level: "",
        salary: "",
      });
      quillRef.current.root.innerHTML = "";
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-4 flex flex-col w-full items-start gap-5"
    >
      <div className="w-full">
        <p className="mb-2 font-medium">عنوان</p>
        <input
          name="title"
          value={jobData.title}
          onChange={handleChange}
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded focus:border-blue-500 outline-none"
          type="text"
          placeholder="مثال: برنامه‌نویس React ارشد"
          required
        />
      </div>

      <div className="w-full max-w-lg">
        <p className="my-2 font-medium">توضیحات</p>
        <div ref={editorRef} style={{ minHeight: "150px" }}></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div>
          <p className="mb-2 font-medium">دسته‌بندی</p>
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full sm:w-48 px-3 py-2 border-2 border-gray-300 rounded"
          >
            {JobCategories?.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">مکان</p>
          <select
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full sm:w-48 px-3 py-2 border-2 border-gray-300 rounded"
          >
            {JobLocations?.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">سطح</p>
          <select
            name="level"
            value={jobData.level}
            onChange={handleChange}
            className="w-full sm:w-48 px-3 py-2 border-2 border-gray-300 rounded"
          >
            <option value="Beginner level">مبتدی</option>
            <option value="Intermediate level">متوسط</option>
            <option value="Senior level">حرفه‌ای</option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">حق‌الزحمه (اختیاری)</p>
        <input
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[150px]"
          type="number"
          placeholder="مثال: ۵۰۰۰"
        />
      </div>

      <button
        className="w-28 py-3 mt-4 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        type="submit"
      >
        ثبت
      </button>
    </form>
  );
}

export default AddJobs;
