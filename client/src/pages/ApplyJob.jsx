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
  // const navigate = useNavigate(); // حذف شد چون استفاده نمی‌شود

  const [JobData, setJobData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    telegram: "",
  });
  const [loading, setLoading] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const { jobs, backendUrl, userToken } = useContext(AppContext);

  const fetchJob = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/jobs/${id}`);
      setJobData(data.job);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  }, [id, backendUrl]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenModal = () => {
    if (alreadyApplied) return;
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ firstName: "", lastName: "", mobile: "", telegram: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/apply`,
        {
          jobId: id,
          firstName: form.firstName,
          lastName: form.lastName,
          mobile: form.mobile,
          telegram: form.telegram,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success(data.message);
      handleCloseModal();
    } catch (err) {
      if (
        err?.response?.data?.message?.toLowerCase().includes("jwt malformed") ||
        err?.response?.data?.message?.toLowerCase().includes("invalid token") ||
        err?.response?.data?.message?.toLowerCase().includes("token")
      ) {
        toast.error("برای ارسال درخواست باید وارد حساب کاربری خود شوید.");
      } else {
        toast.error(err?.response?.data?.message || "خطا در ارسال درخواست");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // Check if user already applied for this job
    const checkAlreadyApplied = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/user/application`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (data.applications && Array.isArray(data.applications)) {
          const found = data.applications.some(
            (app) => app.jobId && app.jobId._id === id
          );
          setAlreadyApplied(found);
        }
      } catch {
        // silent fail
      }
    };
    if (userToken) checkAlreadyApplied();
  }, [fetchJob, backendUrl, userToken, id]);

  return (
    <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
      {/* Modal */}
      {showModal && !alreadyApplied && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              ارسال درخواست
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
                placeholder="نام"
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
                placeholder="نام خانوادگی"
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleInputChange}
                placeholder="شماره موبایل"
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                name="telegram"
                value={form.telegram}
                onChange={handleInputChange}
                placeholder="اکانت تلگرام"
                className="w-full border rounded p-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 p-2.5 px-10 text-white rounded w-full mt-2"
                disabled={loading}
              >
                {loading ? "در حال ارسال..." : "ارسال درخواست"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* End Modal */}
      <div className="bg-white text-black rounded-lg w-ful">
        <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-x-4">
            <img
              src={
                JobData?.companyId?.image
                  ? JobData?.companyId?.image
                  : assets.not_found2
              }
              className="h-24 w-24 object-contain bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
              alt=""
            />
            <div className="text-center md:text-right text-neutral-700">
              <h1 className="text-2xl sm:text-4xl font-medium">
                {JobData?.title}
              </h1>
              <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <img src={assets.location_icon} alt="" />
                  {JobData?.location}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.person_icon} alt="" />
                  {JobData?.category}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.money_icon} alt="" />
                  {JobData?.salary}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
            <button
              className={`bg-blue-600 p-2.5 px-10 text-white rounded ${
                alreadyApplied ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleOpenModal}
              disabled={alreadyApplied}
            >
              {alreadyApplied ? "شما قبلاً درخواست داده‌اید" : "ارسال درخواست"}
            </button>
            {/* {alreadyApplied && (
              <p className="mt-2 text-red-500">
                شما قبلاً برای این موقعیت شغلی درخواست داده‌اید.
              </p>
            )} */}
            <p className="mt-1 text-gray-600">
              منتشر شده {moment(JobData?.date).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-2/3">
            <h2 className="font-bold text-2xl mb-4">توضیحات</h2>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: JobData?.description }}
            ></div>
            <button
              className={`bg-blue-600 p-2.5 px-10 text-white rounded mt-10 ${
                alreadyApplied ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleOpenModal}
              disabled={alreadyApplied}
            >
              {alreadyApplied ? "شما قبلاً درخواست داده‌اید" : "ارسال درخواست"}
            </button>
            {/* jwt malformed
             */}
          </div>
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
            <h2>فرصت‌های دیگر از {JobData?.companyId?.name}</h2>
            {jobs.slice(0, 3).map((job, index) => {
              return <JobCard job={job} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
