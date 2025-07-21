import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="border p-6 shadow rounded">
      <div className="flex items-center justify-between">
        <img className="h-8" src={assets.company_icon} alt="" />
      </div>

      <h4 className="font-medium text-xl mt-2">{job.title}</h4>

      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-50 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-blue-50 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>

      <p
        className="text-sm mt-4 text-gray-500"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="mt-4 flex text-sm gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Apply now
        </button>
        <button
          className="text-gray-500 border border-gray-500 rounded px-4 py-2"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

export default JobCard;
