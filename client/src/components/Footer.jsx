import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-tr from-blue-900 to-blue-600 text-white mt-20 pt-8 pb-4 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={assets.logo} alt="لوگو انجمن" className="w-24 mb-2" />
          <span className="font-bold text-lg md:text-xl">
            سامانه ثبت‌نام رویدادهای انجمن دانشگاه خیام
          </span>
          <span className="text-xs text-blue-200 mt-1">
            ارتباط، یادگیری و رشد با رویدادهای دانشجویی
          </span>
        </div>
        {/* Links */}
        <div className="flex flex-col items-center gap-2">
          <a href="/" className="hover:underline">
            صفحه اصلی
          </a>
          <a href="/events" className="hover:underline">
            رویدادها
          </a>
          <a href="/about" className="hover:underline">
            درباره انجمن
          </a>
          <a
            href="/register"
            className="bg-white text-blue-800 font-bold px-4 py-1.5 rounded-lg shadow hover:bg-blue-100 transition"
          >
            ثبت‌نام رویداد
          </a>
        </div>
        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-3 mb-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={assets.instagram_icon}
                alt="اینستاگرام"
                className="w-7 h-7"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img src={assets.twitter_icon} alt="توییتر" className="w-7 h-7" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={assets.facebook_icon}
                alt="فیسبوک"
                className="w-7 h-7"
              />
            </a>
          </div>
          <span className="text-xs text-blue-200">
            ارتباط با ما:{" "}
            <a href="mailto:info@khayyamuni.ir" className="underline">
              info@khayyamuni.ir
            </a>
          </span>
          <span className="text-xs text-blue-200">تلفن: ۰۵۱-۳۷۰۰۰۰۰۰</span>
        </div>
      </div>
      <div className="container mx-auto mt-6 border-t border-blue-400 pt-3 text-center text-xs text-blue-200">
        © {new Date().getFullYear()} انجمن دانشگاه خیام - تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}

export default Footer;
