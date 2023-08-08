export default class FireBall extends Phaser.Physics.Arcade.Image {
    constructor(scene, hero) {
        const x = hero.x;
        const y = hero.y;
        super(scene, x, y, "fireBall");
        this.setScale(0.2);

        this.speed = 200;
        this.duration = 1000;

        scene.add.existing(this);
        scene.physics.world.enableBody(this); //새로 만들어질 인스턴스를 물리 시스템에 추가.
        this.setCircle(30);
        this.setVelocity();

        scene.attackGroup.add(this);
        //scene.m_beamSound.play();

        setTimeout(() => this.destroy(), this.duration);
    }

    setVelocity() {
        if (! this.scene.selectClosest) {
            this.setVelocityY(-this.speed);
            return;
        }
        
        //빔은 생성될 때만 플레이어 기준으로 생성되고,
        //빔이 적에게 유도되어 적을 폭파시키는 건,
        //플레이어가 아니라 빔 기준으로 적과의 x, y 값을 구해서 계산하는 게 맞네. 다음에 수정!
        const _x = this.scene.selectClosest.x - this.x;
        const _y = this.scene.selectClosest.y - this.y;
        const _r = Math.sqrt(_x*_x + _y*_y);
        
        this.body.velocity.x = (_x / _r) * this.speed;
        this.body.velocity.y = (_y / _r) * this.speed;
    }
}