import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faArrowLeft,
  faShoppingCart,
  faStar,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import GalleryView from "../../components/views/gallery";
import Pagination from "../../components/pagination";
import TableCustom from "../../components/table/table-custom";

export default function ItemDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;

  const [showGallery, setShowGallery] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showData, setShowData] = useState(false);
  const columns = [
    { key: "menu", label: "Menu", type: "text" },
    { key: "accepted", label: "Accepted", type: "number" },
    { key: "rejected", label: "Rejected", type: "number" },
    { key: "date", label: "Date", type: "date" },
    { key: "img_reject", label: "Image Rejected", type: "image" },
    { key: "pic", label: "PIC", type: "link-detail" },
    { key: "action", label: "Detail", type: "action" },
  ] as any;

  const data = [
    {
      menu: "Fried Chicken",
      accepted: 120,
      rejected: 5,
      date: "2025-11-03",
      img_reject: "https://picsum.photos/seed/chicken/100/100",
      pic: "John Doe",
      pic_path: "profile/123",
      action: "View Details",
    },
    {
      menu: "Beef Burger",
      accepted: 98,
      rejected: 12,
      date: "2025-11-01",
      img_reject: "https://picsum.photos/seed/burger/100/100",
      pic: "Jane Smith",
      pic_path: "profile/123",
      action: "View Details",
    },
    {
      menu: "Spaghetti Carbonara",
      accepted: 150,
      rejected: 2,
      date: "2025-10-30",
      img_reject: "https://picsum.photos/seed/spaghetti/100/100",
      pic: "Michael Brown",
      action: "View Details",
    },
    {
      menu: "Caesar Salad",
      accepted: 87,
      rejected: 3,
      date: "2025-10-28",
      img_reject: "https://picsum.photos/seed/salad/100/100",
      pic: "Emily Davis",
      action: "View Details",
    },
    {
      menu: "Sushi Platter",
      accepted: 134,
      rejected: 6,
      date: "2025-10-26",
      img_reject: "https://picsum.photos/seed/sushi/100/100",
      pic: "David Kim",
      action: "View Details",
    },
    {
      menu: "Grilled Salmon",
      accepted: 110,
      rejected: 4,
      date: "2025-10-22",
      img_reject: "https://picsum.photos/seed/salmon/100/100",
      pic: "Sophia Wilson",
      action: "View Details",
    },
  ];

  const handleDetail = (item: any) => {
    alert(`Go to detail for: ${item.name}`);
  };
  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 dark:bg-gray-900 py-5 px-4 flex justify-center">
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 🖼️ Rounded Square Image */}
          <div className="md:w-1/2 w-full relative aspect-square flex items-center justify-center p-6 md:p-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl shadow-md"
            />
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full absolute top-6 left-6 bg-black/50 text-white hover:bg-black/70 transition
             flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>

          {/* 📝 Details Section */}
          <div className="md:w-1/2 w-full p-6 md:p-8 space-y-5 flex flex-col justify-start">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {product.name}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-500 w-4 h-4 mr-1"
                />
                {product.location}
              </div>
            </div>

            <div className="flex items-center text-yellow-500 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }
                />
              ))}
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {product.price}
              </p>
              <button className="mt-3 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-transform hover:scale-105">
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="w-full  border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-gray-900 dark:text-gray-100">Gallery</span>
            <FontAwesomeIcon icon={showGallery ? faChevronUp : faChevronDown} />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${showGallery ? "max-h-[1000px] p-6" : "max-h-0 p-0"
              }`}
          >
            <GalleryView />
            <Pagination />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-gray-900 dark:text-gray-100">Detail Information</span>
            <FontAwesomeIcon icon={showDetail ? faChevronUp : faChevronDown} />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${showDetail ? "max-h-[1000px] p-6" : "max-h-0 p-0"
              }`}
          >
            <ul className="space-y-3 text-gray-900 dark:text-gray-100">
              <li className="text-gray-900 dark:text-gray-100"><strong>Category:</strong> Furniture</li>
              <li className="text-gray-900 dark:text-gray-100"><strong>Material:</strong> Solid Teak Wood</li>
              <li className="text-gray-900 dark:text-gray-100"><strong>Dimensions:</strong> 120cm x 75cm x 60cm</li>
              <li className="text-gray-900 dark:text-gray-100"><strong>Weight:</strong> 25 kg</li>
              <li className="text-gray-900 dark:text-gray-100"><strong>Warranty:</strong> 2 Years</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowData(!showData)}
            className="w-full border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-gray-900 dark:text-gray-100">Menu</span>
            <FontAwesomeIcon icon={showData ? faChevronUp : faChevronDown} />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${showData ? "max-h-[1000px] p-6" : "max-h-0 p-0"
              }`}
          >
            <TableCustom columns={columns} data={data} darkMode rowsPerPage={3}
              onDetail={handleDetail} />

          </div>
        </div>
      </div>
    </div>
  );
}
