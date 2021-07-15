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

    onCollisionEnter(otherCollider, selfCollider) {
        if (otherCollider.name == "jet_bullet<PolygonCollider>") {
            NamespaceData.setDeadMonster(this.node.zIndex);
            // console.log(this.node.zIndex);
            this.node.destroy();
        }
    }

    // update(dt){
    //     this.testSet();
    //     this.schedule(this.consoleLog, 0.5, cc.macro.REPEAT_FOREVER, 1);
    // }

    // private count: number = 0;
    // consoleLog() {
        // console.log(this.game.getPosition(25));
    // }
    // testSet(){
    //     this.count += 1;
    //     NamespaceTest.set(this.count);
    // }

}
