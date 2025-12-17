import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodSelector from "../components/MoodSelector.jsx";
import FeedbackAlert from "../components/FeedbackAlert.jsx";

function loadMoods() {
  const saved = localStorage.getItem("moodmap:moods");
  return saved ? JSON.parse(saved) : [];
}

function saveMoods(moods) {
  localStorage.setItem("moodmap:moods", JSON.stringify(moods));
}

export default function RegisterMoodPage() {
  const [mood, setMood] = useState("");        // humor escolhido
  const [note, setNote] = useState("");        // anotação opcional
  const [feedback, setFeedback] = useState(""); // mensagem na tela

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    const moods = loadMoods();

    const newEntry = {
      date: today,
      mood,
      note,
    };

    // remove registro anterior do mesmo dia, se existir
    const withoutToday = moods.filter((m) => m.date !== today);
    const updated = [...withoutToday, newEntry];

    // salva os dados
    saveMoods(updated);

    // 🔊 toca som de confirmação
    try {
      const audio = new Audio("/sounds/confirm-beep.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (e) {
      console.warn("Erro ao tocar som de confirmação:", e);
    }

    setFeedback("Humor de hoje registrado com sucesso! ✅");
    setNote("");

    // depois de 1 segundo, manda para o mapa
    setTimeout(() => {
      navigate("/mapa");
    }, 1000);
  }

  return (
    <section className="page register-page">
      <h2>Registrar humor</h2>

      <FeedbackAlert type="success" message={feedback} />

      <form className="mood-form" onSubmit={handleSubmit}>
        <label>Como você está se sentindo hoje?</label>
        <MoodSelector value={mood} onChange={setMood} />

        <label htmlFor="note">Quer anotar algo sobre o dia? (opcional)</label>
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
