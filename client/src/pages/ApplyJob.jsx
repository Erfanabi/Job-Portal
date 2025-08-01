import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import JobCard from "../components/JobCard";
import axios from "axios";
import { toast } from "react-toastify";

function ApplyJob() {
  const { id } = useParams();

  const [JobData, setJobData] = useState(null);

  const { jobs, backendUrl, companyToken } = useContext(AppContext);

  const fetchJob = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      console.log(data);

      setJobData(data.job);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
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

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div class="w-full lg:w-2/3">
            <h2 class="font-bold text-2xl mb-4">Job description</h2>

            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: JobData?.description }}
            ></div>

            <button class="bg-blue-600 p-2.5 px-10 text-white rounded mt-10">
              Apply Now
            </button>
          </div>

          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
            <h2>More jobs from {JobData?.companyId?.name}</h2>

            {jobs.slice(0, 3).map((job) => {
              return <JobCard job={job} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
