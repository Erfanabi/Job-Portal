import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function ManagerJobs() {
  const [job, setJob] = useState([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/company/list-jobs", {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      setJob(data.jobs);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(toast?.response?.data?.message);
    }
  };

  const changeToVisiblity = async (id, visible) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/company/change-visiblity",
        { jobId: id, visible },
        {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        }
      );
      fetchCompanyJob();
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCompanyJob();
  }, []);

  console.log(job);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg max-sm:text-sm border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">عنوان</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                تاریخ
              </th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                مکان
              </th>
              <th className="py-2 px-4 border-b text-center">متقاضیان</th>
              <th className="py-2 px-4 border-b text-left">نمایش</th>
            </tr>
          </thead>

          <tbody className="">
            {job?.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b">{job?.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(job?.date).format("11")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {job?.location}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {job?.applicants}
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    className="scale-125 ml-4"
                    checked={job.visible}
                    onChange={() => changeToVisiblity(job._id, !job.visible)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="bg-black text-white py-2 px-4 rounded">
          افزودن فرصت جدید
        </button>
      </div>
    </div>
  );
}

export default ManagerJobs;
