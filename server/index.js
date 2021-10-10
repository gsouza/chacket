const cors = require('cors');
const path = require('path');
const http = require('http');
const express = require('express');
const ChatServer = require('./src/server');

const app = express();
app.use(cors());

const server = http.createServer(app);
const frontend = path.join(__dirname, '../front-end');

app.use(express.static(frontend));

new ChatServer(server);   