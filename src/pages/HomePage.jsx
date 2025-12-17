import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="page home-page">
      <h1>Departamento de Cartografia Emocional</h1>

      <p>
        Este sistema interno registra e visualiza o estado emocional dos
        colaboradores ao longo dos dias.
      </p>

      <p style={{ fontSize: "0.8rem", marginTop: "0.6rem" }}>
        Ao prosseguir, você reconhece que suas variações de humor podem ser
        analisadas, categorizadas e arquivadas para fins de bem-estar
        organizacional.
      </p>

      <div className="home-actions">
        <Link className="btn primary" to="/registrar">
          Registrar estado atual
        </Link>
        <Link className="btn secondary" to="/mapa">
          Visualizar mapa de humor
        </Link>
      </div>
    </section>
  );
}
