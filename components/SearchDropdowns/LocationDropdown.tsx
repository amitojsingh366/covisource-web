import React, { useEffect } from "react";
import Cookies from "js-cookie";

// components
import Hit from "~components/General/SearchHit";

// schemas
import HitSchema from "schema/HitSchema";
import SessionSchema from "~schema/SessionSchema";

// session
import { useSession } from "next-auth/client";

const LocationPopup = ({ hits, loading, setInputValue, hidePopup }) => {
  const user: SessionSchema = useSession()[0] as any;

  const autoDetectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const res = await fetch(
          `https://us1.locationiq.com/v1/reverse.php?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_TOKEN}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        ).then((res) => res.json());

        if (user) {
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/user/setUserLocation`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `token ${user?.jwt}`,
                },
                body: JSON.stringify({
                  coordinates: {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                  },
                  displayName: res.display_name,
                }),
              }
            );
          } catch (err) {
            console.log(err);
          }
        }

        Cookies.set("coviUserLocationLat", position.coords.latitude.toString());
        Cookies.set(
          "coviUserLocationLong",
          position.coords.longitude.toString()
        );
        Cookies.set("coviUserLocationDisplay", res.display_name);

        // set the input value to the title of what they select and then hide the popup
        setInputValue(res.display_name);
        hidePopup();
      });
    } else {
      console.log("Auto location is not available.");
    }
  };

  return (
    <div
      className={
        "absolute top-16 rounded-lg max-h-96 overflow-y-auto overflow-x-hidden bg-gray-200 w-80 locationSearchPopup"
      }
    >
      {(hits.length < 1 || loading) && (
        <div
          onClick={autoDetectLocation}
          className="flex items-center gap-2 py-4 px-3 text-gray-700 select-none hover:bg-gray-300 cursor-pointer "
        >
          <i className="fal fa-radar text-xl text-purple-400"></i>
          <div className="flex flex-col justify-center gap-1">
            <span className="text-purple-400 font-semibold font-mont">
              Auto Detect Location
            </span>
            <span className="text-xs text-gray-600">
              Click Allow If Your Browser Prompts You
            </span>
          </div>
        </div>
      )}

      {hits.length > 0
        ? hits.map((hit: HitSchema) => {
            return (
              <Hit
                key={hit.id}
                address={hit.address?.label
                  .replace(", India", "")
                  .replace(hit.title + ",", "")}
                title={hit.title.replace(", India", "")}
                coordinates={
                  hit.position
                    ? [hit.position.lat, hit.position.lng]
                    : [hit.access[0].lat, hit.access[0].lng]
                }
                setInputValue={setInputValue}
                hidePopup={hidePopup}
              />
            );
          })
        : ""}
    </div>
  );
};

export default LocationPopup;
