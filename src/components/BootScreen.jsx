import { useEffect, useState } from "react";

export default function BootScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500); // 2.5 segundos

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="boot-screen">
      <div className="boot-window">
        <div className="boot-title">MOODMAP // TERMINAL CORPORATIVO</div>
        <div className="boot-body">
          <p>INICIALIZANDO SISTEMA DE CARTOGRAFIA EMOCIONAL...</p>
          <p>&gt; Verificando credenciais de colaborador...</p>
          <p>&gt; Carregando setores: BEM-ESTAR · PRODUTIVIDADE · COMPORTAMENTO...</p>
          <p>
            &gt; Estado do sistema: <span className="boot-ok">OK</span>
          </p>
          <p className="boot-hint">Pressione qualquer tecla para continuar_</p>
        </div>
      </div>
    </div>
  );
}
