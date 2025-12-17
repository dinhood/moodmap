import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodSelector from "../components/MoodSelector.jsx";
import FeedbackAlert from "../components/FeedbackAlert.jsx";
import { toLocalYMD } from "../utils/date.js";

function loadMoods() {
  const saved = localStorage.getItem("moodmap:moods");
  return saved ? JSON.parse(saved) : [];
}

function saveMoods(moods) {
  localStorage.setItem("moodmap:moods", JSON.stringify(moods));
}

function loadDeletedDates() {
  const saved = localStorage.getItem("moodmap:deletedDates");
  return saved ? JSON.parse(saved) : [];
}

function saveDeletedDates(dates) {
  localStorage.setItem("moodmap:deletedDates", JSON.stringify(dates));
}

export default function RegisterMoodPage() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const today = toLocalYMD(); // data local correta

    // 🔓 se o dia estava apagado, desbloqueia automaticamente
    const deleted = loadDeletedDates();
    if (deleted.includes(today)) {
      saveDeletedDates(deleted.filter((d) => d !== today));
    }

    const moods = loadMoods();

    const newEntry = {
      date: today,
      mood,
      note,
    };

    const withoutToday = moods.filter((m) => m.date !== today);
    const updated = [...withoutToday, newEntry].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    saveMoods(updated);

    // 🔊 SOM DE SUCESSO
    try {
      const audio = new Audio("/sounds/success.mp3");
      audio.volume = 0.4;
      audio.currentTime = 0;
      audio.play();
    } catch (err) {
      // se o navegador bloquear, ignora
    }

    setFeedback("Humor de hoje registrado com sucesso.");
    setNote("");

    setTimeout(() => {
      navigate("/mapa");
    }, 700);
  }

  return (
    <section className="page register-page">
      <h2>Registrar humor</h2>

      <FeedbackAlert type="success" message={feedback} />

      <form className="mood-form" onSubmit={handleSubmit}>
        <label>Como você está se sentindo hoje?</label>
        <MoodSelector value={mood} onChange={setMood} />

        <label htmlFor="note">
          Quer anotar algo sobre o dia? (opcional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ex: Dia corrido, mas produtivo…"
        />

        <button className="btn primary" type="submit" disabled={!mood}>
          Salvar humor
        </button>
      </form>
    </section>
  );
}
