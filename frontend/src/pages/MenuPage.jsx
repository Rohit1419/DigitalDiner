import { useState } from "react";
import Layout from "../components/Layout/Layout";
import MenuList from "../components/Menu/MenuList";
import { FaSearch } from "react-icons/fa";

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Menu</h1>

          <div className="relative">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <MenuList searchTerm={searchTerm} />
      </div>
    </Layout>
  );
}
