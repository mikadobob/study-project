// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { NamespaceMonster } from "./namespace-test";

const { ccclass, property } = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Prefab)
    private monsterPrefab: cc.Prefab = null;



    start() {
        this.firstSpawnMonster();
    }


    firstSpawnMonster() {
        let monster_position = NamespaceMonster.getMonsterPosition();
        for (let i = 0; i < 20; i++) {
            var newMonster = cc.instantiate(this.monsterPrefab);
            this.node.addChild(newMonster, i, "Monster" + ((i).toString()));

            newMonster.getComponent('Monster');
            newMonster.setPosition(monster_position[i][0], monster_position[i][1]);

            NamespaceMonster.setAliveMonster(i);
        }
        // this.node.removeChild(this.node.getChildByName("Monster5"));
    }

    // setEmptyPosition(indexMonster) {
    //     this.monster_position[indexMonster-1][3] = 0;
    // }
    // setEmptyPosition(position, value) {
    //     this.monster_position[position - 1][3] = value;
    // }

    // getPosition(position) {
    //     return this.monster_position[position - 1][3];
    // }

    spawnMonster() {
        let monster_position = NamespaceMonster.getMonsterPosition();
        var emptyLocation: number[] = [];
        for (let i = 0; i < 30; i++) {
            if (monster_position[i][2] == 0) {
                emptyLocation.push(i);
            }
        }
        if (emptyLocation.length != 0) {
            var newLocation = emptyLocation[Math.floor(Math.random() * emptyLocation.length)];

            var newMonster = cc.instantiate(this.monsterPrefab);
            this.node.addChild(newMonster, newLocation, "Monster" + ((newLocation).toString()));

            newMonster.getComponent('Monster');
            newMonster.setPosition(monster_position[newLocation][0], monster_position[newLocation][1]);
            NamespaceMonster.setAliveMonster(newLocation);
        }
    }

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.schedule(this.spawnMonster, 2, cc.macro.REPEAT_FOREVER, 1);
    }

    private count: number = 0;

    update(dt) {
        // console.log(NamespaceMonster.getMonsterPosition());
        if (NamespaceMonster.countAliveMonster() <= 20) this.spawnMonster();
    }

    // consoleGet() {
    //     console.log(NamespaceMonster.get());
    // }

    // testSet(){
    //     this.count += 1;
    //     NamespaceMonster.set(this.count);
    // }


}
