import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page notfound-page">
      <h2>Setor não encontrado</h2>

      <p>
        A rota acessada não corresponde a nenhum departamento autorizado do sistema
        de Cartografia Emocional.
      </p>

      <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
        Seu acesso foi registrado para fins de auditoria interna. Caso isso tenha
        sido um engano, retorne ao setor apropriado.
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link className="btn primary" to="/">
          Retornar ao Departamento
        </Link>
      </div>
    </section>
  );
}
