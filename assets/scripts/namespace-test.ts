// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const { ccclass, property } = cc._decorator;

export namespace NamespaceMonster {

    let monster_position: number[][] = [];

    // let monster_position: number[][] = [[0, -200, 348, 0], [1, -100, 348, 0], [2, 0, 348, 0], [3, 100, 348, 0], [4, 200, 348, 0],
    // [5, -200, 263, 0], [6, -100, 263, 0], [7, 0, 263, 0], [8, 100, 263, 0], [9, 200, 263, 0],
    // [10, -200, 178, 0], [11, -100, 178, 0], [12, 0, 178, 0], [13, 100, 178, 0], [14, 200, 178, 0],
    // [15, -200, 93, 0], [16, -100, 93, 0], [17, 0, 93, 0], [18, 100, 93, 0], [19, 200, 93, 0],
    // [20, -200, 8, 0], [21, -100, 8, 0], [22, 0, 8, 0], [23, 100, 8, 0], [24, 200, 8, 0],
    // [25, -200, -77, 0], [26, -100, -77, 0], [27, 0, -77, 0], [28, 100, -77, 0], [29, 200, -77, 0]];

    let posy = 348;
    for (let i = 0; i < 6; i++) {
        let posx = -200
        for (let j = 0; j < 5; j++) {
            monster_position.push([posx, posy, 0])
            posx += 100;
        }
        posy -= 85;
    }

    export function setAliveMonster(indexMonster) {
        monster_position[indexMonster][2] = 1;
    }

    export function setDeadMonster(indexMonster) {
        monster_position[indexMonster][2] = 0;
    }

    export function getMonsterPosition() {
        return monster_position;
    }

    export function countAliveMonster() {
        let count = 0;
        for (let i = 0; i < 30; i++) {
            if (monster_position[i][2] == 1) count++;
        }
        return count;
    }



}
