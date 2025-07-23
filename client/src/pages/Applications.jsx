import React, { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";

function Applications() {
  const [resume, setResume] = useState("");
  const [isEdit, setIsEdit] = useState(false);

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
                    Select Resume
                  </p>

                  <input
                    id="resumeUpload"
                    onChange={(e) => setResume(e.target.value[0])}
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
                  onClick={() => setIsEdit(false)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">
                  Resume
                </a>

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
                <tr>
                  <td className="py-3 px-4 border-b flex items-center gap-2">
                    <img src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className="py-3 px-4 border-b">{job.title}</td>
                  <td className="py-3 px-4 border-b max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 border-b max-sm:hidden">
                    {moment(job.date).format("")}
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
