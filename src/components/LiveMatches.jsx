import React, { useState, useEffect } from "react";

const LiveMatches = ({ competitionId }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatches();
  }, [competitionId]);

  const fetchLiveMatches = async () => {
    try {
      let url =
        "https://livescore-api.com/api-client/matches/live.json?key=4zf7CwnLuhwoT6yn&secret=LzTmINL1TEtqxooBXDIAa6mFoS4hZCFL";
      if (competitionId) {
        url += `&competition_id=${competitionId}`;
        console.log(`fetching:${url}`);
      }
      const response = await fetch(url);
      const data = await response.json();
      setMatches(data.data.match);
      console.log("get response matches:");
      console.log(data.data.match);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    }
  };

  return (
    <div className="px-12 py-4 border rounded-lg shadow-md bg-slate-100">
      {matches.length === 0 ? (
        <p className="text-3xl text-gray-500">No match right now</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {matches.map((match) => (
            <li key={match.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    <span className="text-blue-500">{match.home.name}</span> vs{" "}
                    <span className="text-red-500">{match.away.name}</span>
                  </h3>
                  <p className="text-xl text-gray-500">
                    <span className="text-blue-500">
                      {match.scores.score.split("-")[0]}
                    </span>{" "}
                    -{" "}
                    <span className="text-red-500">
                      {match.scores.score.split("-")[1]}
                    </span>
                  </p>
                </div>
                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Details
            </button> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveMatches;
