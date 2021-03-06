var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.oppSnakes = {};
        }
        Play.prototype.create = function () {
            this.stage.backgroundColor = 0xF2F2F2;
            this.stage.disableVisibilityChange = true;
            this.rendering = new BattleSnake.Rendering();
            this.rendering.init(this.game);
            this.networking = BattleSnake.Networking.getInstance();
            this.networking.setMultiplayerCallbacks(this);
            this.gameObjects = new Array();
            this.networking.connect();
            BattleSnake.Input.registerDirectionHandler(this);
        };
        Play.prototype.directionInput = function (direction) {
            if (direction != null && direction != BattleSnake.Direction.NONE)
                BattleSnake.Networking.getInstance().input({ direction: direction });
        };
        Play.prototype.startGame = function () {
            console.log("starting game");
            this.gameObjects.forEach(function (go) {
                go.create();
            });
            this.makeBoard(Play.boardWidth, Play.boardHeight, 0x0000FF);
            this.networking.join();
        };
        Play.prototype.getGameInfo = function (json) {
            Play.boardSize = json['boardSize'];
            Play.boardWidth = json['boardWidth'];
            Play.boardHeight = json['boardHeight'];
            this.startGame();
        };
        Play.prototype.oppJoined = function (json, id) {
            this.oppSnakes[id] = new BattleSnake.Snake(json);
            console.log("Snake with id: " + id + " has joined.");
        };
        Play.prototype.snakeUpdate = function (json, id) {
            if (this.oppSnakes[id] != null) {
                this.oppSnakes[id].loadJSON(json);
                this.oppSnakes[id].move();
            }
        };
        Play.prototype.oppLeft = function (id) {
            delete this.oppSnakes[id];
        };
        Play.prototype.addGameObject = function (json, id) {
            this.gameObjects.push(new BattleSnake.BasicGameObject(json['color'], json['x'], json['y'], id));
        };
        Play.prototype.removeGameObject = function (id) {
            for (var i = 0; i < this.gameObjects.length; i++)
                if (this.gameObjects[i] instanceof BattleSnake.BasicGameObject)
                    if (this.gameObjects[i].id == id)
                        delete this.gameObjects[i];
        };
        Play.prototype.update = function () {
            this.gameObjects.forEach(function (go) {
                go.update();
            });
        };
        Play.prototype.render = function () {
            var _this = this;
            this.rendering.clear();
            for (var key in this.oppSnakes) {
                this.oppSnakes[key].render(this.rendering);
            }
            this.gameObjects.forEach(function (go) {
                go.render(_this.rendering);
            });
        };
        Play.prototype.makeBoard = function (width, height, color) {
            for (var i = 0; i < width; i++) {
                this.registerGameObject(new BattleSnake.BasicGameObject(color, i, 0, null));
                this.registerGameObject(new BattleSnake.BasicGameObject(color, i, (height - 1), null));
            }
            for (var i = 0; i < height; i++) {
                this.registerGameObject(new BattleSnake.BasicGameObject(color, 0, i, null));
                this.registerGameObject(new BattleSnake.BasicGameObject(color, (width - 1), i, null));
            }
        };
        Play.prototype.registerGameObject = function (gameObject) {
            this.gameObjects.push(gameObject);
        };
        return Play;
    })(Phaser.State);
    BattleSnake.Play = Play;
})(BattleSnake || (BattleSnake = {}));
