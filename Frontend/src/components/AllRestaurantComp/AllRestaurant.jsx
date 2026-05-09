import React, { useEffect, useState } from "react";
import { getAllRestaurants } from "../../services/restaurantService";
import RestaurantCard from "./RestaurantCard";

const AllRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurants();

      setRestaurants(data.restaurants);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Loading Restaurants...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Restaurants Near You 🍔
        </h1>

        {/* No Restaurant */}
        {restaurants.length === 0 ? (
          <div className="text-center">
            <h2 className="text-xl text-gray-500">No restaurants found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurant;
