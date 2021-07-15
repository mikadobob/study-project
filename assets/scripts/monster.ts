// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { Game } from "./game";
import { NamespaceData } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export class Monster extends cc.Component {

    private game = new Game;

    ActualScore: number = 0;

    onCollisionEnter(otherCollider, selfCollider) {
        if (otherCollider.name == "jet_bullet<PolygonCollider>") {
            NamespaceData.setDeadMonster(this.node.zIndex);
            NamespaceData.addScore();
            this.node.destroy();
        }
    }

}
