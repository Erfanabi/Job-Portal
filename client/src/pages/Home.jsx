import React from "react";
import Hero from "../components/Hero";
import AppDownload from "../components/AppDownload";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* <Hero /> */}

      <section className="container 2xl:px-20 mx-auto px-4 py-12 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-xl shadow p-6">
            <h3 className="font-bold text-xl text-blue-800 mb-2">
              ما که هستیم؟
            </h3>
            <p className="text-sm leading-6 mb-4">
              با اهداف، ارزش‌ها و فعالیت‌های انجمن آشنا شوید.
            </p>
            <Link to="/about" className="text-blue-700 font-semibold">
              بیشتر بدانید →
            </Link>
          </div>
          <div className="bg-white border rounded-xl shadow p-6">
            <h3 className="font-bold text-xl text-blue-800 mb-2">رویدادها</h3>
            <p className="text-sm leading-6 mb-4">
              جدیدترین رویدادها و اطلاعیه‌ها را در صفحه اختصاصی دنبال کنید.
            </p>
            <Link to="/events" className="text-blue-700 font-semibold">
              مشاهده رویدادها →
            </Link>
          </div>
          <div className="bg-white border rounded-xl shadow p-6">
            <h3 className="font-bold text-xl text-blue-800 mb-2">
              همکاری و عضویت
            </h3>
            <p className="text-sm leading-6 mb-4">
              برای مشارکت در رویدادها و فعالیت‌ها، حساب کاربری بسازید.
            </p>
            <Link to="/register" className="text-blue-700 font-semibold">
              شروع کنید →
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">
            به جمع ما بپیوندید
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            با دنبال‌کردن رویدادها و شرکت در برنامه‌ها، مسیر رشد حرفه‌ای خود را
            هموار کنید.
          </p>
          <Link
            to="/events"
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition"
          >
            مرور رویدادهای آینده
          </Link>
        </div>
      </section>

      {/* <AppDownload /> */}
    </div>
  );
}

export default Home;
