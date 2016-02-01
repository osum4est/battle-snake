var BattleSnake;
(function (BattleSnake) {
    var Input = (function () {
        function Input() {
        }
        Input.init = function (game) {
            this.game = game;
            this.hammer = new Hammer(document.getElementById("content"));
            this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        };
        Input.registerDirectionHandler = function (context) {
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
                .onDown.add(function () { context.directionInput(BattleSnake.Direction.UP); });
            this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
                .onDown.add(function () { context.directionInput(BattleSnake.Direction.DOWN); });
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                .onDown.add(function () { context.directionInput(BattleSnake.Direction.LEFT); });
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                .onDown.add(function () { context.directionInput(BattleSnake.Direction.RIGHT); });
            this.hammer.on('swipeup', function () { context.directionInput(BattleSnake.Direction.UP); });
            this.hammer.on('swipedown', function () { context.directionInput(BattleSnake.Direction.DOWN); });
            this.hammer.on('swipeleft', function () { context.directionInput(BattleSnake.Direction.LEFT); });
            this.hammer.on('swiperight', function () { context.directionInput(BattleSnake.Direction.RIGHT); });
        };
        return Input;
    })();
    BattleSnake.Input = Input;
})(BattleSnake || (BattleSnake = {}));
