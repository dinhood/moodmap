import { useNavigate } from "react-router-dom";
import MoodCell from "./MoodCell.jsx";

function getLastNDates(n) {
  const dates = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10)); // "YYYY-MM-DD"
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
    // navega para /mapa/:date usando hook de navegação
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
