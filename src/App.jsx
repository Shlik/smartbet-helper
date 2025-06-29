import React, { useState, useEffect } from "react";

const matchData = [
  { id: 1, match: "West Ham vs Bournemouth", time: "18:30", market: "Over 1.5", odds: 1.33 },
  { id: 2, match: "Bologna vs Napoli", time: "19:45", market: "GG", odds: 1.75 },
  { id: 3, match: "Dortmund vs Leverkusen", time: "19:45", market: "Over 1.5", odds: 1.40 },
  { id: 4, match: "Real Betis vs Almeria", time: "21:00", market: "1X2", odds: 1.55 },
];

export default function App() {
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [stake, setStake] = useState(200);

  const autoSelectCombo = () => {
    let combo = [];
    let totalOdds = 1;

    for (let i = 0; i < matchData.length; i++) {
      if (combo.length < 4 && totalOdds * matchData[i].odds <= 1.45) {
        combo.push(matchData[i]);
        totalOdds *= matchData[i].odds;
      }
    }
    setSelectedMatches(combo);
  };

  useEffect(() => {
    autoSelectCombo();
  }, []);

  const totalOdds = selectedMatches.reduce((acc, match) => acc * match.odds, 1);
  const possibleWin = (stake * totalOdds).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">SmartBet Helper</h1>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <select className="border p-2 rounded" defaultValue="Next 2 Hours">
            <option>Next 2 Hours</option>
            <option>Today</option>
          </select>
          <select className="border p-2 rounded" defaultValue="Over 1.5">
            <option>Over 1.5</option>
            <option>GG</option>
            <option>1X2</option>
          </select>
          <div className="flex gap-2">
            <input type="number" placeholder="1.4" className="border p-2 rounded w-1/2" />
            <input type="number" placeholder="1.6" className="border p-2 rounded w-1/2" />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded mb-4">
          <p className="font-semibold">Auto-Selected Combo</p>
          <p>Stake: NGN {stake}</p>
          <p className="font-bold">Possible Win: NGN {possibleWin}</p>
        </div>

        <h2 className="font-semibold mb-2">Upcoming Matches</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th>Match</th>
              <th>Time</th>
              <th>Market</th>
              <th>Odds</th>
            </tr>
          </thead>
          <tbody>
            {matchData.map((match) => (
              <tr key={match.id} className="border-b">
                <td>{match.match}</td>
                <td>{match.time}</td>
                <td>{match.market}</td>
                <td>{match.odds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
