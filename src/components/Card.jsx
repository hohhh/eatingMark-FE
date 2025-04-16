import { BASE_URL } from "../api/placesAPI.js";

function Card({ title, image, description }) {
  return (
    <div className="relative group rounded-lg overflow-hidden transition cursor-pointer">
      <img
        src={`${BASE_URL}/${image.src}`}
        alt={image.alt}
        className="w-full h-60 object-cover"
      />

      <button className="absolute top-3 right-3 text-gray-300 text-xl z-10 hover:scale-110 transition">
        🤍
      </button>

      <div
        className="absolute inset-0 flex flex-col justify-end p-4
               bg-gradient-to-t from-black/80 via-black/40 to-transparent
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <h3 className="text-white text-2xl font-bold mb-1">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default Card;
