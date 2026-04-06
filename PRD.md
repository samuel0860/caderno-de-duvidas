# Mini PRD — Caderno de Dúvidas

## Problema

**Qual problema específico?**
Estudantes perdem o fio do raciocínio quando dúvidas surgem durante os estudos.
A escolha é sempre ruim: parar tudo para pesquisar (quebra o foco) ou anotar
em algum lugar aleatório e nunca mais voltar para resolver. Dúvidas viram
lacunas de conhecimento silenciosas.

**Por que vale resolver?**
Dúvidas não resolvidas acumulam e fragilizam a base do aprendizado. Um sistema
que capture, organize e encerre dúvidas fecha esse ciclo — transformando
interrupções em aprendizado estruturado.

**Quem é o usuário?**
Estudante de cursos técnicos ou graduação que estuda de forma autodidata
(bootcamps, YouTube, Udemy, documentações). Estuda em sessões de 1–2h,
sem professor disponível para perguntar na hora. Quer manter o foco sem
perder as perguntas que surgem ao longo do caminho.

---

## Funcionalidades Essenciais

| Funcionalidade | Justificativa |
|---|---|
| Registrar uma dúvida (título + contexto + matéria) | Núcleo do problema. Sem isso, nada funciona. |
| Listar dúvidas abertas e resolvidas | Sem visibilidade, o usuário não sabe o que falta resolver. |
| Marcar como resolvida com registro da resposta | Fecha o ciclo de aprendizado — dúvida sem resposta registrada é conhecimento perdido. |
| Deletar dúvidas irrelevantes | A lista precisa ser confiável. Lixo acumulado destrói a confiança no sistema. |

**O que foi excluído e por quê:**
- **Tags/categorias além de "matéria"** → campo "subject" já cumpre essa função de forma mais simples.
- **Datas de prazo** → não é agenda, é caderno de dúvidas. Prazos mudariam o produto.
- **Busca** → relevante com volume alto de dúvidas. Entra como extra quando houver dados suficientes.
- **Autenticação** → fora do escopo. Um usuário, um dispositivo, por enquanto.

---

## Decisões Técnicas

### Entidades da API (json-server)

```json
{
  "doubts": [
    {
      "id": "string",
      "title": "string",
      "context": "string",
      "subject": "string",
      "status": "open | resolved",
      "answer": "string | null",
      "createdAt": "ISO 8601",
      "resolvedAt": "ISO 8601 | null"
    }
  ]
}
```

### Operações

| Método | Endpoint | Motivo |
|---|---|---|
| GET | /doubts | Carregar lista ao montar o componente |
| POST | /doubts | Criar nova dúvida pelo formulário |
| PATCH | /doubts/:id | Atualizar status + answer + resolvedAt (campos parciais — PUT enviaria o objeto inteiro desnecessariamente) |
| DELETE | /doubts/:id | Remover dúvida irrelevante |

### Sobre a confirmação de remoção
A remoção pede confirmação via `window.confirm`. A justificativa:
deletar é a única ação **irreversível** da aplicação — sem soft delete, não há como desfazer. O custo de um clique a mais é menor que o custo de perder uma dúvida por engano.

---

## Requisitos Técnicos Atendidos

| Requisito | Como foi atendido |
|---|---|
| React com componentes funcionais | Todos os componentes são funcionais |
| TypeScript com tipagem real | `interface Doubt`, `type DoubtStatus`, `CreateDoubtDTO`, `ResolveDoubtDTO`, props e eventos tipados |
| `useMemo` | Cálculo de `filteredDoubts`, `openCount`, `resolvedCount` |
| `useCallback` | `createDoubt`, `resolveDoubt`, `removeDoubt` no hook; handlers no `DoubtCard` |
| `useRef` | Foco automático no textarea do `ResolveModal` |
| Consumo de API REST | `axios` com `GET`, `POST`, `PATCH`, `DELETE` isolados em `doubtsApi.ts` |
| Tailwind CSS | Toda a estilização |
| Acessibilidade | HTML semântico, labels associados, `aria-invalid`, `aria-describedby`, `role="alert"`, `role="status"` |
| Loading / Erro / Vazio | Três estados visuais distintos |
| Custom Hook | `useDoubts` — encapsula estado, chamadas à API e lógica derivada |
