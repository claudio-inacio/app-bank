App Bank

Aplicação front-end que simula um sistema bancário com:

Login
Dashboard com saldo
Transferência entre contas
Histórico de transações

A aplicação funciona sem backend real, utilizando uma camada de Fake API para simular requisições e estado.

Credenciais para teste
CPF: 23412013005
Senha: 123456

Rodando com Docker (opcional)
1. Build da imagem
docker build -t app-bank .
2. Subir o container
docker run -d -p 8080:80 --name app-bank-container app-bank
3. Acessar Navegador
http://localhost:8080

Rodando Local
1. Baixar pacotes
npm install
2. Executar projeto desenvolvimento
npm run dev


Como funciona (arquitetura)
Arquitetura inicial baseada de Feature-Drive, acredito ser uma arquitetura limpa, facil de escalar futuramente alem de nos permitir desenvolver codigos com menos acoplamento

A aplicação utiliza:

 - Staks principais:
React + TypeScript
Vite

React Query -> Utilizado para realizar armazenamento de requisições de forma cacheada

Zustand -> Utilizado para armazenar valores locais como dados de login do usuário, saldo entre outros

Tailwind + shadcn/ui (UI) -> Lib exigida para estilização de telas e componentes

zod -> Responsavel pela validação dos formularios que hoje foram desenvolvidos com ReactHookForm

React Router -> Controle de rotas privadas e navegação entre rotas.

Fake API (simulação de backend) -> utilizando fake api em produção e msw para testes e simulação da api quando a aplicação esta rodando localmente.

ViTest -> Utilizado como base de testes, podendo testar logicas, componentes e ações do sistemas.


// MELHORIAS FUTURAS
- SALDO:
    - RECEBER DA API E EXIBIR OS VALORES DE ENTRADAS E SAIDAS DOS ULTIMOS 30/60/90 DIAS
    - COMPONENTE PRONTO PARA APLICAÇÃO FUTURA
    - MANTER O NOVO SALDO APÓS UMA TRANSFERENCIA SALVO NO LOCALSTORAGE, CASO LOGUE SEQUENCIALMENTE COM O MESMO CPF MOSTRAMOS O VALOR ATUALIZADO, SE LOGAR COM UM CPF DIFERENTE ESSE VALOR É PERDIDO E VOLTA PARA O INICIAL

- TRANSAÇÕES:
    - A PASTA "TRANSACTIONS" HOJE ESTA SOMENTE COM A API getTransactions, OS ELEMENTOS DESSA FEATURE SERIAM DESENVOLVIDOS FUTURAMENTE QUANDO TIVESSEMOS UMA TELA "LISTA DE TRANSFERENCIAS" ONDE O USUARIO APENAS IRIA VER SUAS TRANSFERENCIAS E GERENCIALAS.
    - HOJE A API APENAS ESTA SENDO UTILIZADA PARA SEDER INFORMAÇÕES PARA O NOSSO DASHBOARD.
    - FAZER COM QUE A NOSSA LISTA DE TRANSAÇÕES SEJA MAPEADA, DESSA FORMA PODEMOS MANIPULAR A LISTA (INSERIR, ALTERAR, REMOVER) ITENS SEM QUE SEJA NECESSARIO FAZER UMA REQUISIÇÃO PARA QUE A MESMA SEJA ATUALIZADA

- LOGOUT:
    - IMPLEMENTAR UM LOGIN DEFAULT QUE SERVE PARA AÇÕES DO SISTEMA, ESSE LOGIN SERIA UTILIZADO INICIALMENTE DURANTE O LOGOUT E O LOGIN

 - ERROS:
    - MELHORAR O INTERCEPTORS DO AXIOS, PARA TRATAVIA DE ERROS PADRÃO... EXIBINDO UM COMPONENTE PROPRIO PARA ERRO DA API
    - HOJE A EIXIBIÇÃO DOS ERROS É REALIZADA EM UM TOAST, FUTURAMENTE DEVERIAMOS CRIAR UM MODAL/DIALOG ONDE O USUARIO PODERIA LER O ERRO E CLICAR EM "OK, ENTENDI"... DESSA FORMA GARANTIMOS QUE O USUARIO ESTA CIENTE DO ERRO.




    // VAZAMENTOS DE DADOS


    // ENGENHARIA REVERSA

    // ADICIONAR UM MODAL NA TELA DE LOGIN EXIBINDO O USUARIO E SENHA PADRÃO