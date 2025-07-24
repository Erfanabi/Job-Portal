import React from "react";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";

function Home() {
  return (
    <div>
      <Hero />
      <JobListing />
      <AppDownload />
    </div>
  );
}

export default Home;
