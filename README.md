App Bank

Aplicação front-end que simula um sistema bancário com:

Login
Dashboard com saldo
Transferência entre contas
Histórico de transações

A aplicação funciona sem backend real, utilizando uma camada de Fake API para simular requisições e estado.

Credenciais para teste

Link de Acesso do Projeto:
https://app-bank-nine.vercel.app/

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
Arquitetura inicial baseada de Feature-Driven, acredito ser uma arquitetura limpa, facil de escalar futuramente, alem de nos permitir desenvolver codigos com menos acoplamento

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
    - Umas das principais maneiras de evitarmos o vazamento de dados é garantir que todas nossas requisições sejam HTTPS, nos proporciona maior segurança e impede contra interceptação.

    - Remover dados sensiveis do nosso localStorage e cacheLocal como Zustand ou Redux, (remover tokens, senhas entre outros).
    ex: ao realizar login, salva apenas email e nome ou documento e nome

    - Garantir que não tenhamos consoles com informações desnecessarias

    - Atuar continuamente com tokens expiraveis e limpar nosso cache ao realizar logout

    Obs: em uma pesquisa que realizei, encontrei tambem uma boa pratica que são os Headers, tais como :
        Content-Security-Policy, X-Frame-Options, entre outros...
        Alguns headers nos permitem ter um controle pré determinado sobre os recursos que os navegadores podem carragar para nossa aplicação, ou até mesmo garantir que recursos só sejam disponibilizados caso estejam em nosso dominio.
        Com os Headers tambem podemos utilizar outras garantias de segurança que eles nos proporcionam.


    // ENGENHARIA REVERSA
 - No desenvolvimento de aplicativos para web creio não ser possivel garantir que nosso sistema esteja 100% protegido contra engenharia reversa, porem existem algumas decisões e melhorias que podemos tomar para dificultar esse processso.

    - Evitar ao maximo confiar em nosso front-End para realizar validações que afetam os dados do usuario... nessa aplicação eu fiz uma validação onde comparo se o valor de transferencia digitado é maior que o saldo atual, porem isso foi feito apenas para fins de teste, todas as nossas validações principalmente as que necessitam de comparações com dados internos devem ser realizadas e garantidas pelo nosso backend

    - Evitar expor dados sensiveis, como TOKENS, SECRET_KEYS ou qualquer outra coisa desse segmento, essas informações ficam expostas em nosso bundle que é gerado durante o build.

    - Evitar codigos descessarios e garantir que nossa aplicação não tenha console.log espalhados, tambem são boas praticas que ajudam a evitar.

    - Por fim o back-end deve ser responsavel por todas nossas ações mais criteriosas, limitar requisições, validar payload das req, rotas autenticadas e com validação de token com curta expiração e um dos mais principais seria o armazenamento dos cookies.