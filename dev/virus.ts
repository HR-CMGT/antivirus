/**
 * Virus
 */
class Virus extends Enemy {

    public id: number;
    public hitbox: Rectangle;
    public hitboxPosition: Vector;

    constructor(id: number, pos: Vector) {
        super(pos);
        this.id = id;
        this.div = document.createElement("virus");
        this.div.setAttribute("id", "virus" + this.id);
        document.getElementById("background").appendChild(this.div);

        this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    }


    public move(life: Life) {
        // bij diffrence waar je naartoe wilt als eerste
        let random = Math.floor((Math.random() * 3) + 1);

        let direction = life.position.difference(this.position);
        direction = direction.normalize();
        direction = direction.scale(random);
        this.position = this.position.add(direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectangle = new Rectangle(this.position, 75, 75);

        this.hitboxPosition = new Vector(this.position.x - 50, this.position.y - 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300, 300);
    }

    public remove() {
        this.div.remove();
    }

}