/// <reference path="./GameObject.ts"/>

module BattleSnake {

    export enum Direction {
        NONE,
        LEFT,
        RIGHT,
        UP,
        DOWN
    }

    export class Snake extends GameObject {

        direction: Direction;

        body: Array<SnakePart>;
        head: SnakePart;
        tailIndex: number = 0;

        constructor(json: any) {
            super();
	    this.loadJSON(json);
        }

        loadJSON(json: any) {
            if (json['direction'] != null)
                this.direction = json['direction'];
            if(json['tailIndex'] != null)
                this.tailIndex = json['tailIndex'];

            if (json['head'] != null)
                this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);

            if (json['body'] != null) {
                this.body = new Array<SnakePart>();
                for (var i: number = 0; i < json['body'].length; i++) {
                    this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']))
                }
            }

            if (json['grow'] != null && json['grow'] != 0) {
                console.log("growing");
                this.grow(json['grow']);
            }
        }

        grow(amount: number) {
            for (var i = 0; i < amount; i++) {

                this.body.splice(this.tailIndex, 0,
                    new SnakePart(this.head.x,
                    this.head.y,
                    Number("0x" + (Math.random() * 0xFFFFFF << 0).toString(16))));
            }
            this.tailIndex+=amount;
        }

        render(rendering: Rendering) {
            rendering.drawSquare(this.head.x * Play.boardSize,
                this.head.y * Play.boardSize,
                Play.boardSize,
                this.head.color);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x * Play.boardSize,
                    this.body[i].y * Play.boardSize,
                    Play.boardSize,
                    this.body[i].color);
        }

        move() {
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

            if (this.head.x + moveX >= (Play.boardWidth - 1))
                this.head.x = 1;
            else if (this.head.x + moveX <= 0)
                this.head.x = (Play.boardWidth - 2);
            else if (this.head.y + moveY >= (Play.boardHeight - 1))
                this.head.y = 1;
            else if (this.head.y + moveY <= 0)
                this.head.y = (Play.boardHeight - 2);
            else {
                this.head.x += moveX;
                this.head.y += moveY;
            }
        }

        getJSON(): any {
            var json: any = {
                direction: this.direction,
                head: {
                    x: this.head.x,
                    y: this.head.y,
                    color: this.head.color
                }
            };

            json['body'] = [];
            for ( var i = 0; i < this.body.length; i++) {
                json['body'][i] = {};
                json['body'][i]['x'] = this.body[i].x;
                json['body'][i]['y'] = this.body[i].y;
                json['body'][i]['color'] = this.body[i].color;
            };

            return json;
        }

        getDirectionJSON(): any {
            var json: any = {
                direction: this.direction
            }
            return json;
        }
    }

    export class SnakePart {
        x: number;
        y: number;
        color; number;

        constructor(x: number, y: number, color: number) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
    }
}
