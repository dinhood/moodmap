import { useNavigate } from "react-router-dom";
import MoodCell from "./MoodCell.jsx";

function toLocalYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getLastNDates(n) {
  const dates = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);

    // evita "pular dia" por causa de fuso/DST
    d.setHours(12, 0, 0, 0);

    d.setDate(d.getDate() - i);
    dates.push(toLocalYMD(d)); // "YYYY-MM-DD" (local)
  }

  return dates;
}

export default function MoodGrid({ moods }) {
  const navigate = useNavigate();

  const dates = getLastNDates(30);

  // transforma array em objeto { "2025-11-01": { ... } }
  const moodsByDate = moods.reduce((acc, m) => {
    acc[m.date] = m;
    return acc;
  }, {});

  function handleClickDay(date) {
    navigate(`/mapa/${date}`);
  }

  return (
    <div className="mood-grid">
      {dates.map((date) => {
        const entry = moodsByDate[date];

        return (
          <MoodCell
            key={date}
            date={date}
            mood={entry?.mood}
            onClick={() => handleClickDay(date)}
          />
        );
      })}
    </div>
  );
}
