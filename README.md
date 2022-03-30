# Chacket
* This project is a POC - proof of concept in a tentative of simplified recriation of old chat rooms.
* It has 2 micro-services modules (manager and server) as well as front-end files.
* It uses the library socket.io to get real time conversations.

 # /manager
 * Sw middleware, implements an API and persists data in mysql server.

 # /server
 * It will serve the application with messages exchanges via socket besides to serve as a simple http server to handle all front requisitions.
 
 # /front-end
 * Simple User interface

 # Arquitetura
 ![alt text](bd/chacket_arch.png?)

 # Estrutura do Banco
 ![alt text](bd/Tables.png?)
