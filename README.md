# Chacket
* Esse projeto é uma POC numa tentativa de recriação simplificada das antigas salas de batepapos via web socket em tempo real com intuito de aprendizado e provar de conceito.
* Composto por 2 módulos de micros serviços (manager e server) e os arquivos do front-end.

 # /manager
 * Sw intermediário, implementa uma API e faz as persistências dos dados no banco mysql utilizando a porta 45000;

 # /server
 * Sw que servirá as aplicação com as trocas de mensagems em tempo real via websocket além de instanciar um httpserver também para as requisições do o front.

 # /front-end
 * Sw interface de usuário da aplicação.

 # Arquitetura
 ![alt text](bd/chacket_arch.png?)

 # Estrutura do Banco
 ![alt text](bd/Tables.png?)