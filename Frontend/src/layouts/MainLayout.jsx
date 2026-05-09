import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AllRestaurant from "../components/AllRestaurantComp/AllRestaurant";
const MainLayout = () => {
  return (
    <>
      <Header />
      <AllRestaurant />
      <Footer />
    </>
  );
};

export default MainLayout;
