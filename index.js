// This is the array of source and destinations, which we are using as a example
const tickets = [
  ["JPN", "PHL"],
  ["BRA", "UAE"],
  ["USA", "BRA"],
  ["UAE", "JPN"],
];

// This is a utility function which takes list of tickets and gives back a map of all countries he visited. Each country is further mapped to the previouly visited country and the country he will be visiting next. The first country will not have its previous and last country will not have next.
const getEachCountryMap = (ticketsList) =>
  ticketsList.reduce((acc, curr) => {
    const [start, end] = curr;
    acc[start] = { ...acc[start], next: end };
    acc[end] = { ...acc[end], previous: start };
    return acc;
  }, {});

/* This is a utility function which will find all visited (Previous) countries list. It takes startingPoint and mapped countries. 
  Example. ("USA","BRA","UAE",<---Country) */
const getAllVisitedCountries = (startingPoint, eachCountryMap) => {
  const travelledCountries = [];
  while (startingPoint) {
    const { previous } = eachCountryMap[startingPoint];
    if (previous) {
      travelledCountries.unshift(previous);
    }
    startingPoint = previous;
  }
  return travelledCountries;
};

// This is a utility function which will get all next countries he will be visiting after starting point (Country------> "PHL")
const getAllVisitingCountries = (startingPoint, eachCountryMap) => {
  const yetToTravelCountries = [];
  while (startingPoint) {
    const { next } = eachCountryMap[startingPoint];

    if (next) {
      yetToTravelCountries.push(next);
    }
    startingPoint = next;
  }
  return yetToTravelCountries;
};

// This is the main function which takes tickets list and returns the itenerary based on above utility functions
const getItenerary = (ticketsList) => {
  if (!ticketsList.length) {
    console.log("You found nothing inside my diary!!");
    return;
  }
  const eachCountryMap = getEachCountryMap(ticketsList);
  const startingPoint = Object.keys(eachCountryMap)[0];
  const visitedCountries = getAllVisitedCountries(
    startingPoint,
    eachCountryMap
  );
  const visitingCountries = getAllVisitingCountries(
    startingPoint,
    eachCountryMap
  );
  const itenerary = [...visitedCountries, startingPoint, ...visitingCountries];
  return itenerary.join(", ");
};

// This calls the main function and prints result
console.log(getItenerary(tickets));
