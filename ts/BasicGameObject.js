var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var BasicGameObject = (function (_super) {
        __extends(BasicGameObject, _super);
        function BasicGameObject(color, x, y) {
            _super.call(this);
            this.color = color;
            this.x = x;
            this.y = y;
        }
        BasicGameObject.prototype.render = function (rendering) {
            rendering.drawSquare(this.x * BattleSnake.Play.boardSize, this.y * BattleSnake.Play.boardSize, BattleSnake.Play.boardSize, this.color);
        };
        return BasicGameObject;
    })(BattleSnake.GameObject);
    BattleSnake.BasicGameObject = BasicGameObject;
})(BattleSnake || (BattleSnake = {}));
