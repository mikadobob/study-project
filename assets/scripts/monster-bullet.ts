// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { NamespaceData } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export class MonsterBullet extends cc.Component {

    @property
    moveSpeed: number = 200;

    onCollisionEnter(otherCollider, selfCollider) {
        this.node.destroy();
        if (otherCollider.name == "jet<PolygonCollider>") {
            NamespaceData.decreaseLifePlayer();
        }
    }


    update(dt) {
        this.node.setPosition(this.node.position.x, this.node.position.y -= this.moveSpeed * dt);
        if (this.node.position.y <= -(this.node.parent.getContentSize().height)) {
            this.node.destroy();
        }
    }
}
