# ⚖️ Balance Me App

<p align="center">
  <img src="public/favicon.png" alt="Balance Me Logo" width="96" />
</p>

<p align="center">
  <strong>Visualize o equilíbrio entre lazer e obrigações, identifique sinais de sobrecarga e cultive uma rotina saudável e consciente.</strong>
</p>

---

## 📌 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Como Funciona](#-como-funciona)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar Localmente](#-como-executar-localmente)
- [Testes Automatizados](#-testes-automatizados)
- [Aprendizados e Decisões Técnicas](#-aprendizados-e-decisões-técnicas)
- [Licença e Propriedade Intelectual](#-licença-e-propriedade-intelectual)
- [Autor](#-autor)

---

## 📖 Sobre o Projeto

O **Balance Me** é uma aplicação web interativa concebida para auxiliar no autogerenciamento diário. Muitas vezes nos sentimos sobrecarregados sem entender a real proporção entre o que **precisamos fazer** (obrigações) e o que **nos recarrega as energias** (lazer e descanso).

Com uma proposta visual, simples e intuitiva, o usuário atribui pesos e níveis de intensidade a cada atividade do seu dia, permitindo que a aplicação gere uma régua de equilíbrio proporcional e dinâmica.

> *"Compreenda melhor o ritmo da sua rotina e identifique possíveis sinais de sobrecarga antes que eles virem estresse."*

---

## ✨ Funcionalidades

- 📝 **Registro Duplo de Atividades:**
  - **Obrigações:** Tarefas que exigem energia, esforço e dedicação.
  - **Lazer:** Momentos de descanso, prazer e bem-estar.
- 🎚️ **Controle de Intensidade Customizável:**
  - Slider intuitivo de **1 a 10** para mensurar o peso exigido ou o prazer obtido por cada atividade.
- 📊 **Barra de Equilíbrio Proporcional em Tempo Real:**
  - Cálculo automático de pontuação total por categoria e proporção percentual relativa.
  - Elemento acessível com papel semântico `role="meter"` para leitores de tela e métricas claras.
- 💾 **Persistência Local Automática:**
  - Armazenamento em `localStorage` via Zustand (`balance-me-storage`), mantendo as atividades salvas mesmo após atualizar ou fechar o navegador.
- 📂 **Sanfonas Interativas (Accordions):**
  - Interface organizada que permite recolher ou expandir os painéis de cadastro para manter o foco na visualização.
- 🗑️ **Remoção Dinâmica:**
  - Exclusão simples de itens cadastrados com atualização instantânea da régua e dos pontos acumulados.
- 🧩 **Tratamento de Estados Vazios (*Empty State*):**
  - Mensagens visuais convidativas e explicativas quando não há registros cadastrados.
- 🧪 **Cobertura de Testes Automatizados:**
  - Suíte de testes unitários e de integração validando os fluxos dos formulários e o comportamento dinâmico da régua de equilíbrio.

---

## 🎯 Como Funciona

```
                    ┌────────────────────────────────┐
                    │      Usuário insere atividade  │
                    │  (Nome + Intensidade de 1 a 10)│
                    └───────────────┬────────────────┘
                                    │
                                    ▼
                    ┌────────────────────────────────┐
                    │   Validação com Zod + Form     │
                    └───────────────┬────────────────┘
                                    │
                                    ▼
                    ┌────────────────────────────────┐
                    │  Atualização da Store Zustand  │
                    │   (com persistência no Local)  │
                    └───────────────┬────────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     Lista de Atividades       │               │       Barra de Progresso      │
│  (Obrigações vs Lazer)        │               │  (% Proporção e Pontuação)    │
└───────────────────────────────┘               └───────────────────────────────┘
```

1. **Adicione suas atividades:** Preencha o nome da obrigação ou do lazer e deslize o seletor para indicar sua intensidade (1 = leve, 10 = muito pesado / muito prazeroso).
2. **Acompanhe a régua:** Veja a proporção entre os pontos de obrigação e de lazer mudarem reativamente.
3. **Avalie o equilíbrio:** Dias com sobrecarga visual na barra de obrigações indicam necessidade de incluir mais pausas e atividades relaxantes.

---

## 🛠️ Tecnologias Utilizadas

### Frontend & Core
- **[React 19](https://react.dev/):** Biblioteca declarativa e moderna para interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança, clareza e previsibilidade de código.
- **[Vite](https://vitejs.dev/):** Build tool de altíssima performance para desenvolvimento ágil.

### Gerenciamento de Estado & Armazenamento
- **[Zustand](https://github.com/pmndrs/zustand):** Solução leve, descomplicada e sem *boilerplate* para gerenciamento do estado global.
- **Middleware `persist`:** Sincronização automática do estado com o `localStorage` do navegador.

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/):** Gerenciamento performático de formulários orientado a componentes não controlados.
- **[Zod](https://zod.dev/):** Declaração e validação de esquemas de dados com inferência estática de tipos TypeScript.
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers):** Conexão perfeita entre o React Hook Form e o Zod.

### Animações & Estilização
- **CSS Modules:** Estilos escopados localmente, evitando conflitos de classes globais.
- **[Motion](https://motion.dev/):** Biblioteca para animações fluidas e transições dinâmicas.

### Testes & Qualidade de Código
- **[Jest](https://jestjs.io/):** Framework de testes em JavaScript/TypeScript.
- **[Testing Library (React & User Event)](https://testing-library.com/):** Testes centrados no comportamento do usuário final.
- **ESLint & Prettier:** Padronização e formatação consistente do código.

---

## 📁 Estrutura do Projeto

```
balance-me-app/
├── public/                 # Ícones e imagens estáticas públicas
├── src/
│   ├── assets/             # Imagens e recursos gráficos
│   ├── components/         # Componentes modulares da aplicação
│   │   ├── Accordion/      # Painéis retráteis para formulários
│   │   ├── CurrentDate/    # Exibição formatada da data atual
│   │   ├── Empty State/    # Estados visuais para listas vazias
│   │   ├── Form/           # Formulários reutilizáveis com Zod + Hook Form
│   │   ├── Header/         # Cabeçalho com identidade visual e navegação
│   │   ├── ListItem/       # Linha de exibição e exclusão de atividades
│   │   └── Progress Bar/   # Régua proporcional e cálculo de métricas
│   ├── store/
│   │   └── useBalanceMeStore.ts # Estado global e ações (Zustand + Persist)
│   ├── types/
│   │   └── Item.ts         # Contratos e tipos TypeScript (Item, NewItem)
│   ├── __test__/           # Testes automatizados (Jest + Testing Library)
│   │   ├── addActivity.test.tsx
│   │   └── progressBar.test.tsx
│   ├── App.tsx             # Componente raiz que compõe a interface
│   ├── index.css           # Reset CSS e tipografia base
│   └── main.tsx            # Ponto de entrada do React DOM
├── index.html              # HTML base com meta tags e Open Graph
├── jest.config.ts          # Configurações do ambiente de testes Jest
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configuração base do TypeScript
└── vite.config.ts          # Configuração do Vite e plugins
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes `npm` (ou `pnpm` / `yarn`)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/filipesilveira-dev/balance-me-app.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd balance-me-app
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra seu navegador em [http://localhost:5173](http://localhost:5173).

5. **Gerar a versão de produção (build):**
   ```bash
   npm run build
   ```

6. **Visualizar a versão de build localmente:**
   ```bash
   npm run preview
   ```

---

## 🧪 Testes Automatizados

O projeto possui testes automatizados focados na integridade do estado global e na precisão dos cálculos da interface:

- **`addActivity.test.tsx`**: Valida a adição de itens com valores padrões e customizados via formulários tanto para obrigações quanto para lazer.
- **`progressBar.test.tsx`**: Garante o cálculo correto de pontuações, porcentagens relativas, atributos de acessibilidade (`role="meter"`, `aria-valuenow`, `aria-valuemax`) e o comportamento do *Empty State*.

Para executar a suíte de testes:

```bash
npm test
```

---

## 💡 Aprendizados e Decisões Técnicas

- **Separação de Responsabilidades e Componentização:** Construção de componentes atômicos e reutilizáveis (como o componente `Form`, utilizado para ambas as variantes: obrigações e lazer).
- **Validação Segura com Zod + React Hook Form:** Validação assíncrona, restrição de tamanho máximo de caracteres e conversão automática de tipos (`z.coerce.number()`).
- **Estado Global Simples com Zustand:** Ausência de *prop drilling* e sincronização instantânea de estado com `localStorage` através do middleware nativo `persist`.
- **Acessibilidade Web (a11y):** Uso de elementos e atributos semânticos, como `aria-label`, `aria-valuenow` e tags estruturais para leitores de tela.
- **React Compiler X React Hook Form:**  a presença de reactCompilerPreset() ativa o React Compiler, que trata register("name") como uma expressão pura e memoiza seu retorno, **desconhecendo que o react-hook-form v7 depende de efeitos colaterais na execução de register() a cada render**. A chamada a reset() sem parâmetros após onAddItem() zera os _fields, e a re-renderização disparada pela store 
`useBalanceMeStore` ativa o cache do React Compiler, impedindo a reidratação dos campos no formulário.

---

## ⚖️ Licença e Propriedade Intelectual

Este é um projeto autoral e uma **ideia original**. O código está público exclusivamente para fins de **exibição de portfólio**. 

> **Aviso de Direitos:** Todos os direitos estão reservados e o uso, cópia, distribuição ou reprodução deste código e ideia para fins comerciais ou não autorizados não são permitidos.

---

## 👤 Autor

Desenvolvido por **Filipe Silveira**

- **GitHub:** [@filipesilveira-dev](https://github.com/filipesilveira-dev)
- **Portfólio:** [filipesilveira-dev.github.io/portfolio](https://filipesilveira-dev.github.io/portfolio/)