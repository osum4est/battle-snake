module BattleSnake {
    import Game = Phaser.Game;
    export class Play extends Phaser.State implements IMultiplayerCallbacks, IInputCallbacks {

        static boardSize: number;
        static boardWidth: number;
        static boardHeight: number;

        gameObjects: Array<GameObject>;

        //snake: ClientSnake;
        oppSnakes: { [index: string]: Snake; } = {};

        rendering; Rendering;
        networking: Networking;

        create() {
            this.stage.backgroundColor = 0xF2F2F2;
            this.stage.disableVisibilityChange = true;
            this.rendering = new Rendering();
            this.rendering.init(this.game);
            this.networking = Networking.getInstance();
            this.networking.setMultiplayerCallbacks(this);

            this.gameObjects = new Array<GameObject>();

            this.networking.connect();

            Input.registerDirectionHandler(this);
        }

        directionInput(direction:BattleSnake.Direction) {
            if (direction != null && direction != Direction.NONE)
                Networking.getInstance().input({ direction: direction });
        }

        startGame() {
            console.log("starting game");
            this.gameObjects.forEach(go => {
                go.create();
            });
            this.makeBoard(Play.boardWidth, Play.boardHeight, 0x0000FF);
            this.networking.join();
        }

        getGameInfo(json: any) {
            Play.boardSize = json['boardSize'];
            Play.boardWidth = json['boardWidth'];
            Play.boardHeight = json['boardHeight'];
            this.startGame();
        }

        oppJoined(json: any, id: string) {
            this.oppSnakes[id] = new Snake(json);
            console.log("Snake with id: " + id + " has joined.");
        }

        snakeUpdate(json: any, id: string) {
            if (this.oppSnakes[id] != null) {
                this.oppSnakes[id].loadJSON(json);
                this.oppSnakes[id].move();
            }
        }

        oppLeft(id: string) {
            delete this.oppSnakes[id];
        }

        addGameObject(json: any, id: string) {
            this.gameObjects.push(new BasicGameObject(json['color'], json['x'], json['y'], id));
        }

        removeGameObject(id: string) {
            for (var i = 0; i < this.gameObjects.length; i++)
                if (this.gameObjects[i] instanceof BasicGameObject)
                    if ((<BasicGameObject>this.gameObjects[i]).id == id)
                        delete this.gameObjects[i];
        }

        update() {
            this.gameObjects.forEach(go => {
                go.update();
            });
        }

        render() {
            this.rendering.clear();

            for (var key in this.oppSnakes) {
                this.oppSnakes[key].render(this.rendering);
            }

            this.gameObjects.forEach(go => {
                go.render(this.rendering);
                
            });
        }

        makeBoard(width: number, height: number, color: number) {
            for (var i = 0; i < width; i++) {
                this.registerGameObject(new BasicGameObject(color, i, 0, null));
                this.registerGameObject(new BasicGameObject(color, i, (height - 1), null));
            }
            for(var i = 0; i < height; i++) {
                this.registerGameObject(new BasicGameObject(color, 0, i, null));
                this.registerGameObject(new BasicGameObject(color, (width - 1), i, null));
            }
        }

        registerGameObject(gameObject: GameObject) {
            this.gameObjects.push(gameObject);
        }
    }
}
