import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import RecruiterLogin from "../components/RecruiterLogin";

function Home() {
  return (
    <div>
      <Navbar />
      <RecruiterLogin />
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />
    </div>
  );
}

export default Home;
