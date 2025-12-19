# Design do CleanBoost - Aplicativo de Limpeza e Otimização

## Visão Geral
O **CleanBoost** é um aplicativo de limpeza e otimização de dispositivos Android que oferece uma interface intuitiva para gerenciar armazenamento, memória RAM e permissões de aplicativos. O design segue os padrões do iOS HIG com tema escuro moderno e acentos em verde/ciano.

## Lista de Telas

| Tela | Descrição | Componentes Principais |
|------|-----------|----------------------|
| **Dashboard (Início)** | Tela principal com visão geral do dispositivo | Gráfico de saúde, cards de armazenamento/RAM, ações rápidas |
| **Limpeza** | Interface de limpeza rápida e gerenciamento de cache | Botão de limpeza, progresso, histórico |
| **Arquivos** | Navegador de arquivos e gerenciamento de espaço | Lista de arquivos grandes, opções de exclusão |
| **Monitor** | Monitoramento em tempo real de RAM e CPU | Gráfico de uso, lista de apps por consumo |
| **Apps** | Gerenciamento de aplicativos instalados | Lista de apps, informações de consumo, opções de otimização |
| **Permissões** | Controle de permissões de aplicativos | Lista de permissões, controle granular |
| **Configurações** | Preferências do aplicativo | Tema, notificações, backup |

## Conteúdo Primário e Funcionalidades

### Dashboard (Início)
O dashboard é a tela principal que exibe:
- **Gráfico de Saúde**: Círculo animado mostrando saúde geral do dispositivo (72% no exemplo)
- **Cards de Informações**: Armazenamento (64.2 GB / 128 GB), RAM disponível (2.4 GB / 6 GB), Lixo estimado (1.8 GB)
- **Ações Rápidas**: Grid de 4 cards com ações principais (Limpeza Rápida, Arquivos Grandes, Monitor de RAM, Apps em 2º Plano)
- **Atividade Recente**: Timeline de ações realizadas

### Limpeza
Tela dedicada à limpeza do dispositivo com:
- Seleção de tipos de arquivo para limpar (cache, arquivos temporários, logs)
- Botão grande de "Limpeza Rápida" com indicador de espaço a liberar
- Progresso em tempo real durante a limpeza
- Histórico de limpezas realizadas

### Arquivos
Gerenciador de arquivos com:
- Lista de arquivos grandes ordenados por tamanho
- Informações de cada arquivo (nome, tamanho, data)
- Opções de visualização (lista, grid)
- Ações rápidas (deletar, mover, compartilhar)

### Monitor
Monitor de recursos do sistema com:
- Gráfico de uso de RAM em tempo real
- Gráfico de uso de CPU
- Lista de aplicativos ordenados por consumo
- Opções de otimização (forçar parada, limpeza de cache)

### Apps
Gerenciador de aplicativos com:
- Lista de todos os aplicativos instalados
- Informações de cada app (ícone, nome, tamanho, data de instalação)
- Consumo de bateria e dados
- Opções de desinstalação e otimização

### Permissões
Controle granular de permissões com:
- Lista de permissões do sistema (câmera, localização, contatos, etc.)
- Apps que usam cada permissão
- Toggle para ativar/desativar permissões
- Alertas de permissões perigosas

### Configurações
Preferências do aplicativo com:
- Tema (claro/escuro/automático)
- Notificações (ativar/desativar, frequência)
- Backup e restauração
- Sobre o aplicativo

## Fluxos de Usuário Principais

### Fluxo 1: Limpeza Rápida
1. Usuário abre o app no Dashboard
2. Toca em "Limpeza Rápida" (card ou menu)
3. Navega para tela de Limpeza
4. Toca em botão "Limpar Agora"
5. Progresso é exibido em tempo real
6. Após conclusão, exibe espaço liberado
7. Volta para Dashboard

