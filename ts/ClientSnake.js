var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var ClientSnake = (function (_super) {
        __extends(ClientSnake, _super);
        function ClientSnake(speed, initLength, size, bodyColor, headColor) {
            _super.call(this, speed);
            this.changedDirection = true;
            this.direction = BattleSnake.Direction.RIGHT;
            this.speed = speed;
            this.size = size;
            this.head = new BattleSnake.SnakePart(10, 10, headColor);
            this.body = new Array();
            for (var i = 1; i <= initLength; i++)
                this.body.push(new BattleSnake.SnakePart(this.head.x - i, this.head.y, bodyColor));
            BattleSnake.Input.registerDirectionHandler(this);
        }
        ClientSnake.prototype.changeDirection = function (direction) {
            BattleSnake.Networking.getInstance().input({ direction: direction });
        };
        ClientSnake.prototype.directionInput = function (direction) {
            if (direction != null && direction != BattleSnake.Direction.NONE)
                this.changeDirection(direction);
        };
        return ClientSnake;
    })(BattleSnake.Snake);
    BattleSnake.ClientSnake = ClientSnake;
})(BattleSnake || (BattleSnake = {}));
