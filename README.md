# 📓 Caderno de Dúvidas

Aplicação para registrar, acompanhar e resolver dúvidas que surgem durante os estudos — sem perder o foco nem deixar perguntas sem resposta.

---

## O problema resolvido

Durante sessões de estudo autodidata, dúvidas surgem constantemente. Ou você para tudo para pesquisar (quebra o foco) ou anota em algum lugar aleatório e esquece. O Caderno de Dúvidas é um espaço dedicado para capturar essas perguntas e fechá-las com uma resposta registrada.

---

## Tecnologias

- **React 18** com componentes funcionais
- **TypeScript** com tipagem real (sem `any`)
- **Tailwind CSS** para estilização
- **Axios** para consumo da API REST
- **json-server** como API de desenvolvimento
- **Vite** como bundler

---

## Como rodar localmente

### Pré-requisitos
- Node.js 
- npm 9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/caderno-de-duvidas
cd caderno-de-duvidas

# Instale as dependências
npm install
```

### Rodando o projeto

Você precisará de **dois terminais**:

**Terminal 1 — API:**
```bash
npm run api
# Roda em http://localhost:3001
```

**Terminal 2 — App:**
```bash
npm run dev
# Roda em http://localhost:5173
```

---

## Estrutura de pastas

```
src/
├── api/
│   └── doubtsApi.ts       # Todas as chamadas à API isoladas aqui
├── components/
│   ├── DoubtCard.tsx      # Card de uma dúvida (aberta ou resolvida)
│   ├── DoubtForm.tsx      # Formulário de criação
│   ├── ResolveModal.tsx   # Modal para registrar a resposta
│   ├── FilterTabs.tsx     # Filtro por status
│   └── EmptyState.tsx     # Componente genérico reutilizável
├── hooks/
│   └── useDoubts.ts       # Custom hook — estado + API + dados derivados
├── types/
│   └── doubt.ts           # Interfaces e tipos
└── pages/
    └── HomePage.tsx       # Página principal
```

---

## Deploy

- **Frontend:** [link-do-deploy-aqui]
- **API:** [link-da-api-aqui]

---

## O que eu faria diferente com mais tempo

- Implementar busca por texto nas dúvidas
- Adicionar um dashboard com métricas (taxa de resolução por matéria, tempo médio para resolver)
- Substituir `window.confirm` por um modal de confirmação customizado
- Adicionar animações de entrada/saída nos cards com Framer Motion
- Persistência real com banco de dados ao invés de json-server
