# 자판기 동작 메커니즘 도식화

- 사용자가 자판기에 접근하면 초기 페이지가 표시됩니다.
- 사용자는 결제 수단을 선택합니다. 이 과정에서 현금 또는 카드를 선택할 수 있습니다.
- 결제 수단이 선택되면 메인 메뉴 페이지가 표시됩니다. 이 페이지에서 사용자는 음료를 선택하거나 돈을 넣을 수 있습니다.
- 사용자가 음료를 선택하면 해당 음료의 가격이 고려되며, 사용자가 넣은 돈과 비교하여 구매 가능 여부가 결정됩니다.
- 사용자가 돈을 넣으면 현재 넣은 돈의 합계가 계산됩니다.
- 사용자가 거래를 완료하면 음료가 발행되거나, 결제가 완료되고 거스름돈이 반환됩니다.

## 설치

repo 를 클론 합니다. 
``` git clone https://github.com/jinseok9338/BarogoTest.git  ```

dependency 를 설치 합니다.
``` npm install  ```

실행 시킵니다.
``` npm start  ```

* ts-node 와 node 버전 20 과의 충동이 있어서 node 버전을 18 을 쓰는것을 권장
* inquirier.js 와 ts-node 간의 충돌로 import 를 js 로 해줘야 하는 이슈 발생 (이 부분은 미리 알아채고 다른 library 를 사용했어야 했다)


## 주요 로직

- 기본적으로 상태를 관리하는 state 와 render 를 담당하는 renderer 가 존재 합니다.
- state 는 결제 수단, 이동 페이지 ID, 현재 투입 금액에 대한 정보를 담고 있습니다.
- renderer 는 state 를 기반으로 현재 페이지를 렌더링하고 사용자의 선택에 맞게 state 를 변경합니다. (이 부분은 좀 더 역할 분리가 되어도 좋다고 생각합니다. renderer 는 renderer 의 역할에 맞게 흐름을 render 하는 부분만 담당하고 state 를 변경하는 부분은 다른 모듈에서 담당하는 것이 좋을 것 같습니다.)

![무제 001](https://github.com/jinseok9338/BarogoTest/assets/27854958/bc3282e1-47c9-431d-9944-b084875cf7ad)
