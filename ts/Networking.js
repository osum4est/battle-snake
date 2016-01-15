var BattleSnake;
(function (BattleSnake) {
    var Networking = (function () {
        function Networking() {
            this.url = "localhost";
            this.port = "8000";
        }
        Networking.getInstance = function () {
            return Networking._instance;
        };
        Networking.getId = function () {
            return Networking.id;
        };
        Networking.prototype.connect = function () {
            this.socket = io.connect("https://battle-snake-osum4est.c9users.io");
            console.log("Connected to: " + this.socket.io.uri);
            var myself = this;
            this.socket.on('getGameInfo', function (data) {
                Networking.id = data['id'];
                myself.callbacks.getGameInfo(data);
            }).on('oppJoined', function (data, id) {
                console.log("Opponent joined! " + data['size']);
                myself.callbacks.oppJoined(data, id);
            }).on('snakeUpdate', function (data, id) {
                myself.callbacks.snakeUpdate(data, id);
            }).on('oppLeft', function (id) {
                myself.callbacks.oppLeft(id);
            }).on('addGameObject', function (data, id) {
                myself.callbacks.addGameObject(data, id);
            }).on('removeGameObject', function (id) {
                myself.callbacks.removeGameObject(id);
            });
        };
        Networking.prototype.update = function (json) {
            this.socket.emit('update', json);
        };
        Networking.prototype.join = function (data) {
            this.socket.emit('joined', data);
        };
        Networking.prototype.input = function (json) {
            this.socket.emit('input', json);
        };
        Networking.prototype.setMultiplayerCallbacks = function (callbacks) {
            this.callbacks = callbacks;
        };
        Networking._instance = new Networking();
        return Networking;
    }());
    BattleSnake.Networking = Networking;
})(BattleSnake || (BattleSnake = {}));
