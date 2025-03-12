# Mute Mic Electron

Este é um aplicativo desenvolvido com **Electron.js** que permite **mutar e desmutar o microfone** facilmente.

## 🖥️ Plataformas Suportadas
✅ Windows  
✅ macOS  
✅ Linux  

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

- [Node.js (versão 18 ou superior)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Electron](https://www.electronjs.org/)
- [Yarn (opcional, mas recomendado)](https://yarnpkg.com/)

---

## 🔽 Clonando o repositório

Abra um terminal e execute:

git clone https://github.com/Aenewsss/mute-mic-electron.git
cd mute-mic-electron
📦 Instalando dependências
Você pode instalar as dependências usando npm ou yarn:

# Usando npm
npm install

# Usando yarn (recomendado)
yarn install
🚀 Rodando o projeto em modo de desenvolvimento
Para iniciar o projeto localmente e testar:

sh
Copy
Edit
# Usando npm
npm start

# Usando yarn
yarn start
📦 Criando a build do projeto
O Electron permite criar builds específicas para cada sistema operacional.
Execute o comando correspondente ao seu sistema:

🪟 Windows (Gerar .exe)

npm run build:win
Ou com yarn:
yarn build:win

O executável estará na pasta dist/.

🍎 macOS (Gerar .dmg)

npm run build:mac
Ou com yarn:
yarn build:mac

O arquivo .dmg estará na pasta dist/.

🐧 Linux (Gerar .AppImage)

npm run build:linux
Ou com yarn:
yarn build:linux

O arquivo .AppImage estará na pasta dist/.

⚙️ Configuração Avançada
Se precisar modificar a configuração do Electron Builder, edite o arquivo package.json na seção:

"build": {
  "appId": "com.mute.mic",
  "productName": "Mute Mic",
  "directories": {
    "output": "dist"
  },
  "win": {
    "target": "nsis"
  },
  "mac": {
    "target": "dmg"
  },
  "linux": {
    "target": "AppImage"
  }
}

Caso queira gerar todas as builds ao mesmo tempo:

npm run build
ou
yarn build

🛠️ Tecnologias Utilizadas
Electron.js para interface nativa
Node.js para manipulação do sistema
JavaScript/TypeScript para lógica do app
📄 Licença
Este projeto está sob a licença MIT.

🤝 Contribuições
Se você quiser contribuir, sinta-se à vontade para abrir Pull Requests! 💜

Esse **README** cobre todos os passos para **instalação, desenvolvimento e build** do projeto. Se precisar adicionar mais alguma coisa, só avisar! 🚀