module BattleSnake {
    export class Networking {

        private static _instance: Networking = new Networking();

        private url: string = "localhost";
        private port: string = "8080";
        private callbacks: IMultiplayerCallbacks;
        private static id: string;

        socket: SocketIOClient.Socket;

        static getInstance(): Networking {
            return Networking._instance;
        }

        static getId(): string {
            return Networking.id;
        }

        connect() {
            //this.socket = io.connect("https://battle-snake-osum4est.c9users.io")
            //this.socket = io.connect("https://multiplayertest-8bitforest.rhcloud.com");
            this.socket = io.connect("localhost:8000");
            console.log("Connected to: " + this.socket.io.uri)

            var myself = this;
            this.socket.on('getGameInfo', function(data) {
                Networking.id = data['id'];
                console.log("My id is" + Networking.id);
                myself.callbacks.getGameInfo(data);
            }).on('oppJoined', function(data, id) {
                console.log("Opponent joined! " + data['size']);
                myself.callbacks.oppJoined(data, id);
            }).on('snakeUpdate', function(data, id) {
                myself.callbacks.snakeUpdate(data, id);
            }).on('oppLeft', function(id) {
                myself.callbacks.oppLeft(id);
            }).on('addGameObject', function(data, id) {
                myself.callbacks.addGameObject(data, id);
            }).on('removeGameObject', function(id) {
                myself.callbacks.removeGameObject(id);
            });
        }

        update(json: any) {
            this.socket.emit('update', json);
        }

        join() {
            this.socket.emit('joined');
        }

        input(json: any) {
            this.socket.emit('input', json);
        }

        setMultiplayerCallbacks(callbacks: IMultiplayerCallbacks) {
            this.callbacks = callbacks;
        }
    }
}
