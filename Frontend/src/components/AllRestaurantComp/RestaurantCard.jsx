import React from "react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
      {/* Restaurant Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={
            restaurant.image ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          }
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name + Rating */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {restaurant.name}
          </h2>

          <span className="bg-green-600 text-white text-sm px-2 py-1 rounded-lg font-medium">
            ⭐ {restaurant.rating.toFixed(1)}
          </span>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-sm mt-2">
          📍 {restaurant.location_name}
        </p>

        {/* Open / Closed */}
        <div className="mt-4">
          {restaurant.is_open ? (
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
              Open Now
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-medium">
              Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
