import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

function JobListing() {
  const { isSearches, searchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Local filter states based on Add Job fields
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [titleQuery, setTitleQuery] = useState("");

  const toggleFromArray = (arr, value) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const filteredJobs = useMemo(() => {
    const min = salaryMin !== "" ? Number(salaryMin) : null;
    const max = salaryMax !== "" ? Number(salaryMax) : null;
    const q = titleQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      const titleOk = q ? (job.title || "").toLowerCase().includes(q) : true;
      const categoryOk =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);
      const locationOk =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.location);
      const levelOk =
        selectedLevels.length === 0 || selectedLevels.includes(job.level);
      const salaryVal =
        job.salary === "" || job.salary === null ? null : Number(job.salary);
      const minOk = min === null || (salaryVal !== null && salaryVal >= min);
      const maxOk = max === null || (salaryVal !== null && salaryVal <= max);
      return titleOk && categoryOk && locationOk && levelOk && minOk && maxOk;
    });
  }, [
    jobs,
    selectedCategories,
    selectedLocations,
    selectedLevels,
    salaryMin,
    salaryMax,
    titleQuery,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / 6));
  const pagedJobs = filteredJobs.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      <div className="w-full lg:w-1/4 bg-white px-4">
        {(isSearches &&
          (searchFilter.title !== "" || searchFilter.location !== "")) ||
        titleQuery ||
        selectedCategories.length ||
        selectedLocations.length ||
        selectedLevels.length ||
        salaryMin ||
        salaryMax ? (
          <div>
            <h3 className="font-medium text-lg mb-4">فیلترهای فعال</h3>
            <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
              {titleQuery && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded">
                  {titleQuery}
                  <img
                    onClick={() => setTitleQuery("")}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              )}
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded"
                >
                  {cat}
                  <img
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.filter((c) => c !== cat)
                      )
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              ))}
              {selectedLocations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-3 py-1.5 rounded"
                >
                  {loc}
                  <img
                    onClick={() =>
                      setSelectedLocations((prev) =>
                        prev.filter((l) => l !== loc)
                      )
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              ))}
              {selectedLevels.map((lvl) => (
                <span
                  key={lvl}
                  className="inline-flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded"
                >
                  {lvl}
                  <img
                    onClick={() =>
                      setSelectedLevels((prev) => prev.filter((l) => l !== lvl))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              ))}
              {(salaryMin || salaryMax) && (
                <span className="inline-flex items-center gap-2.5 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded">
                  حقوق: {salaryMin || 0} - {salaryMax || "∞"}
                  <img
                    onClick={() => {
                      setSalaryMin("");
                      setSalaryMax("");
                    }}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                  />
                </span>
              )}
            </div>
          </div>
        ) : null}

        <button
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {!showFilter ? "فیلترها" : "بستن"}
        </button>

        <div className={!showFilter ? "max-lg:hidden" : ""}>
          <h4 className="font-medium text-lg py-4">جستجو بر اساس عنوان</h4>
          <div className="flex items-center bg-white border rounded px-3">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              value={titleQuery}
              onChange={(e) => {
                setTitleQuery(e.target.value);
                setCurrentPage(1);
              }}
              type="text"
              placeholder="جستجوی رویداد یا عنوان"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>

          <h4 className="font-medium text-lg py-4">دسته‌بندی</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((cat, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => {
                    setSelectedCategories((prev) => toggleFromArray(prev, cat));
                    setCurrentPage(1);
                  }}
                />
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className={!showFilter ? "max-lg:hidden pt-12" : ""}>
          <h4 className="font-medium text-lg py-4">مکان</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((loc, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => {
                    setSelectedLocations((prev) => toggleFromArray(prev, loc));
                    setCurrentPage(1);
                  }}
                />
                {loc}
              </li>
            ))}
          </ul>
        </div>

        <div className={!showFilter ? "max-lg:hidden pt-12" : ""}>
          <h4 className="font-medium text-lg py-4">سطح</h4>
          <ul className="space-y-4 text-gray-600">
            {["Beginner level", "Intermediate level", "Senior level"].map(
              (lvl) => (
                <li className="flex gap-3 items-center" key={lvl}>
                  <input
                    className="scale-125"
                    type="checkbox"
                    checked={selectedLevels.includes(lvl)}
                    onChange={() => {
                      setSelectedLevels((prev) => toggleFromArray(prev, lvl));
                      setCurrentPage(1);
                    }}
                  />
                  {lvl}
                </li>
              )
            )}
          </ul>
        </div>

        <div className={!showFilter ? "max-lg:hidden pt-12" : ""}>
          <h4 className="font-medium text-lg py-4">بازه حق‌الزحمه</h4>
          <div className="flex items-center gap-3">
            <input
              value={salaryMin}
              onChange={(e) => {
                setSalaryMin(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border rounded"
              type="number"
              placeholder="حداقل"
            />
            <span className="text-gray-500">—</span>
            <input
              value={salaryMax}
              onChange={(e) => {
                setSalaryMax(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border rounded"
              type="number"
              placeholder="حداکثر"
            />
          </div>
        </div>
      </div>

      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          جدیدترین فرصت‌ها
        </h3>

        <p className="mb-8">فرصت‌ها و اطلاعیه‌های جدید انجمن دانشگاه خیام</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {pagedJobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>

        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a
              href="#job-list"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
            >
              <img src={assets.right_arrow_icon} alt="" />
            </a>

            {Array.from({ length: totalPages }).map((_, index) => (
              <a href="#job-list" key={index}>
                <button
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a
              href="#job-list"
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            >
              <img src={assets.left_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}

export default JobListing;
