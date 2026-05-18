import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function GalleryView() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const images = Array.from({ length: 6 }).map(
    (_, i) => `https://picsum.photos/600/600?random=${i}`
  );

  return (
    <div className="relative">
      {/* 🖼️ Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 cursor-pointer">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            onClick={() => setZoomedImage(src)}
            className="w-full h-40 object-cover rounded-lg shadow-sm hover:scale-105 hover:shadow-md transition-transform duration-300"
          />
        ))}
      </div>

      {/* 🔍 Zoom Overlay */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity animate-fadeIn"
        >
          <div
            className="relative max-w-3xl w-[90%] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomedImage}
              alt="Zoomed"
              className="w-full h-auto object-contain rounded-2xl"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
