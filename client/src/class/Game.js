export class Game {
  constructor(userId) {
    // 게임 데이터
    this.towerCost = 0; // 타워 구입 비용
    this.monsterSpawnInterval = 0; // 몬스터 생성 주기

    // 유저 데이터
    this.userId = userId;
    this.userGold = 0; // 유저 골드
    this.base = null; // 기지 객체
    this.baseHp = 0; // 기지 체력
    this.monsterLevel = 0; // 몬스터 레벨
    this.monsterPath = null; // 몬스터 경로
    this.initialTowerCoords = null; // 초기 타워 좌표
    this.basePosition = null; // 기지 좌표
    this.monsters = []; // 유저 몬스터 목록
    this.towers = []; // 유저 타워 목록
    this.score = 0; // 게임 점수
    this.highScore = 0; // 기존 최고 점수
    this.userHighScore = 0; // 유저 최고 점수

    this.monsterID = 0;
    this.monsterHp = 0;
    this.monsterPower = 0;

    // 상대 데이터
    this.opponent = null;

    this.opponentBase = null; // 상대방 기지 객체
    this.opponentMonsterPath = null; // 상대방 몬스터 경로
    this.opponentInitialTowerCoords = null; // 상대방 초기 타워 좌표
    this.opponentBasePosition = null; // 상대방 기지 좌표
    this.opponentMonsters = []; // 상대방 몬스터 목록
    this.opponentTowers = []; // 상대방 타워 목록

    this.isInitGame = false;
  }
}

export default Game;
