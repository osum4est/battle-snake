var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    (function (Direction) {
        Direction[Direction["NONE"] = 0] = "NONE";
        Direction[Direction["LEFT"] = 1] = "LEFT";
        Direction[Direction["RIGHT"] = 2] = "RIGHT";
        Direction[Direction["UP"] = 3] = "UP";
        Direction[Direction["DOWN"] = 4] = "DOWN";
    })(BattleSnake.Direction || (BattleSnake.Direction = {}));
    var Direction = BattleSnake.Direction;
    var Snake = (function (_super) {
        __extends(Snake, _super);
        function Snake(json) {
            _super.call(this);
            this.tailIndex = 0;
            this.loadJSON(json);
        }
        Snake.prototype.loadJSON = function (json) {
            if (json['direction'] != null)
                this.direction = json['direction'];
            if (json['tailIndex'] != null)
                this.tailIndex = json['tailIndex'];
            if (json['head'] != null)
                this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            if (json['body'] != null) {
                this.body = new Array();
                for (var i = 0; i < json['body'].length; i++) {
                    this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']));
                }
            }
            if (json['grow'] != null && json['grow'] != 0) {
                console.log("growing");
                this.grow(json['grow']);
            }
        };
        Snake.prototype.grow = function (amount) {
            for (var i = 0; i < amount; i++) {
                this.body.splice(this.tailIndex, 0, new SnakePart(this.head.x, this.head.y, Number("0x" + (Math.random() * 0xFFFFFF << 0).toString(16))));
            }
            this.tailIndex += amount;
        };
        Snake.prototype.render = function (rendering) {
            rendering.drawSquare(this.head.x * BattleSnake.Play.boardSize, this.head.y * BattleSnake.Play.boardSize, BattleSnake.Play.boardSize, this.head.color);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x * BattleSnake.Play.boardSize, this.body[i].y * BattleSnake.Play.boardSize, BattleSnake.Play.boardSize, this.body[i].color);
        };
        Snake.prototype.move = function () {
            var moveX = 0;
            var moveY = 0;
            switch (this.direction) {
                case Direction.LEFT:
                    moveX = -1;
                    break;
                case Direction.RIGHT:
                    moveX = 1;
                    break;
                case Direction.UP:
                    moveY = -1;
                    break;
                case Direction.DOWN:
                    moveY = 1;
                    break;
            }
            this.body[this.tailIndex].x = this.head.x;
            this.body[this.tailIndex].y = this.head.y;
            this.tailIndex--;
            if (this.tailIndex < 0)
                this.tailIndex = this.body.length - 1;
            if (this.head.x + moveX >= (BattleSnake.Play.boardWidth - 1))
                this.head.x = 1;
            else if (this.head.x + moveX <= 0)
                this.head.x = (BattleSnake.Play.boardWidth - 2);
            else if (this.head.y + moveY >= (BattleSnake.Play.boardHeight - 1))
                this.head.y = 1;
            else if (this.head.y + moveY <= 0)
                this.head.y = (BattleSnake.Play.boardHeight - 2);
            else {
                this.head.x += moveX;
                this.head.y += moveY;
            }
        };
        Snake.prototype.getJSON = function () {
            var json = {
                direction: this.direction,
                head: {
                    x: this.head.x,
                    y: this.head.y,
                    color: this.head.color
                }
            };
            json['body'] = [];
            for (var i = 0; i < this.body.length; i++) {
                json['body'][i] = {};
                json['body'][i]['x'] = this.body[i].x;
                json['body'][i]['y'] = this.body[i].y;
                json['body'][i]['color'] = this.body[i].color;
            }
            ;
            return json;
        };
        Snake.prototype.getDirectionJSON = function () {
            var json = {
                direction: this.direction
            };
            return json;
        };
        return Snake;
    })(BattleSnake.GameObject);
    BattleSnake.Snake = Snake;
    var SnakePart = (function () {
        function SnakePart(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
        return SnakePart;
    })();
    BattleSnake.SnakePart = SnakePart;
})(BattleSnake || (BattleSnake = {}));
