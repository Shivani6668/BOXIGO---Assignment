import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import MoreDetails from "../components/MoreDetails";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getApiData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/api_assignment.json');
        console.log("API Data:", data); // Add this line to see the API response in the console
        setApiData([data]); // Wrap the single object in an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (apiData.length === 0) {
      getApiData();
    }
  }, [apiData]);

  return (
    <div className="xl:w-[1000px] lg:w-[800px] md:w-[600px] w-full animate-[slideup_0.5s] h-screen overflow-auto pt-4">
      <p className="mx-auto ml-[12px] font-extrabold">My Moves</p>

      {loading && (
        <div className="flex flex-col gap-2 text-center justify-center items-center mt-10">
          <CircularProgress color="inherit" />
          <p className="text-orange-600 font-bold">Loading Content ..</p>
        </div>
      )}
      {apiData.length > 0 ? (
        apiData.map((item, index) => (
          <div key={index} className="my-3 border-b transition-all duration-150 cursor-pointer hover:border hover:border-orange-500 py-5 px-3 hover:rounded-lg animate-[slideup_0.5s]">
            <div className="flex lg:flex-row flex-col justify-between flex-wrap gap-7">
              <div>
                <p className="font-extrabold text-sm">From</p>
                <p className="xl:flex hidden w-[350px] text-sm">{item.moving_from}</p>
                <p className="lg:flex xl:hidden hidden w-[200px] text-sm">{item.moving_from}</p>
                <p className="md:flex lg:hidden hidden text-sm">{item.moving_from}</p>
                <p className="md:hidden flex text-sm">{item.moving_from}</p>
              </div>

              <div className="bg-white shadow-lg px-3 py-1.5 rounded-full max-w-[70px] md:border lg:border-none border border-orange-600 max-h-[50px] flex justify-center items-center">
                <ArrowForwardIcon className="text-orange-600 mt-1" />
              </div>

              <div>
                <p className="font-extrabold text-sm">To</p>
                <p className="xl:flex hidden w-[350px] text-sm">{item.moving_to}</p>
                <p className="lg:flex xl:hidden hidden w-[200px] text-sm">{item.moving_to}</p>
                <p className="md:flex lg:hidden hidden text-sm">{item.moving_to}</p>
                <p className="md:hidden flex text-sm">{item.moving_to}</p>
              </div>

              <div>
                <p className="font-extrabold text-sm">Request#</p>
                <p className="text-orange-600 font-extrabold">{item.estimate_id}</p>
              </div>
            </div>
            <br />
            {/* Assuming MoreDetails is a component that takes 'data' prop */}
            <MoreDetails data={item} />
          </div>
        ))
      ) : (
        !loading && <p className="text-center text-gray-500">No data available.</p>
      )}
      <br />
    </div>
  );
}
