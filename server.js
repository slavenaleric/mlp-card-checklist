const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'collection.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load saved collection from disk so data persists
let collection = {};
if (fs.existsSync(DATA_FILE)) {
    try {
        collection = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
        collection = {};
    }
}

function saveCollection() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(collection, null, 2));
}

io.on('connection', (socket) => {
    // Send current collection state to newly connected client
    socket.emit('init_state', collection);

    // Listen for card updates from you or your girlfriend
    socket.on('update_card', ({ code, amount }) => {
        const current = collection[code] || 0;
        const newCount = Math.max(0, current + amount);
        
        if (newCount === 0) {
            delete collection[code];
        } else {
            collection[code] = newCount;
        }

        saveCollection();

        // Broadcast updated collection to BOTH your PC and phone instantly!
        io.emit('sync_collection', collection);
    });

    // Listen for collection reset
    socket.on('reset_collection', () => {
        collection = {};
        saveCollection();
        io.emit('sync_collection', collection);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});