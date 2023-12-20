import React from "react";
import favouritesAtom from "../../store";
import { useAtom } from "jotai";
import WeatherCard from "../DashBoards/WeatherCard";

export default function Favourite() {
  const [favouriteList] = useAtom(favouritesAtom);
  if (!favouriteList) {
    return null;
  }
  if (favouriteList.length === 0) {
    return (
      <p> &#39;Nothing Here Try adding some new layers to the list.&#39;</p>
    );
  }
  return (
    <div>
      {favouriteList.map((objectID) => (
        <WeatherCard key={objectID} objectID={objectID} />
      ))}
    </div>
  );
}
