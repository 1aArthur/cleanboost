# Guia de Build do APK - CleanBoost

Este guia explica como gerar o arquivo APK do CleanBoost para instalação em dispositivos Android.

## 🚀 Opção 1: Build Automático via GitHub Actions (Recomendado)

### Passo 1: Ativar o Workflow

1. Acesse o repositório: https://github.com/1aArthur/cleanboost
2. Vá para a aba **"Actions"**
3. Selecione o workflow **"Build APK"**
4. Clique em **"Run workflow"** → **"Run workflow"**

### Passo 2: Aguardar o Build

- O build levará entre 15-30 minutos
- Você pode acompanhar o progresso na aba Actions
- Quando terminar, aparecerá um ✅ verde

### Passo 3: Baixar o APK

1. Clique no workflow concluído
2. Vá para a seção **"Artifacts"**
3. Baixe o arquivo `cleanboost-apk`
4. Extraia o arquivo ZIP para obter o `cleanboost.apk`

### Passo 4: Instalar no Dispositivo

```bash
# Conecte seu dispositivo via USB
# Ative o modo de desenvolvedor e depuração USB

# Instale o APK
adb install cleanboost.apk

# Ou abra o arquivo no seu dispositivo e instale manualmente
```

---

## 🛠️ Opção 2: Build Local com EAS CLI

### Pré-requisitos

```bash
# Instalar Node.js 22+
node --version  # v22.13.0 ou superior

# Instalar EAS CLI globalmente
npm install -g eas-cli

# Fazer login na Expo
eas login
# (Crie uma conta em https://expo.dev se não tiver)
```

### Build

```bash
# Navegar para o diretório do projeto
cd /home/ubuntu/lovable-app

# Executar o build
eas build --platform android

# Ou para build local (mais rápido, mas requer Android SDK)
eas build --platform android --local
```

### Resultado

- O APK será gerado em `./cleanboost.apk`
- Ou você pode baixar do link fornecido pelo EAS

---

## 📲 Opção 3: Testar com Expo Go (Sem APK)

Se você só quer testar o app sem gerar um APK:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Escaneie o QR code com Expo Go
# (Disponível na Play Store)
```

---

## ✅ Verificar o APK

Depois de gerar o APK, você pode verificar se está válido:

```bash
# Listar conteúdo do APK
unzip -l cleanboost.apk | head -20

# Verificar assinatura (se assinado)
jarsigner -verify -verbose cleanboost.apk

# Tamanho do arquivo
ls -lh cleanboost.apk
```

---

## 🔧 Solução de Problemas

### "EAS_TOKEN não configurado"

Se o GitHub Actions falhar com erro de token:

1. Acesse https://expo.dev/settings/tokens
2. Crie um novo token
3. Adicione ao repositório GitHub:
   - Vá para **Settings** → **Secrets and variables** → **Actions**
   - Clique em **"New repository secret"**
   - Nome: `EAS_TOKEN`
   - Valor: Cole o token do Expo

### "Build falhou"

1. Verifique se há erros de TypeScript:
   ```bash
   npm run type-check
   ```

2. Limpe o cache:
   ```bash
   npm run clean
   npm install
   ```

3. Verifique os logs do build no GitHub Actions

### "APK muito grande"

O APK pode ter 100-200MB. Isso é normal para aplicativos React Native com Expo.

---

## 📊 Informações do Build

- **Plataforma**: Android
- **Formato**: APK (não AAB)
- **Tamanho esperado**: 100-200MB
- **Tempo de build**: 15-30 minutos
- **Requisito mínimo**: Android 5.0 (API 21)

---

## 📝 Notas

- O APK é gerado em modo release (otimizado)
- Não é assinado com certificado de produção (apenas para teste)
- Para distribuir na Play Store, você precisará assinar com seu certificado

---

## 🆘 Precisa de Ajuda?

1. Verifique os logs do GitHub Actions
2. Abra uma issue no repositório
3. Consulte a documentação do Expo: https://docs.expo.dev/build/setup/

---

**Última atualização:** Dec 19, 2025
