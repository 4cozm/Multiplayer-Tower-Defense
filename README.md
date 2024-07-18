# 산미없는원두 - Multiplayer Tower Defense

## ✨ AWS 배포 링크

- [멀티플레이 타워 디펜스](http://3.35.207.57:5555/)

## 👋 소개

- 우리 팀은 타워들을 게임 맵 상에 배치를 한 후에 몰려오는 적들을 끊임없이 격퇴해 나가는 Plants VS Zombies 게임을 오마주한 **타워 디펜스 게임**을 1:1 **멀티플레이** 버전으로 제작합니다.

## 👩‍💻 팀원

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/4cozm"><img src="https://avatars.githubusercontent.com/u/49065386?v=4" width="100px;" alt=""/><br /><sub><b> 팀장 : 안홍걸 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/rladmswlr"><img src="https://avatars.githubusercontent.com/u/37393922?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 김은직 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/mimihimesama"><img src="https://avatars.githubusercontent.com/u/106059492?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 황정민 </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## ⚙️ Backend 기술 스택

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">

## 📄 프로젝트 도큐먼트

### [API명세서](https://chiseled-approval-5a0.notion.site/Node-js-3f2a065eec00431a8b48a970bbba2ce6)

### [이벤트 구조](https://chiseled-approval-5a0.notion.site/Node-js-3e7cd61c55844e3dbf4d3cbace30a2b8?pvs=25)

### [프로토버프 구조](https://chiseled-approval-5a0.notion.site/Node-js-a9b6488566c94912a4f0eb7918914001)

### ERD Diagram

![Untitled (2)](https://github.com/user-attachments/assets/582c0ee3-3434-4af3-bffe-cb4f858ce66a)

## 👀 프로젝트 미리보기

![스크린샷 2024-07-18 164639](https://github.com/user-attachments/assets/99657aed-70f8-4391-acd6-07077de5c14f)

### 📹 [시연 영상](https://www.youtube.com/watch?v=W3j1lFISKG8&feature=youtu.be)

## 🛡️ 프로젝트 주요 기능

1. **회원가입 / 로그인 기능**

   - 회원가입 시 MySQL DB에 유저 정보를 저장하고 JWT token을 생성하여 유저의 로컬스토리지에 저장합니다.

   - 로그인 시 유저의 로컬스토리지에 있는 token을 검증합니다.

2. **대결 신청**

   - 소켓과 연결된 유저의 userId와 socketId를 매칭 대기열에 차례로 넣습니다.

   - 대기열의 길이가 2가 되면 두 유저를 동일한 room에 join하고 각 클라이언트 소켓에 매치가 성사되었음을 알립니다.

   - 두 명의 매칭이 완료되면 매칭 대기열은 지워집니다.

3. **게임 초기화**

   - 3초간의 로딩 중 클라이언트는 게임 초기화 요청 이벤트를 서버에 보내고 이에 대한 응답으로 서버는 `길 배치`, `기지 배치`, `유저 골드`, `기지 HP`, `타워 가격`, `몬스터 레벨`, `몬스터 생성 주기`, `개인 최고 기록`, `전체 최고 기록`, `개인 랭킹`, `상대방 랭킹` 값을 반환합니다.

4. **몬스터 생성 / 적 몬스터 생성**

   - 몬스터의 ID, NUMBER, hp, power를 서버에서 생성하여 클라이언트에 전달합니다. ID와 NUMBER는 두 사용자에게 각각 랜덤으로, 내 몬스터와 적 몬스터는 다르게 생성됩니다.

   - 클라이언트에서 일정 주기마다 해당하는 몬스터를 생성합니다.

5. **타워 구입 / 적 타워 추가 배치**

   - 서버는 클라이언트에서 생성된 x, y 좌표를 받고, 그 값을 다시 상대에게 전달합니다.

   - 현재 유저 골드에서 타워 가격만큼 골드를 차감하고 업데이트된 값을 클라이언트에 전달합니다.

6. **타워가 몬스터를 공격 / 적 타워가 적의 몬스터를 공격**

   - 타워는 자신의 공격 범위 내에 있는 몬스터를 탐지하여, 탐지된 몬스터를 타겟으로 공격을 수행합니다.

   - 공격한 타워의 인덱스와 공격당한 몬스터의 인덱스를 서버에 넘깁니다.

   - 서버는 클라이언트로부터 받은 값을 상대 소켓에 전달합니다.

7. **몬스터 사망 / 적 몬스터 사망**

   - 기지가 몬스터를 공격하는 이벤트를 받았을 때 서버에서 몬스터의 체력을 타워의 공격력만큼 차감하고 그 값이 0 이하가 되면 몬스터 사망 이벤트를 나와 상대 소켓에 전송합니다.
   - 몬스터가 사망하면 현재 유저 골드에서 100점을 추가하고 2000점마다 몬스터 레벨을 증가하여 클라이언트에 전달합니다.

8. **몬스터가 기지를 공격**

   - 클라이언트에서 몬스터 ID를 받으면 그 정보를 기반으로 몬스터의 공격력만큼 기지 HP를 깎고 그 값을 클라이언트로 반환합니다.

9. **기지 HP 업데이트**

   - 클라이언트는 전달받은 기지 HP 값으로 화면을 업데이트합니다.

10. **게임 오버**

    - 몬스터가 기지를 공격할 때 받는 핸들러 내부에서 기지의 HP가 0 이하가 되면 나에게는 패, 상대에게는 승 데이터를 클라이언트에 보내 게임이 끝나도록 합니다.

11. **게임 종료**
    - 게임 오버 함수 내부에서 게임 종료 이벤트를 전달받으면 유저의 점수가 자신의 개인 기록 중 최고 점수라면 db를 갱신하고 플레이어 세션에서 삭제합니다.

## 🚀 추가 구현 기능

#### **💬 채팅 기능**

- 화면 왼쪽 하단에 배치된 채팅창으로 상대방과 채팅을 할 수 있습니다.

#### **⚡ 스킬 사용 기능**

- 현재 생성되어있는 상대방의 타워를 랜덤으로 한 개 파괴할 수 있습니다.
- 내 기지 HP를 일정량 회복할 수 있습니다.
- 현재 내 화면에 생성돼있는 모든 몬스터를 삭제할 수 있습니다.
- 모든 스킬은 일정량의 골드를 지불하고 화면 오른쪽 상단에서 버튼을 클릭하여 사용할 수 있습니다.

#### **🏃‍♂️ 탈주 시 게임 종료 기능**

- 매칭 이후 gameOver 이벤트가 발생하기 전 플레이어 세션에서 변화가 있을 경우 탈주로 간주하여 매칭된 상대방에게 그 사실을 알리고 승리 처리로 게임을 끝냅니다.

#### **⚠️ 검증 에러 발생 시 클라이언트 화면에 표시 / DB에 에러 로그 저장**

- 플레이 도중 서버 혹은 클라이언트에서 검증 에러 발생 시 에러 메세지를 모달창으로 클라이언트 화면에 표시합니다.

- 발생한 에러의 로그를 해당 user의 db에 저장합니다.

#### **🏆 플레이어 랭킹 표시 기능**

- 초기화 데이터에 나의 랭킹과 상대방 랭킹을 추가하여 게임이 시작되는 시점에 해당 값을 db에서 불러와 화면에 표시합니다.

#### **🥳 이모지 표시 기능**

- 1부터 9까지 키보드 숫자를 누르면 해당하는 이미지가 내 화면과 상대방 화면에서의 내 기지 위에 표시됩니다.

#### **🗣️ 인게임 보이스 기능**

- 전지전능하신 튜터님들의 목소리가 곳곳에 깔려있습니다.
