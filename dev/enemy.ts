/// <reference path="gameobject.ts" />


/**
 * Enemy
 */
class Enemy extends GameObject {
    
    hitboxPosition: Vector;
    hitbox: Rectangle;
    direction: Vector;
    
    constructor(pos: Vector) {
        super(pos);
    }


    public randomPosition() {

        let random = Math.floor(Math.random() * 3) + 1;
        if (random == 1) {
            var x = 0;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        } else if (random == 2) {
            var x = window.innerWidth - 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        } else if (random == 3) {
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = 0;
            return new Vector(x, y);
        }
    }
    
    public move(life: Life) {
        // bij diffrence waar je naartoe wilt als eerste
        let random = Math.floor((Math.random() * 3) + 1);

        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(random);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectangle = new Rectangle(this.position, 75, 75);

        this.hitboxPosition = new Vector(this.position.x - 50, this.position.y - 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300, 300);
    }

    public hitsLife(life: Life) {
        if (this.rectangle.hitsOtherRectangle(life.rectangle)) {
            return true;
        }
    }
    
    public remove() {
        this.div.remove();
    }
}