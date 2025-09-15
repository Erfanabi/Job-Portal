import React from "react";
import JobListing from "../components/JobListing";

function Events() {
  return (
    <div className="container 2xl:px-20 mx-auto px-4 py-10">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
          رویدادهای انجمن
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          آخرین رویدادها، اطلاعیه‌ها و فرصت‌های شرکت در برنامه‌های انجمن را در
          این صفحه دنبال کنید.
        </p>
      </header>

      <JobListing />
    </div>
  );
}

export default Events;
