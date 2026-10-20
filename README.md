# Banco API — Testes de Performance com k6

## 1. Introdução

Este projeto tem como objetivo desenvolver e executar testes de performance em uma API bancária utilizando **JavaScript e k6**, ferramenta open source de testes de carga e performance.

O projeto busca avaliar o comportamento da API sob diferentes condições de carga, permitindo observar métricas como tempo de resposta, quantidade de requisições, taxa de falhas e comportamento durante a execução dos cenários de teste.

Os testes são executados por meio de scripts JavaScript, com possibilidade de configurar a URL da API por variável de ambiente, acompanhar os resultados em tempo real e exportar relatórios em HTML para análise posterior.

**Repositório:** [banco-api-performance](https://github.com/marianadenarde/banco-api-performance)

## 2. Tecnologias utilizadas

- **JavaScript:** linguagem utilizada para implementar os cenários de teste.
- **Grafana k6:** ferramenta para execução de testes de carga e análise de métricas de performance.
- **Git:** controle de versão do código-fonte.
- **GitHub:** hospedagem do repositório e gerenciamento do código.

## 3. Estrutura do repositório

A estrutura do projeto está organizada para separar os cenários de teste das funções auxiliares reutilizáveis.

```text
banco-api-performance/
├── config/
│   └── config.local.json
├── fixture/
│   └── postLogin.json
├── helpers/
│   └── autenticacao.js
├── tests/
│   └── transferencias.test.js
|   └── login.test.js
├── utils/
│   └── variaveis.js
├── .gitignore
└── README.md
```

> A estrutura acima representa a organização prevista para o projeto. Ajuste a árvore conforme os arquivos e diretórios efetivamente existentes no repositório.

## 4. Objetivo de cada grupo de arquivos

### `fixture/`

Armazena arquivos estáticos como listagem de usuários e dados de entrada para os testes.

### `config/`

Arquivo de configuração de variáveis de ambiente.

### `tests/`

Diretório destinado aos scripts que implementam os cenários de teste de performance.

**Exemplo:** `transferencias.test.js`

Responsabilidades:
- Executar as requisições HTTP necessárias ao cenário.
- Simular as operações que serão avaliadas.
- Definir a carga de teste, quando aplicável.
- Validar respostas e registrar métricas de performance.
- Permitir a análise dos tempos de resposta e das falhas durante a execução.

### `helpers/`

Diretório destinado às funções auxiliares que podem ser reutilizadas por diferentes scripts de teste.

**Exemplo:** `autenticacao.js`

Responsabilidades:
- Centralizar funções auxiliares, como a autenticação na API.
- Evitar a duplicação de código entre cenários.
- Facilitar a manutenção e a reutilização de funcionalidades comuns.

### `utils/`

Funções utilitárias reutilizáveis.

### `.gitignore`

Arquivo responsável por definir quais arquivos e diretórios não devem ser versionados pelo Git.

Pode ser utilizado para excluir relatórios gerados durante os testes, arquivos temporários e arquivos locais que contenham configurações sensíveis.

### `README.md`

Documento principal do repositório, com informações sobre o projeto, tecnologias, estrutura, instalação e execução dos testes.

## 5. Instalação e execução do projeto

### 5.1. Pré-requisitos

Antes de executar o projeto, é necessário ter:

- Git instalado.
- Grafana k6 instalado e disponível no terminal.
- Acesso à API que será testada.
- Um terminal compatível com os comandos apresentados.

Documentação oficial de instalação do k6:

https://grafana.com/docs/k6/latest/set-up/install-k6/

### 5.2. Clonar o repositório

Clone o projeto e acesse seu diretório:

```bash
git clone https://github.com/marianadenarde/banco-api-performance.git
cd banco-api-performance
```

### 5.3. Configurar a variável de ambiente `BASE_URL`

A variável `BASE_URL` define o endereço-base da API que será utilizada pelos testes.

Os scripts podem acessar seu valor por meio de `__ENV.BASE_URL` no k6.

No Git Bash, informe a URL da API diretamente no comando de execução:

```bash
BASE_URL="http://localhost:3000" k6 run tests/transferencias.test.js
```

**Importante:** substitua `http://localhost:3000` pelo endereço real da API que deseja testar. O exemplo pressupõe que a API esteja disponível localmente nessa porta.

A variável deve conter o endereço-base esperado pelo código. Se os scripts acrescentarem caminhos como `/transferencias`, evite incluir esse mesmo caminho na variável.

### 5.4. Executar os testes de performance

Para executar o cenário de transferências:

```bash
BASE_URL="http://localhost:3000" k6 run tests/transferencias.test.js
```

Durante a execução, o k6 apresenta no terminal informações como:

- Quantidade de requisições executadas.
- Taxa de requisições por segundo.
- Tempo médio de resposta.
- Percentis de tempo de resposta, como p(90) e p(95), quando disponíveis.
- Quantidade e percentual de requisições com falha.
- Resultado das verificações implementadas no script.

As métricas efetivamente exibidas dependem das requisições, das verificações e das configurações definidas no teste.

### 5.5. Acompanhar o relatório em tempo real e exportar em HTML

O k6 possui um dashboard web integrado que permite acompanhar visualmente as métricas durante a execução dos testes.

Para habilitar o dashboard e exportar automaticamente o relatório em HTML ao final da execução, utilize:

```bash
BASE_URL="http://localhost:3000" K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/transferencias.test.js
```

Nesse comando:

- `BASE_URL`: define o endereço da API que será testada.
- `K6_WEB_DASHBOARD=true`: habilita o dashboard para acompanhamento em tempo real.
- `K6_WEB_DASHBOARD_EXPORT=html-report.html`: define o nome do arquivo HTML que será gerado ao final do teste.
- `k6 run`: executa o script de teste especificado.

Por padrão, o dashboard fica disponível em:

http://localhost:5665

O relatório `html-report.html` será gerado no diretório de trabalho quando a execução terminar. O arquivo poderá ser aberto em um navegador para consultar os resultados posteriormente.

**Observações:**
- A exportação ocorre ao final da execução, não continuamente durante o teste.
- O dashboard pode manter o processo do k6 ativo enquanto houver uma janela do dashboard aberta.
- Para que o relatório contenha gráficos, a duração do teste deve ser superior a três vezes o período de agregação configurado. O padrão é 10 segundos, portanto testes muito curtos podem não apresentar gráficos.
- O relatório exportado pode conter métricas e gráficos úteis para documentar os resultados e compartilhar a análise com outras pessoas.

Documentação oficial do dashboard:

https://grafana.com/docs/k6/latest/results-output/web-dashboard/

### 5.6. Boas práticas

- Utilize uma URL válida em `BASE_URL` antes de iniciar a execução.
- Execute os testes somente em ambientes autorizados.
- Evite realizar testes de carga contra sistemas de produção sem autorização e planejamento.
- Não armazene senhas, tokens ou outras credenciais diretamente no código ou no repositório.
- Analise os tempos de resposta, as taxas de erro e os percentis em conjunto, em vez de considerar apenas a média.
- Registre os cenários executados e as condições do teste para facilitar a comparação entre resultados.
- Considere a capacidade e os limites do ambiente testado ao definir a carga.

---

**Projeto desenvolvido para fins de estudo e prática em testes de performance de APIs com JavaScript e Grafana k6.**
