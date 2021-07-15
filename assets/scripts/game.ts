// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { NamespaceData } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Prefab)
    private monsterPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private heart: cc.Prefab = null;



    start() {
        this.firstSpawnMonster();
        NamespaceData.setLifePlayer();
    }


    firstSpawnMonster() {
        let monster_position = NamespaceData.getMonsterPosition();
        for (let i = 0; i < 20; i++) {
            var newMonster = cc.instantiate(this.monsterPrefab);
            this.node.addChild(newMonster, i, "Monster" + ((i).toString()));

            newMonster.getComponent('Monster');
            newMonster.setPosition(monster_position[i][0], monster_position[i][1]);

            NamespaceData.setAliveMonster(i);
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
        let monster_position = NamespaceData.getMonsterPosition();
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
            NamespaceData.setAliveMonster(newLocation);
        }
    }

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.schedule(this.spawnMonster, 2, cc.macro.REPEAT_FOREVER, 1);
        this.schedule(this.monsterAttack, 1, cc.macro.REPEAT_FOREVER, 5);

        this.schedule(this.checkGameOver, 0, cc.macro.REPEAT_FOREVER, 0);
    }

    private count: number = 0;

    update(dt) {
        // console.log(NamespaceData.getMonsterPosition());
        if (NamespaceData.countAliveMonster() <= 20) this.spawnMonster();
    }

    monsterAttack() {
        let monster_position = NamespaceData.getMonsterPosition();
        var aliveMonster: number[] = [];
        for (let i = 0; i < 30; i++) {
            if (monster_position[i][2] == 1) {
                aliveMonster.push(i);
            }
        }
        if (aliveMonster.length != 0) {
            var posBullut = aliveMonster[Math.floor(Math.random() * aliveMonster.length)];

            var newBullet = cc.instantiate(this.bulletPrefab);
            this.node.addChild(newBullet, posBullut, "Monster" + ((posBullut).toString()));

            newBullet.getComponent('MonsterBullet');
            newBullet.setPosition(monster_position[posBullut][0] - 60, monster_position[posBullut][1]);
        }

    }

    checkGameOver() {
        if (NamespaceData.getLifePlayer() == 0) {
            console.log("GAME OVER");
        }
    }

    // consoleGet() {
    //     console.log(NamespaceData.get());
    // }

    // testSet(){
    //     this.count += 1;
    //     NamespaceData.set(this.count);
    // }


}
