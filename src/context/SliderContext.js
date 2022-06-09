import { createContext, useContext, useState } from "react";

const SliderContext = createContext({});

const SliderContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [participants, setParticipants] = useState();
  const [price, setPrice] = useState();
  const [accessibility, setAccessibility] = useState();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [completedActivities, setCompletedActivities] = useState([]);

  return (
    <SliderContext.Provider
      value={{
        participants,
        setParticipants,
        price,
        setPrice,
        accessibility,
        setAccessibility,
        selectedCategory,
        setSelectedCategory,
        activities,
        setActivities,
        filteredActivities,
        setFilteredActivities,
        completedActivities,
        setCompletedActivities,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export default SliderContextProvider;

export const useSliderContext = () => useContext(SliderContext);
