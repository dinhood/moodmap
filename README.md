# MoodMap

MoodMap é uma aplicação front-end desenvolvida em React que permite ao setor de Recursos Humanos acompanhar o registro do estado emocional dos colaboradores ao longo dos dias, por meio de um mapa visual interativo.

O projeto possui uma estética minimalista inspirada na série de ficção científica "Ruptura", com interfaces corporativas retrô (anos 80), utilizando elementos visuais que simulam sistemas computacionais antigos e mensagens institucionais.

Este projeto foi desenvolvido como um MVP (Minimum Viable Product) para fins acadêmicos, com foco nos conceitos de componentização, roteamento, usabilidade e boas práticas de organização de código.

---

## Funcionalidades

- Registro do humor diário com anotação opcional
- Visualização dos registros em um mapa de humor
- Detalhamento do humor ao selecionar uma data específica
- Exclusão de registros individuais de humor
- Envio de relatório de humor por e-mail
- Simulação de carregamento de dados a partir de um arquivo JSON local
- Tela inicial com animação de inicialização do sistema
- Feedback visual para estados de carregamento, sucesso e erro
- Layout responsivo para desktop, tablet e dispositivos móveis

---

## Tecnologias Utilizadas

- React
- Vite
- React Router DOM
- JavaScript (ES6+)
- CSS
- LocalStorage (simulação de persistência de dados)
- JSON local (simulação de servidor)

---

## Estrutura do Projeto

src/
├── components/ # Componentes reutilizáveis
│ ├── Header.jsx
│ ├── BootScreen.jsx
│ ├── MoodGrid.jsx
│ ├── MoodCell.jsx
│ ├── MoodSelector.jsx
│ ├── Tooltip.jsx
│ ├── FeedbackAlert.jsx
│ └── ConfidentialBanner.jsx
│
├── pages/ # Páginas da aplicação
│ ├── HomePage.jsx
│ ├── RegisterMoodPage.jsx
│ ├── MoodMapPage.jsx
│ └── NotFoundPage.jsx
│
├── data/
│ └── moods.json # Dados simulados do servidor
│
├── styles/
│ └── global.css # Estilos globais
│
├── App.jsx
└── main.jsx


---

## Navegação da Aplicação

- `/` — Página inicial
- `/registrar` — Registro de humor
- `/mapa` — Mapa de humor
- `/mapa/:date` — Detalhes do humor por data
- `*` — Página de erro (rota inexistente)

---

## Simulação de Servidor

As requisições a um servidor foram simuladas por meio da leitura de um arquivo JSON local (moods.json).  
Os registros criados pelo usuário são armazenados no LocalStorage, simulando a persistência de dados no cliente.

---

## Hooks Utilizados

- useState — controle de estados da aplicação
- useEffect — carregamento de dados simulados
- useNavigate — redirecionamento entre páginas
- useParams — leitura de parâmetros da URL
- useLocation — identificação da rota ativa

---

## Instalação e Execução

### Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

### Passos para execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/moodmap.git
Acesse a pasta do projeto:

cd moodmap


Instale as dependências:

npm install


Execute a aplicação:

npm run dev


Acesse no navegador:

http://localhost:5173
