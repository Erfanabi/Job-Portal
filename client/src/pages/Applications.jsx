import React, { useState } from "react";
import { assets } from "../assets/assets";

function Applications() {
  const [resume, setResume] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>

        <div className="flex gap-2 mb-6 mt-3">
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
      </div>
    </div>
  );
}

export default Applications;
