import React, { useState, useEffect } from "react";

const CompetitionFilter = ({ onSelect }) => {
  // State for storing competitions and selected competition
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");

  // Fetch competitions when component mounts
  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      // Fetch competitions from API
      const response = await fetch(
        `https://livescore-api.com/api-client/competitions/list.json?key=4zf7CwnLuhwoT6yn&secret=LzTmINL1TEtqxooBXDIAa6mFoS4hZCFL`
      );
      const data = await response.json();
      // Set fetched competitions to state
      setCompetitions(data?.data?.competition || []);
    } catch (error) {
      console.error("Error fetching competition:", error);
    }
  };

  const handleChange = (e) => {
    // Set selected competition to state
    setSelectedCompetition(e.target.value);
    // Call onSelect callback with selected competition
    onSelect(e.target.value);
  };

  return (
    <div>
      {/* Competition selection label */}
      <label htmlFor="competition" className="text-2xl">
        Select a competition:
      </label>
      {/* Dropdown for selecting competition */}
      <select
        id="competition"
        value={selectedCompetition}
        onChange={handleChange}
        className="mt-5 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      >
        {/* Default option for all competitions */}
        <option value="">All Competitions</option>
        {/* Map through competitions and render options */}
        {competitions &&
          competitions.map((competition) => (
            <option key={competition.id} value={competition.id}>
              {competition.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CompetitionFilter;
