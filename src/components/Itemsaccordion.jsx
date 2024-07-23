import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Itemsaccordion({ item }) {
  return (
    //Items are listing caregory wise
    <div className=" my-3">
      <Accordion
        sx={{ bgcolor: "#e3dddc", outline: "none", boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className=" flex gap-2 text-orange-600 font-bold">
            {item?.roomName}{" "}
            <p className=" px-3 rounded-full bg-orange-600 text-white text-sm pt-0.5 ">
              {item?.categories?.length > 0
                ? item?.categories.length
                : (() => {
                  // Find the length of the first array property in itemsList
                  const firstArrayLength = Object.values(item?.itemsList || {})
                    .filter(Array.isArray)
                    .map(arr => arr.length)
                    .find(length => length > 0) || 0;
                  return firstArrayLength;
                })()}
            </p>
          </p>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <div className=" flex gap-10 flex-wrap bg-white p-4">
            {item?.categories?.map((name) => {
              // Get all arrays from itemsList
              const arrays = Object.values(name.itemsList || {});

              // Check if there's only one array in itemsList
              const isSingleArray = arrays.length === 1;

              return (
                <div className="flex flex-col" key={name.categoryName}>
                  <p className="font-extrabold text-lg">{name?.categoryName}</p>
                  {arrays
                    .filter(array => isSingleArray || name.itemsList.all !== array) // Filter out 'all' if multiple arrays
                    .map((array, index) => {
                      // Filter out duplicate items based on a unique property (e.g., 'name')
                      const seen = new Set();
                      const uniqueItems = array.filter(itemlist => {
                        if (itemlist && !seen.has(itemlist.name)) {
                          seen.add(itemlist.name);
                          return true;
                        }
                        return false;
                      });

                      return (
                        <div key={index}>
                          {uniqueItems.slice(1).map((items, itemIndex) => (
                            <div key={itemIndex}>
                              <div className="flex justify-between gap-28 my-4">
                                <p>{items?.display_name}</p>
                                <p className="font-extrabold">{items?.qty}</p>
                              </div>
                              <div className="flex justify-between gap-28 my-4">
                                <p className="font-extrabold">{items?.type?.default_type[0]}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                </div>
              );
            })}



          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
