# DevProfile Lite

Sistema simples de autenticação e visualização de perfil desenvolvido com React e Firebase.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface
- **Next.js** - Framework React para desenvolvimento web
- **Firebase Authentication** - Autenticação de usuários
- **Firestore** - Banco de dados NoSQL para armazenar perfis
- **Tailwind CSS** - Framework CSS para estilização
- **TypeScript** - Tipagem estática para JavaScript

## 📋 Funcionalidades

- ✅ Cadastro de usuários com email e senha
- ✅ Login e logout de usuários
- ✅ Rotas protegidas (perfil acessível apenas após login)
- ✅ Visualização de dados do perfil lidos do Firestore
- ✅ Interface responsiva e intuitiva
- ✅ Tratamento de erros e feedback visual

## 🔧 Configuração Local

### 1. Clone o repositório
\`\`\`bash
git clone [seu-repositorio]
cd devprofile-lite
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure o Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative o Authentication (Email/Password)
4. Crie um banco Firestore
5. Copie as configurações do projeto

### 4. Configure as credenciais

Edite o arquivo `lib/firebase.ts` e substitua as configurações:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
}
\`\`\`

### 5. Configure o Firestore

Crie uma coleção chamada `userProfiles` no Firestore com a seguinte estrutura:

**Coleção:** `userProfiles`
**ID do documento:** UID do usuário (obtido após cadastro)
**Campos:**
\`\`\`json
{
  "nomeCompleto": "Seu Nome Completo",
  "bioCurta": "Uma breve descrição sobre você",
  "linkPortfolio": "https://seuportfolio.com"
}
\`\`\`

### 6. Execute o projeto
\`\`\`bash
npm run dev
\`\`\`

Acesse `http://localhost:3000` no seu navegador.

## 📱 Como usar

1. **Página Inicial**: Acesse a página inicial e escolha entre "Entrar" ou "Cadastrar"
2. **Cadastro**: Crie uma nova conta com email e senha
3. **Login**: Faça login com suas credenciais
4. **Perfil**: Após o login, visualize seus dados do perfil
5. **Logout**: Use o botão "Sair" para encerrar a sessão

## 🗂️ Estrutura do Projeto

\`\`\`
├── app/
│   ├── page.tsx          # Página inicial
│   ├── login/page.tsx    # Página de login
│   ├── signup/page.tsx   # Página de cadastro
│   └── profile/page.tsx  # Página do perfil (protegida)
├── lib/
│   └── firebase.ts       # Configuração do Firebase
├── components/
│   └── protected-route.tsx # Componente para rotas protegidas
└── README.md
\`\`\`

## 🔒 Segurança

- Senhas são gerenciadas pelo Firebase Authentication
- Rotas protegidas verificam autenticação antes do acesso
- Dados do perfil são lidos apenas para usuários autenticados
- Validação de formulários no frontend

## 📝 Notas Importantes

- Este é um projeto educacional focado em demonstrar conceitos básicos
- A funcionalidade de edição de perfil não está implementada (conforme requisitos)
- Os dados do perfil devem ser adicionados manualmente no console do Firestore
- O projeto usa Next.js mas os conceitos se aplicam a qualquer aplicação React

## 🎯 Objetivos de Aprendizagem Atendidos

- [x] Sistema de autenticação com Firebase
- [x] Leitura de dados do Firestore
- [x] Componentes React organizados
- [x] Gerenciamento de estado de autenticação
- [x] Navegação e proteção de rotas
- [x] Interface responsiva e funcional
