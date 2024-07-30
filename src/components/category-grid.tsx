import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Світлодіодне освітлення",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Елекрофурнітура",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Кабельна продукція",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Розетки та вимикачі",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Автоматика",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Лампи",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Інструменти",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Щити та шафи",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
];

const CategoryGrid = () => {
  return (
    <div className=" text-white my-10">
      <div className="xl:ml-0 -ml-16">
        <h2 className="bg-gradient-elektro-massive text-white  font-bold mb-2 px-28 py-5 rounded-r-3xl xl:rounded-full   text-2xl">
          Електротовари
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        {categories.map((category, index) => (
          <div key={index} className="relative aspect-square">
            <div className="absolute inset-0 bg-gray-300 rounded-3xl overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-3xl">
                <p className="text-white text-center text-xl sm:text-lg md:text-base lg:text-lg xl:text-xl font-semibold p-2">
                  {category.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
