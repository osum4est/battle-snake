module BattleSnake {
    export class Input {

        private static game: Phaser.Game;
        private static hammer: HammerManager;

        static init(game: Phaser.Game) {
            this.game = game;
            this.hammer = new Hammer(document.getElementById("content"));
            this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        }

        static registerDirectionHandler(context: any) {
            // Keyboard
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
                .onDown.add(function() { context.directionInput(Direction.UP); });
            this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
                .onDown.add(function() { context.directionInput(Direction.DOWN); });
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                .onDown.add(function() { context.directionInput(Direction.LEFT); });
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                .onDown.add(function() { context.directionInput(Direction.RIGHT); });

            // Swipe
            this.hammer.on('swipeup', () => { context.directionInput(Direction.UP); });
            this.hammer.on('swipedown', () => { context.directionInput(Direction.DOWN); });
            this.hammer.on('swipeleft', () => { context.directionInput(Direction.LEFT); });
            this.hammer.on('swiperight', () => { context.directionInput(Direction.RIGHT); });
        }

        //static registerInput(key: number, context: any) {
        //    this.game.input.keyboard.addKey(key).onDown.add(function() { context.recieveInput(key) });
        //}
    }
}
