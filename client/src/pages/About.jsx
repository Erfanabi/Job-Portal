import React from "react";

function About() {
  return (
    <div className="container 2xl:px-20 mx-auto px-4 py-10 text-gray-800">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 text-center">
          درباره انجمن دانشگاه خیام
        </h1>
        <p className="leading-8 mb-6 text-justify">
          انجمن دانشگاه خیام با هدف تقویت ارتباطات علمی، حرفه‌ای و اجتماعی میان
          دانشجویان، فارغ‌التحصیلان و صنعت شکل گرفته است. ما با برگزاری
          رویدادها، کارگاه‌ها و شبکه‌سازی، فرصت‌های ارزشمندی برای رشد فردی و
          حرفه‌ای ایجاد می‌کنیم.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl shadow p-6 border">
            <h3 className="font-bold text-lg text-blue-700 mb-2">ماموریت</h3>
            <p className="text-sm leading-6">
              فراهم‌کردن بستر یادگیری، اشتراک تجربه و توسعه مهارت‌های نرم و
              تخصصی.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border">
            <h3 className="font-bold text-lg text-blue-700 mb-2">چشم‌انداز</h3>
            <p className="text-sm leading-6">
              تبدیل شدن به مرجع اصلی ارتباط دانشگاه و صنعت در حوزه‌های مختلف.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border">
            <h3 className="font-bold text-lg text-blue-700 mb-2">ارزش‌ها</h3>
            <p className="text-sm leading-6">
              همکاری، یادگیری مستمر، نوآوری و مسئولیت‌پذیری اجتماعی.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-3 text-center">
            فعالیت‌های ما
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <li className="bg-white rounded-lg border p-4">
              برگزاری رویدادها و میت‌آپ‌ها
            </li>
            <li className="bg-white rounded-lg border p-4">
              کارگاه‌های مهارتی و انتقال تجربه
            </li>
            <li className="bg-white rounded-lg border p-4">
              منتورینگ و شبکه‌سازی
            </li>
            <li className="bg-white rounded-lg border p-4">
              معرفی فرصت‌های شغلی و کارآموزی
            </li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold mb-2">همراه ما باشید</h3>
          <p className="text-sm mb-4">
            برای اطلاع از رویدادهای آینده و برنامه‌ها، صفحه رویدادها را دنبال
            کنید یا از طریق بخش ورود، ثبت‌نام نمایید.
          </p>
          <a
            href="/events"
            className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition"
          >
            مشاهده رویدادها
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
