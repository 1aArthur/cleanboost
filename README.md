# CleanBoost - Aplicativo de Limpeza e Otimização

Um aplicativo Android nativo desenvolvido com React Native e Expo que oferece funcionalidades completas de limpeza e otimização de dispositivos.

## 🎯 Funcionalidades

- **Dashboard** - Visão geral completa do seu dispositivo com gráficos de saúde, armazenamento e RAM
- **Limpeza Rápida** - Limpe cache, arquivos temporários e lixo em um clique
- **Gerenciador de Arquivos** - Encontre e gerencie arquivos grandes que ocupam espaço
- **Monitor de RAM** - Acompanhe o uso de memória em tempo real com gráficos
- **Gerenciador de Apps** - Veja quais apps consomem mais bateria e dados
- **Configurações** - Personalize o aplicativo conforme suas necessidades

## 🛠️ Tecnologia

- **React Native** 0.81
- **Expo** 54
- **TypeScript** 5.9
- **Expo Router** 6 (Navegação)
- **React Native Reanimated** 4 (Animações)

## 📦 Instalação

### Pré-requisitos

- Node.js 22+
- npm ou pnpm
- Android Studio (para emulador) ou dispositivo Android físico
- Expo Go (para testar no dispositivo)

### Setup Local

```bash
# Clonar repositório
git clone https://github.com/1aArthur/cleanboost.git
cd cleanboost

# Instalar dependências
npm install
# ou
pnpm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Testar no Dispositivo

1. Instale o **Expo Go** na Play Store
2. Escaneie o QR code exibido no terminal
3. O app abrirá no seu dispositivo

## 🚀 Build do APK

### Opção 1: Build Local com EAS

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Fazer login
eas login

# Build do APK
eas build --platform android --local
```

### Opção 2: Build Automático com GitHub Actions

O repositório está configurado com GitHub Actions que gera o APK automaticamente:

1. Faça um push para a branch `main`
2. Acesse a aba "Actions" no GitHub
3. O workflow "Build APK" será executado automaticamente
4. Baixe o APK dos artifacts quando o build terminar

## 📁 Estrutura do Projeto

```
cleanboost/
├── app/
│   └── (tabs)/
│       ├── dashboard.tsx      # Tela inicial
│       ├── cleanup.tsx        # Limpeza rápida
│       ├── files.tsx          # Gerenciador de arquivos
│       ├── monitor.tsx        # Monitor de RAM
│       ├── apps.tsx           # Gerenciador de apps
│       └── _layout.tsx        # Navegação
├── components/
│   ├── health-ring.tsx        # Gráfico circular
│   ├── info-card.tsx          # Card de informação
│   └── quick-action-card.tsx  # Card de ação rápida
├── hooks/
│   └── use-device-info.ts     # Hook para dados do dispositivo
├── constants/
│   └── theme.ts               # Cores e tipografia
└── assets/
    └── images/                # Ícones e imagens
```

## 🎨 Design

O app segue as diretrizes do Apple Human Interface Guidelines com tema escuro moderno:

- **Cores principais**: Ciano (#00D9FF), Verde (#00C853), Vermelho (#FF3B30)
- **Fundo**: Azul muito escuro (#0A0E27)
- **Tipografia**: Sistema de fontes do iOS

## 📝 Permissões do Android

O app solicita as seguintes permissões:

- `READ_EXTERNAL_STORAGE` - Acessar arquivos
- `WRITE_EXTERNAL_STORAGE` - Modificar arquivos
- `MANAGE_EXTERNAL_STORAGE` - Gerenciar armazenamento
- `PACKAGE_USAGE_STATS` - Monitorar uso de apps
- `QUERY_ALL_PACKAGES` - Listar aplicativos
- `POST_NOTIFICATIONS` - Notificações

## 🧪 Testes

```bash
# Rodar testes
npm run test

# Testes com coverage
npm run test:coverage
```

## 📱 Requisitos do Dispositivo

- **Android**: 5.0+ (API 21+)
- **RAM**: 2GB mínimo
- **Espaço**: 50MB para instalação

## 🔐 Segurança

- Sem coleta de dados pessoais
- Sem anúncios
- Sem rastreamento
- Código aberto

## 📄 Licença

MIT License - veja LICENSE.md para detalhes

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📧 Suporte

Para suporte, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ usando React Native e Expo**
