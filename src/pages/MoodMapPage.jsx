import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackAlert from "../components/FeedbackAlert.jsx";
import MoodGrid from "../components/MoodGrid.jsx";
import Tooltip from "../components/Tooltip.jsx";

const MOOD_LABELS = {
  muito_bem: "Alta Produtividade",
  bem: "Produtividade Estável",
  neutro: "Operacional",
  mal: "Desvio Emocional",
  estressado: "Estado Crítico",
};

// "Servidor" – lê o JSON local
function loadServerMoods() {
  return import("../data/moods.json").then((module) => module.default);
}

// "Cliente" – lê o que foi salvo pelo usuário
function loadLocalMoods() {
  const saved = localStorage.getItem("moodmap:moods");
  return saved ? JSON.parse(saved) : [];
}

// Datas que o usuário mandou "sumir"
function loadDeletedDates() {
  const saved = localStorage.getItem("moodmap:deletedDates");
  return saved ? JSON.parse(saved) : [];
}

function saveDeletedDates(dates) {
  localStorage.setItem("moodmap:deletedDates", JSON.stringify(dates));
}

export default function MoodMapPage() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { date } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const serverMoods = await loadServerMoods();
        const localMoods = loadLocalMoods();
        const deletedDates = loadDeletedDates();

        const mergedByDate = {};

        serverMoods.forEach((m) => {
          mergedByDate[m.date] = m;
        });

        localMoods.forEach((m) => {
          mergedByDate[m.date] = m;
        });

        let mergedList = Object.values(mergedByDate).sort((a, b) =>
          a.date.localeCompare(b.date)
        );

        // remove do mapa qualquer data marcada como "apagada"
        mergedList = mergedList.filter(
          (m) => !deletedDates.includes(m.date)
        );

        setMoods(mergedList);
      } catch (e) {
        console.error(e);
        setError("Erro ao carregar dados de humor.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleDeleteDate(dateToDelete) {
    if (!dateToDelete) return;

    const confirmDelete = window.confirm(
      "Apagar o registro de humor desta data?"
    );
    if (!confirmDelete) return;

    // remove do localStorage (moods salvos pelo usuário)
    const local = loadLocalMoods();
    const updatedLocal = local.filter((m) => m.date !== dateToDelete);
    localStorage.setItem("moodmap:moods", JSON.stringify(updatedLocal));

    // marca essa data como apagada (mesmo se vier do JSON)
    const deleted = loadDeletedDates();
    if (!deleted.includes(dateToDelete)) {
      const updatedDeleted = [...deleted, dateToDelete];
      saveDeletedDates(updatedDeleted);
    }

    // atualiza o estado atual da tela
    setMoods((prev) => prev.filter((m) => m.date !== dateToDelete));
  }

  function handleSendEmail(entry, email) {
    if (!entry || !email) return;

    const subject = `Relatório de humor - ${entry.date}`;

    const mapLines = moods
      .map((m) => {
        const label = MOOD_LABELS[m.mood] || m.mood;
        const notePart = m.note ? ` | Nota: ${m.note}` : "";
        return `${m.date} - ${label}${notePart}`;
      })
      .join("\n");

    const body = [
      "Relatório de Humor - Sistema MoodMap",
      "",
      `Data focal: ${entry.date}`,
      `Estado: ${MOOD_LABELS[entry.mood] || entry.mood}`,
      `Anotação: ${entry.note || "Nenhuma anotação registrada."}`,
      "",
      "Mapa recente de humores:",
      mapLines || "Nenhum registro disponível.",
      "",
      "Este relatório foi gerado automaticamente pelo Departamento de Cartografia Emocional.",
    ].join("\n");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  }

  if (loading)
    return (
      <section className="page map-page">
        <h2>Mapa de Humor</h2>
        <FeedbackAlert type="info" message="Carregando dados de humor..." />
      </section>
    );

  if (error)
    return (
      <section className="page map-page">
        <h2>Mapa de Humor</h2>
        <FeedbackAlert type="error" message={error} />
      </section>
    );

  if (moods.length === 0)
    return (
      <section className="page map-page">
        <h2>Mapa de Humor</h2>
        <FeedbackAlert
          type="info"
          message="Nenhum registro de humor encontrado."
        />
      </section>
    );

  return (
    <section className="page map-page">
      <h2>Mapa de Humor</h2>

      {date && (
        <p className="map-focus">
          Exibindo detalhes da data: <strong>{date}</strong>
        </p>
      )}

      <MoodGrid moods={moods} />

      <div className="legend">
        <div>
          Legenda
          <Tooltip text="Interpretação interna dos estados emocionais conforme diretrizes corporativas." />
        </div>
        <span>Alta Produtividade / Estável – tons de verde</span>
        <span>Operacional – tons neutros</span>
        <span>Desvio Emocional / Estado Crítico – tons escuros/quentes</span>
      </div>

      {date && (
        <div className="day-details">
          {(() => {
            const entry = moods.find((m) => m.date === date);
            if (!entry) return <p>Nenhum registro para esta data.</p>;

            return (
              <>
                <p>
                  <strong>Data:</strong> {entry.date}
                </p>
                <p>
                  <strong>Humor:</strong>{" "}
                  {MOOD_LABELS[entry.mood] || entry.mood}
                </p>
                {entry.note && (
                  <p>
                    <strong>Anotação:</strong> {entry.note}</p>
                )}

                <div
                  style={{
                    marginTop: "0.9rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    maxWidth: "320px",
                  }}
                >
                  {showEmailForm ? (
                    <>
                      <label className="email-label">
                        Enviar relatório para:
                      </label>
                      <input
                        type="email"
                        className="email-input"
                        placeholder="exemplo@empresa.com"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                          marginTop: "0.25rem",
                        }}
                      >
                        <button
                          type="button"
                          className="btn primary"
                          disabled={!emailTo}
                          onClick={() => handleSendEmail(entry, emailTo)}
                        >
                          Enviar relatório por e-mail
                        </button>
                        <button
                          type="button"
                          className="btn secondary"
                          onClick={() => {
                            setShowEmailForm(false);
                            setEmailTo("");
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => setShowEmailForm(true)}
                    >
                      Enviar relatório por e-mail
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => handleDeleteDate(entry.date)}
                  >
                    Apagar registro desta data
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </section>
  );
}
