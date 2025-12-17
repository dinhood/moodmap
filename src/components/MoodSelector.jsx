const MOODS = [
  {
    id: "muito_bem",
    label: "Alta Produtividade",
    emoji: "▲▲",
  },
  {
    id: "bem",
    label: "Produtividade Estável",
    emoji: "▲",
  },
  {
    id: "neutro",
    label: "Operacional",
    emoji: "▬",
  },
  {
    id: "mal",
    label: "Desvio Emocional",
    emoji: "▼",
  },
  {
    id: "estressado",
    label: "Estado Crítico",
    emoji: "!!",
  },
];

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="mood-selector">
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          type="button"
          className={`mood-option ${value === mood.id ? "selected" : ""}`}
          onClick={() => onChange(mood.id)}
        >
          <span className="emoji">{mood.emoji}</span>
          <span className="label">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
