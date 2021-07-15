// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    jet_bullet: cc.Prefab = null;

    @property
    moveSpeed: number = 0;

    @property
    fireRate: number = 5;

    private fire: boolean = false;
    private accLeft: boolean = false;
    private accRight: boolean = false;


    onLoad() {

        this.accLeft = false;
        this.accRight = false;
        this.node.x = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    shootBullets() {
        var bullet = cc.instantiate(this.jet_bullet);
        bullet.setPosition(this.node.position.x, this.node.position.y);
        this.node.parent.addChild(bullet);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = true;
                break;
            case cc.macro.KEY.right:
                this.accRight = true;
                break;
            case cc.macro.KEY.space:
                this.fire = true;
                break;
        }
    }


    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
            case cc.macro.KEY.space:
                this.fire = false;
                break;
        }
    }

    update(dt) {
        if (this.accLeft) {
            this.node.x -= this.moveSpeed;
        } else if (this.accRight) {
            this.node.x += this.moveSpeed;
        }

        if (this.fire) {
            this.schedule(this.shootBullets, 1 / this.fireRate, 0, 0);
        }
        
        if ( this.node.x > this.node.parent.width/2) {
            this.node.x = this.node.parent.width/2;
        } else if (this.node.x < -this.node.parent.width/2) {
            this.node.x = -this.node.parent.width/2;
        }
    }
}
