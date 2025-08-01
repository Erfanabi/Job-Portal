import React, { useContext, useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Applications() {
  const { backendUrl, userToken, userData } = useContext(AppContext);

  const [resume, setResume] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const updateResume = async () => {
    if (!resume) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const { data } = await axios.post(
        `${backendUrl}/user/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);
      setIsEdit(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload resume");
    }
  };

  return (
    <div>
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>

        <div className="flex gap-2 mb-7 mt-3">
          <div className="flex gap-2">
            {isEdit ? (
              <>
                <label htmlFor="resumeUpload" className="flex items-center">
                  <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                    {resume ? resume?.name : "Select Resume"}
                  </p>

                  <input
                    id="resumeUpload"
                    onChange={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                    hidden
                  />

                  <img
                    src={assets.profile_upload_icon}
                    alt=""
                    className="cursor-pointer"
                  />
                </label>

                <button
                  className="bg-green-100 text-green-400 px-4 py-2 rounded-lg"
                  onClick={updateResume}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {userData?.resume ? (
                  <a
                    href={userData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                  >
                    Resume
                  </a>
                ) : (
                  <span className="text-gray-400 px-4 py-2 rounded-lg">
                    No resume uploaded
                  </span>
                )}

                <button
                  className="text-gray-500 rounded-lg border border-gray-300 px-4 py-2"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left">Jobs Title</th>
              <th className="py-3 px-4 border-b text-left">Location</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {jobsApplied.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-3 px-4 border-b flex items-center gap-2">
                    <img src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className="py-3 px-4 border-b">{job.title}</td>
                  <td className="py-3 px-4 border-b max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 border-b max-sm:hidden">
                    {moment(job.date).format("YYYY-MM-DD")}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;
