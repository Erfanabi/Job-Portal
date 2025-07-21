import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";

function ApplyJob() {
  const { id } = useParams();

  const [JobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);

  console.log(jobs);

  const fetchJob = useCallback(() => {
    const data = jobs?.filter((job) => job._id == id);

    if (data.length !== 0) {
      setJobData(data[0]);
    }
  }, [jobs, id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return (
    <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
      <div className="bg-white text-black rounded-lg w-ful">
        <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={JobData?.companyId?.image}
              className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
              alt=""
            />

            <div className="text-center md:text-left text-neutral-700">
              <h1 className="text-2xl sm:text-4xl font-medium">
                {JobData?.title}
              </h1>

              <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <img src={assets.suitcase_icon} alt="" />
                  {JobData?.companyId?.name}
                </span>

                <span className="flex items-center gap-1">
                  <img src={assets.location_icon} alt="" />
                  {JobData?.location}
                </span>

                <span className="flex items-center gap-1">
                  <img src={assets.person_icon} alt="" />
                  {JobData?.level}
                </span>

                <span className="flex items-center gap-1">
                  <img src={assets.money_icon} alt="" />
                  {JobData?.salary}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
            <button className="bg-blue-600 p-2.5 px-10 text-white rounded">
              Apply Now
            </button>
            <p className="mt-1 text-gray-600">
              Posted {moment(JobData?.date).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
