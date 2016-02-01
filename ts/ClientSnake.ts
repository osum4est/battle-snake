/// <reference path="Snake.ts" />

module BattleSnake {
    export class ClientSnake extends Snake {

                changedDirection: boolean = true;
                queuedDirection: Direction;

                constructor(speed: number, initLength: number, size: number,
                    bodyColor: number, headColor: number) {
                    super(speed);

                    this.direction = Direction.RIGHT;
                    this.speed = speed;
                    this.size = size;

                    this.head = new SnakePart(10, 10, headColor);
                    this.body = new Array<SnakePart>();
                    for (var i = 1; i <= initLength; i++)
                        this.body.push(new SnakePart(this.head.x - i, this.head.y, bodyColor));

                    Input.registerDirectionHandler(this);
                }

                changeDirection(direction: Direction) {
                    Networking.getInstance().input({ direction: direction });
                }

                directionInput(direction: Direction) {
                    if (direction != null && direction != Direction.NONE)
                        this.changeDirection(direction);
                }
            }
        }
