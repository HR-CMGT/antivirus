/**
 * Enemy
 */
class Enemy extends GameObject {
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

    public hitsLife(life: Life) {
        if (this.rectangle.hitsOtherRectangle(life.rectangle)) {
            return true;
        }
    }
}