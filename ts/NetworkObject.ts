/// <reference path="./BasicGameObject.ts" />

module BattleSnake {
    export class NetworkObject extends BasicGameObject {

        id: string;

        constructor(json: any, id: string) {
            super(json['color'], json['x'], json['y']);
            this.id = id;
        }

        loadJSON(json: any) {
            this.color = json['color'];
            this.x = json['x'];
            this.y = json['y'];

        }

        getJSON(): any {
            return {
                color: this.color,
                x: this.x,
                y: this.y
            };
        }
    }
}
