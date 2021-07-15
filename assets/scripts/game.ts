// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { MonsterBullet } from "./monster-bullet";
import { NamespaceData } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Prefab)
    private monsterPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    public jet: cc.Node = null;

    @property(cc.Node)
    private heart1: cc.Node = null;

    @property(cc.Node)
    private heart2: cc.Node = null;

    @property(cc.Node)
    private heart3: cc.Node = null;

    @property(cc.Label)
    score: cc.Label = null;



    start() {
        this.firstSpawnMonster();
        NamespaceData.setLifePlayer();
    }

    updateScore() {
        this.score.string = "SCORE: " + NamespaceData.getScore().toString();
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
    }


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
        this.schedule(this.spawnMonster, 1, cc.macro.REPEAT_FOREVER, 1);
        this.schedule(this.monsterAttack, 0.5, cc.macro.REPEAT_FOREVER, 3);

        this.schedule(this.checkGameOver, 0, cc.macro.REPEAT_FOREVER, 0);
    }

    private count: number = 0;

    update(dt) {
        if (NamespaceData.countAliveMonster() < 20) this.spawnMonster();
        this.updateScore();
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
            var posBullet = aliveMonster[Math.floor(Math.random() * aliveMonster.length)];

            var newBullet = cc.instantiate(this.bulletPrefab);
            this.node.addChild(newBullet, posBullet, "MonsterBullet" + ((posBullet).toString()));

            let bulletMonster:MonsterBullet = newBullet.getComponent(MonsterBullet);
            newBullet.setPosition(monster_position[posBullet][0], monster_position[posBullet][1]);
            bulletMonster.monsterShoot(this.jet.x,this.jet.y);
        }

    }

    checkGameOver() {
        if (NamespaceData.getLifePlayer() == 0) {
            if (cc.isValid(this.heart3)) {
                this.heart3.destroy();
            }
        }
        if (NamespaceData.getLifePlayer() <= 2) {
            if (cc.isValid(this.heart1)) {
                this.heart1.destroy();
            }
        }
        if (NamespaceData.getLifePlayer() <= 1) {
            if (cc.isValid(this.heart2)) {
                this.heart2.destroy();
            }
        }
    }

}
