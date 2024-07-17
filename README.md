# Multiplayer-Tower-Defense



## 서버 -> 클라이언트

| 이벤트 이름            | 설명                           | 페이로드 변수                                              |
|---------------------|------------------------------|------------------------------------------------------|
| 'chat'              | 채팅                          | userId, message                                      |
| 'initializeGameState' | 게임 상태 초기화                  | monsterPath, opponentMonsterPath, basePosition, opponentBasePosition, userGold, baseHp, towerCost, monsterLevel, monsterSpawnInterval, score, highScore, userHighScore, userRank, opponentRank |
| 'matchFound'        | 매치 발견                      | userId                                               |
| 'updateGameState'   | 게임 상태 업데이트               | baseHp                                               |
| 'gameOver'          | 게임 종료                      | isWin                                                |
| 'updateGameState'   | 게임 상태 업데이트               | score, userGold, monsterLevel                        |
| 'opponentMakeTower' | 상대방 화면에 타워 생성           | x, y, uuid                                           |
| 'opponentTowerAttack'| 적 타워 공격 모션 출력             | monsterId, towerId                                   |
| 'opponentMonsterDead'| 적 필드 몬스터 사망                | monsterId, timeStamp                                 |
| 'towerAttack'       | 플레이어 타워 공격               | monsterId, hp                                        |
| 'makeTower'         | 플레이어 화면에 타워 생성           | x, y, uuid                                           |
| 'spawnMonster'      | 플레이어 필드에 몬스터 생성        | monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber |
| 'opponentSpawnMonster' | 적 필드에 몬스터 생성             | monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath |
| 'monsterDead'       | 플레이어 필드 몬스터 사망         | monsterId                                            |
| 'opponentEmoji'     | 적이 보낸 이모지 출력             | src                                                  |
| 'skillHeat'         | 스킬에 대한 처리                 | monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath, randomDelay |
| 'error'             | 에러에 대한 처리                 | errorMessage                                         |

# 클라이언트 -> 서버

| 이벤트 이름                  | 설명                     | 페이로드 변수                                      |
|-----------------------------|--------------------------|----------------------------------------------------|
| 'chat'                      | 채팅                     | userId, message                                    |
| 'initializeGameState'       | 게임 상태 초기화         | monsterPath, opponentMonsterPath, basePosition, opponentBasePosition, userGold, baseHp, towerCost, monsterLevel, monsterSpawnInterval, score, highScore, userHighScore, userRank, opponentRank |
| 'matchFound'                | 매치 발견                | userId                                             |
| 'updateGameState'           | 게임 상태 업데이트       | baseHp                                             |
| 'gameOver'                  | 게임 종료                | isWin                                              |
| 'updateGameState'           | 게임 상태 업데이트       | score, userGold, monsterLevel                      |
| 'opponentMakeTower'         | 상대방 화면에 타워 생성   | x, y, uuid                                         |
| 'opponentTowerAttack'       | 적 타워 공격 모션 출력   | monsterId, towerId                                 |
| 'opponentMonsterDead'       | 적 필드 몬스터 사망      | monsterId, timeStamp                               |
| 'towerAttack'               | 플레이어 타워 공격       | monsterId, hp                                      |
| 'makeTower'                 | 플레이어 화면에 타워 생성 | x, y, uuid                                         |
| 'spawnMonster'              | 플레이어 필드에 몬스터 생성 | monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber |
| 'opponentSpawnMonster'      | 적 필드에 몬스터 생성    | monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath |
| 'monsterDead'               | 플레이어 필드 몬스터 사망 | monsterId                                          |
| 'opponentEmoji'             | 적이 보낸 이모지 출력    | src                                                |
| 'skillHeat'                 | 스킬에 대한 처리         | monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath, randomDelay |
| 'error'                     | 에러에 대한 처리         | errorMessage                                       |
| 'initialData'               | 초기화 요청              |                                                    |
| 'attackTower'               | 타워 공격 검증 요청      | towerId, monsterId                                 |
| 'buyTower'                  | 타워 구매 요청           | {x, y}                                             |
| 'spawnMonster'              | 몬스터 생성 요청         | monsterLevel                                       |
| 'monsterAttackBase'         | 기지 체력 업데이트 요청  | monsterID                                          |
| 'requestChat'               | 채팅 전송                | message                                            |
| 'endGame'                   | 게임오버 전송            |                                                    |
| 'emoji'                     | 이모지 전송              | image src                                          |
| 'skill'                     | 스킬 전송                |                                                    |
