// https://patterns-dev-kr.github.io/ 이 사이트를 보고 공부합니다.
// (주석의 느낌표, todo는 색깔 구분을 위해 사용했습니다. 별 의미는 없어요.)

//Todo Singletone
//Todo '1회'에 한하여 인스턴스화가 가능하고, '앱 전역'에서 접근 가능한 클래스입니다.

//-------------------------------------------------------------------------------------------------------------//
// 먼저 '싱글톤이 아닌' 클래스를 생성
let counter = 0;

// 클래스 생성
class Counter {
    // 인스턴스 자체를 반환한다.
    getInstance() {
        return this;
    }

    // counter를 반환한다.
    getCount() {
        return counter;
    }

    // counter를 1 증가
    increment() {
        return ++counter;
    }

    // counter를 1 감소
    decrement() {
        return --counter;
    }
}

// 위 코드는 '1회에 한하여 인스턴스를 생성해야한다'는 규칙을 지키지 못합니다. 이름 값을 못하는군요.
// 아래는 왜 싱글톤 패턴이 아닌지를 보여줍니다.

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance === counter2.getInstance);
// 해당 메소드들은 이들의 프로토타입인 Counter 클래스의 메소드를 참조하기 때문에 true를 반환합니다.
// 그러나 아래와 같이 위 메소드들을 실행하여 this를 반환하게 한 뒤 비교하면 그 결과는 다르죠.

console.log(counter1.getInstance() === counter2.getInstance());
// 위 콘솔의 결과는 false가 나옵니다. counter1과 counter2는 서로 다른 인스턴스라는 뜻이죠.
// 즉, 1회 이상의 인스턴스가 만들어져 싱글톤 패턴의 조건에 맞지 않습니다. 아래에서 이를 싱글톤에 맞게 수정해보겠습니다.

//-------------------------------------------------------------------------------------------------------------//
let instance1; // 생성된 인스턴스가 있는지 알아보기 위한 변수
let counterNew1 = 0;

class CounterNew1 {
    constructor() {
        // 생성자에서 instance가 있는 경우, 인스턴스 생성을 멈추고 에러 메시지를 통해 개발자에게 알려주도록 한다.
        if (instance1) {
            throw new Error("You can only create one instance!");
        }
        instance1 = this;
    }

    getInstance() {
        return this;
    }

    getCount() {
        return counterNew1;
    }

    increment() {
        return ++counterNew1;
    }

    decrement() {
        return --counterNew1;
    }
}

const counter3 = new CounterNew1();
const counter4 = new CounterNew1(); //! Error: You can only create one instance!
// 이렇게 이미 만들어진 인스턴스가 있다면 에러 메시지로 알려주면서 새로운 생성을 막습니다.

//-------------------------------------------------------------------------------------------------------------//
// 위 코드에서 조금 더 추가적인 작업을 해보겠습니다. 일단 외부적인 요인으로 프로토타입의 property가 바뀌면 안되기 때문에 Object.freeze를 활용하겠습니다.
let instance2;
let counterNew2 = 0;

class CounterNew2 {
    constructor() {
        if (instance2) {
            throw new Error("You can only create one instance!");
        }
        instance2 = this;
    }

    getInstance() {
        return this;
    }

    getCount() {
        return counterNew2;
    }

    increment() {
        return ++counterNew2;
    }

    decrement() {
        return --counterNew2;
    }
}

const counter5 = Object.freeze(new CounterNew2());

// 그리고 만들어진 인스턴스를 전역에서 사용하기 위해 export default를 해줍니다.
export default counter5;

// 이제 전역으로 counter를 공유하며 사용할 수 있습니다.
