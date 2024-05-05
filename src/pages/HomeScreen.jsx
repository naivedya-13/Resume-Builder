import React from "react";
import { Header } from "../components";

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* header */}
      <Header />
      <main>{/* Custom Routes */}</main>
    </div>
  );
};

export default HomeScreen;
