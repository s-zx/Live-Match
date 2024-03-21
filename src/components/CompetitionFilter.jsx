import React, { useState, useEffect } from "react";

const CompetitionFilter = ({ onSelect }) => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(
        `https://livescore-api.com/api-client/competitions/list.json?key=4zf7CwnLuhwoT6yn&secret=LzTmINL1TEtqxooBXDIAa6mFoS4hZCFL`
      );
      const data = await response.json();
      console.log(data);
      console.log("bellow is the competitions data");
      console.log(data.data.competition);
      setCompetitions(data?.data?.competition || []);
    } catch (error) {
      console.error("Error fetching competition:", error);
    }
  };

  const handleChange = (e) => {
    setSelectedCompetition(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div>
      <label htmlFor="competition" className="text-2xl">
        Select a competition:
      </label>
      <select
        id="competition"
        value={selectedCompetition}
        onChange={handleChange}
        className="mt-5 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      >
        <option value="">All Competitions</option>
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
