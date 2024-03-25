import React, { useState, useEffect } from "react";

const LiveMatches = ({ competitionId, onGoalScored }) => {
  const [matches, setMatches] = useState([]);
  const [previousMatches, setPreviousMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatches();
  }, [competitionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveMatches();
    }, 30000); // Fetch the latest matches every 30 seconds

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  useEffect(() => {
    // Compare current matches with previous matches to detect score changes
    checkScoreChanges();
  }, [matches]);

  const fetchLiveMatches = async () => {
    try {
      let url =
        "https://livescore-api.com/api-client/matches/live.json?key=4zf7CwnLuhwoT6yn&secret=LzTmINL1TEtqxooBXDIAa6mFoS4hZCFL";
      if (competitionId) {
        url += `&competition_id=${competitionId}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setPreviousMatches(matches); // Update previous matches before setting new ones
      setMatches(data.data.match);
      // console.log("Live matches:", data.data.match);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    }
  };

  const checkScoreChanges = () => {
    if (matches.length === 0 || previousMatches.length === 0) return;

    // Compare current matches with previous matches
    matches.forEach((match, index) => {
      const previousMatch = previousMatches[index];
      if (previousMatch && match.scores.score !== previousMatch.scores.score) {
        previousMatch.scores.score = match.scores.score; // Update previous match scores
        setPreviousMatches([...previousMatches]); // Create a new reference to trigger re-render
        console.log(
          `Score changed for match ${match.id}: ${match.scores.score}`
        );
        // Score has changed, apply visual indicator
        const scoreElement = document.getElementById(`score-${match.id}`);
        if (scoreElement) {
          scoreElement.classList.add("score-changed"); // Add CSS class for light yellow background
          scoreElement.setAttribute("title", "Score just changed"); // Add tooltip text
          setTimeout(() => {
            scoreElement.classList.remove("score-changed");
            scoreElement.removeAttribute("title");
          }, 60000); // Remove CSS class after 1 minute
        }
        onGoalScored(); // Notify parent component
      }
    });
  };

  return (
    <div className="px-12 py-4 border rounded-lg shadow-md bg-slate-100">
      {/* Render a message if there are no matches */}
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
                  {/* Display the match scores */}
                  <p
                    id={`score-${match.id}`}
                    className="text-xl text-gray-500 score-changed"
                  >
                    <span className="text-blue-500">
                      {match.scores.score.split("-")[0]}
                    </span>{" "}
                    -{" "}
                    <span className="text-red-500">
                      {match.scores.score.split("-")[1]}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveMatches;
