/// <reference path="./GameObject.ts"/>

module BattleSnake {
    export class BasicGameObject extends GameObject {
        color: number;
        x: number;
        y: number;

        constructor(color: number, x: number, y: number) {
            super();
            this.color = color;
            this.x = x;
            this.y = y;
        }

        render(rendering: Rendering) {
            rendering.drawSquare(
                this.x * Play.boardSize,
                this.y * Play.boardSize,
                Play.boardSize,
                this.color);
        }
    }
}
