import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function ViewApplications() {
  const [applicants, setApplicants] = useState([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/company/applicants", {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      setApplicants(data);
    } catch (err) {
      console.log(err);
      toast.error(toast?.response?.data?.message);
    }
  };

  const changeStatusJobApplications = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/company/change-status",
        {
          applicationId: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        }
      );
      toast.success(data.message);
      await fetchCompanyJobApplications();
    } catch (err) {
      console.log(err);
      toast.error(toast?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (companyToken) fetchCompanyJobApplications();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="w-full bg-white border border-gray-200 max-sm:text-sm">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="">
            {applicants?.map((applicant, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b items-center text-center flex">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={
                      applicant?.applicantId?.image
                        ? applicant?.applicantId?.image
                        : assets.avatar
                    }
                    alt=""
                  />
                  <span>{applicant?.applicantId?.name}</span>
                </td>
                <td className="py-2 px-4 border-b text-left max-sm:hidden">
                  {applicant?.jobId?.title}
                </td>
                <td className="py-2 px-4 border-b text-left max-sm:hidden">
                  {applicant?.jobId?.location}
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={applicant?.applicantId?.resume}
                    target="_blank"
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b relative">
                  {applicant.status === "pending" ? (
                    <div className="relative inline-block text-left group">
                      <button className="text-gray-500 action-button">
                        ...
                      </button>

                      <div className="absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white hidden z-10 border border-gray-200 rounded shadow group-hover:block">
                        <button
                          onClick={() =>
                            changeStatusJobApplications(
                              applicant._id,
                              "accepted"
                            )
                          }
                          className="block text-sm w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            changeStatusJobApplications(
                              applicant._id,
                              "rejected"
                            )
                          }
                          className="block text-sm w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    applicant.status
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewApplications;
