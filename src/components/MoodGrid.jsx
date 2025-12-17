import { useNavigate } from "react-router-dom";
import MoodCell from "./MoodCell.jsx";
import { toLocalYMD } from "../utils/date.js";

function getLastNDates(n) {
  const dates = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - i);
    dates.push(toLocalYMD(d));
  }

  return dates;
}

export default function MoodGrid({ moods }) {
  const navigate = useNavigate();
  const dates = getLastNDates(30);

  const moodsByDate = moods.reduce((acc, m) => {
    acc[m.date] = m;
    return acc;
  }, {});

  return (
    <div className="mood-grid">
      {dates.map((date) => {
        const entry = moodsByDate[date];

        return (
          <MoodCell
            key={date}
            date={date}
            mood={entry?.mood}
            onClick={() => navigate(`/mapa/${date}`)}
          />
        );
      })}
    </div>
  );
}