### Fluxo 2: Gerenciar Arquivos Grandes
1. Usuário toca em "Arquivos Grandes" no Dashboard
2. Navega para tela de Arquivos
3. Vê lista de arquivos ordenados por tamanho
4. Toca em um arquivo para ver detalhes
5. Pode deletar ou mover o arquivo
6. Volta para Dashboard

### Fluxo 3: Otimizar Apps em 2º Plano
1. Usuário toca em "Apps em 2º Plano" no Dashboard
2. Navega para tela de Apps
3. Vê lista de apps filtrando por consumo de bateria
4. Toca em um app para ver detalhes
5. Pode forçar parada ou desinstalar
6. Volta para Dashboard

### Fluxo 4: Gerenciar Permissões
1. Usuário toca em "Permissões" na navegação
2. Navega para tela de Permissões
3. Vê lista de permissões do sistema
4. Toca em uma permissão para ver apps que a usam
5. Pode ativar/desativar permissão para cada app
6. Volta para Permissões

## Escolhas de Cor

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primária (Destaque)** | #00D9FF (Ciano/Verde) | Gráficos, botões principais, ícones ativos |
| **Secundária (Sucesso)** | #00C853 (Verde) | Indicadores de saúde, ações bem-sucedidas |
| **Destrutiva** | #FF3B30 (Vermelho) | Botões de deletar, alertas críticos |
| **Aviso** | #FFD60A (Amarelo) | Alertas de permissão, ações que precisam atenção |
| **Fundo Principal** | #0A0E27 (Azul muito escuro) | Fundo da tela |
| **Fundo Secundário** | #1A1F3A (Azul escuro) | Cards, containers |
| **Texto Primário** | #FFFFFF (Branco) | Texto principal |
| **Texto Secundário** | #B0B0B0 (Cinza claro) | Subtítulos, labels |
| **Texto Desabilitado** | #606060 (Cinza escuro) | Texto desabilitado |

## Padrões de Design

### Navegação
- **Bottom Tab Bar**: Navegação principal com 5-7 abas (Início, Limpeza, Arquivos, Monitor, Apps, Permissões, Configurações)
- **Ícones**: Todos preenchidos (filled) para consistência
- **Indicador Ativo**: Cor primária (#00D9FF)

### Componentes
- **Cards**: Fundo #1A1F3A, borda sutil, padding 16pt
- **Botões Primários**: Fundo #00D9FF, texto escuro, altura mínima 44pt
- **Botões Secundários**: Borda #00D9FF, fundo transparente
- **Gráficos**: Cores primárias e secundárias, animações suaves
- **Listas**: Separadores sutis, altura de linha 56pt

### Tipografia
- **Título**: 32pt, bold, #FFFFFF
- **Subtítulo**: 20pt, semibold, #FFFFFF
- **Body**: 16pt, regular, #FFFFFF
- **Caption**: 12pt, regular, #B0B0B0
- **Linha de altura**: 1.3× fontSize mínimo

### Espaçamento
- **Grid**: 8pt
- **Padding padrão**: 16pt
- **Gaps entre elementos**: 8pt, 12pt, 16pt, 24pt
- **Safe area**: Respeitar notches e home indicators

### Raio de Borda
- **Botões**: 8-12pt
- **Cards**: 12-16pt
- **Modals**: 16-24pt
- **Ícones**: 0pt (quadrados)

## Considerações de Implementação

### Responsive Design
- Otimizado para portrait (9:16)
- Suporta landscape com ajustes de layout
- Respeita safe areas para notches e home indicators

### Acessibilidade
- Contraste mínimo 4.5:1 para texto
- Touch targets mínimo 44pt
- Labels descritivas para ícones
- Suporte a dark mode nativo

### Performance
- Lazy loading de listas grandes
- Animações suaves com 60fps
- Otimização de imagens
- Cache de dados locais

### Integração com WebView
O aplicativo encapsula o site https://ahrapp.lovable.app em um WebView, mantendo a interface nativa do React Native para navegação e controles do sistema.
