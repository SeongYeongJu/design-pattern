// https://patterns-dev-kr.github.io/ 이 사이트를 보고 공부합니다.
// (주석의 느낌표, todo는 색깔 구분을 위해 사용했습니다. 별 의미는 없어요.)

//Todo Container/Representational
//Todo Container/Representational 패턴은 전통적인 GoF 디자인 패턴이 아닙니다. React와 같은 라이브러리나 프레임워크에서 비지니스 로직과 뷰를 분리하는 아키텍처 패턴입니다.

//-------------------------------------------------------------------------------------------------------------//

// 예제를 작성하기보다는 이론적인 설명이 필요합니다.
// 먼저 '관심사의 분리(SoC, Seperation of Concerns)'라는 용어를 가볍게 알아봅시다.
// 간단히 말해서, SoC 법칙은 시스템 요소가 단일 목적이고 배타성을 가져야 한다는 것을 명시합니다. 그 말은, 어떤 요소도 다른 요소와의 책임을 공유하면 안되고, 그 요소와 관계가 없는 책임을 포함시킬 수 없다는 것입니다.
// React에서는 Container/Representational 패턴을 사용함으로써 비지니스 로직과 뷰를 분리할 수 있고 결론적으로 SoC를 강제할 수 있습니다.

// 자, 그러면 강아지 사진을 다운로드 받아 화면에 렌더링하는 앱이 있다고 생각해봅시다.
// 1. 강아지 사진을 다운로드 받는다.
// 2. 화면에 렌더링한다.

// 위와 같이 두 개의 관심사를 분리할 수 있습니다. 이때 Container/Representational 패턴을 적용하면 아래와 같이 생각할 수 있습니다.

// "강아지 사진을 다운로드 받는다"
// -> Container Component에서 가져야 할 관심사입니다. '어떤 데이터를 Presentational Component에 전달할 것인가'에 대해 고민하는 부분입니다.
// -> Container Component 자체는 화면에 렌더링하는 것이 없으니 스타일시트도 포함하지 않습니다. 비지니스 로직에 대해 생각하는 것이죠.

// "강아지 사진을 화면에 렌더링한다"
// -> Presentational Component에서 가져야 할 관심사입니다. Presentational Component는 props를 통해 데이터를 받습니다. 그리고 props를 활용하여 화면의 렌더링을 담당하죠.
// -> props는 읽기 전용 데이터이기 때문에 Presentational Component에서 이를 변경하지 않습니다. 오로지 '뷰를 렌더링 하는 일'에 신경을 씁니다.

// 리액트로 프로젝트를 진행했던 것을 생각하면, 알게 모르게 제가 Container/Presentational 패턴을 따랐다는 것을 알 수 있었습니다.

// 원문에서 이 패턴의 장단점을 아래와 같이 설명하고 있습니다.

// 장점
// 해당 패턴을 활용하면 자연스럽게 관심사의 분리를 구현하게 된다. Presentational 컴포넌트는 UI를 담당하는 순수함수로 작성하게 되는 반면 Container 컴포넌트는 상태와 기타 데이터를 책임지게 된다.
// Presentational 컴포넌트는 데이터 변경 없이 화면에 출력할 수 있으므로 앱의 여러 곳에서 다양한 목적으로 재사용할 수 있다.
// Presentational 컴포넌트는 앱의 비즈니스 로직을 수정하지 않으므로 코드베이스에 대한 이해가 깊지 않은 개발자더라도 쉽게 수정이 가능하다. 공통으로 쓰이는 Presentational 컴포넌트가 디자인의 요구사항에 따라 수정하면 앱 전체에서 반영된다.
// Presentational 컴포넌트는 테스트하기도 쉽다. 일반적으로 순수함수로 구현되므로 전체 목 데이터 스토어를 만들 필요 없이 요구하는 데이터만 인자로 넘겨주면 된다.

// 단점
// Container/Presentational 패턴은 비즈니스 로직과 렌더링 로직을 쉽게 분리할 수 있지만 훅을 활용하면 클래스형 컴포넌트를 사용하지 않고도, 또 이 패턴을 따르지 않아도 같은 효과를 볼 수 있다. 참고로 지금은 상태를 가진 컴포넌트도 함수형으로 만들 수 있다.
// 훅을 사용하더라도 이 패턴을 사용할 수는 있지만 너무 작은 규모의 앱에서는 오버엔지니어링 일 수 있다.

// 이전 리액트에서 클래스형 컴포넌트만이 state와 component life cycle api를 사용할 수 있었던 시절, 이와 같은 개념이 훨씬 중요했나봅니다.