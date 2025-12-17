const moodColorMap = {
  muito_bem: "#00b35a",
  bem: "#7bbf6a",
  neutro: "#d8cfa8",
  mal: "#d87b32",
  estressado: "#8b1a1a",
  vazio: "#e5e5de",
};

export default function MoodCell({ date, mood, onClick }) {
  const color = moodColorMap[mood || "vazio"];

  function handleClick() {
    try {
      const audio = new Audio("/sounds/click-beep.mp3");
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch (e) {
      console.warn("Erro ao tocar som de clique", e);
    }

    if (onClick) onClick();
  }

  return (
    <button
      className="mood-cell"
      style={{ backgroundColor: color }}
      onClick={handleClick}
      title={date}
      type="button"
    />
  );
}
