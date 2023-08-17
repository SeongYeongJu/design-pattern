// https://patterns-dev-kr.github.io/ 이 사이트를 보고 공부합니다.
// (주석의 느낌표, todo는 색깔 구분을 위해 사용했습니다. 별 의미는 없어요.)

//Todo Prototype
//Todo 동일한 타입의 여러 객체들이 같은 프로퍼티(속성)을 공유할 때, 유용하게 사용할 수 있는 패턴입니다.

//-------------------------------------------------------------------------------------------------------------//

// javascript는 프로토타입 기반 언어입니다(참고: https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object_prototypes). 따라서 모든 객체는 prototype을 가지고 있고 prototype chain을 이용할 수 있습니다.
// 예제를 위해 강아지 클래스를 하나 만들어 보겠습니다.
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        return "Woof!";
    }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

// 자, 위에서 클래스 선언도 했고 인스턴스도 여러 개 만들었습니다. 이들의 prototype 객체에 접근해보겠습니다.

console.log(Dog.prototype); // {constructor: ƒ, bark: ƒ}
console.log(dog1.prototype); // undefined -> new 키워드 또는 생성자 함수로 만들어진 객체들은 이렇게 '프로토타입 객체'를 참조 할 수 없습니다. 아래와 같은 방법으로 참조합니다.
console.log(dog1.__proto__); // {constructor: ƒ, bark: ƒ} -> __proto__는 비표준이라고 합니다. 아래의 방법을 권장한다네요.
console.log(Object.getPrototypeOf(dog1)); // {constructor: ƒ, bark: ƒ} -> __proto__와 마찬가지로 '프로토타입 객체'를 참조할 수 있습니다.
//! 위 결과는 크롬 콘솔에서 출력한 결과입니다. VScode로 실행하면 {}, undefined, {}, {}가 나옵니다. 이유는 잘 모르겠네요..

console.log(Object.getPrototypeOf(dog1)); // {constructor: ƒ, bark: ƒ}
console.log(Object.getPrototypeOf(dog2)); // {constructor: ƒ, bark: ƒ}
console.log(Object.getPrototypeOf(dog3)); // {constructor: ƒ, bark: ƒ}
// dog1, dog2, dog3 모두 같은 프로토타입 객체를 가리키는 것을 알 수 있습니다.

// 이제 이 모든 인스턴스에 '우리 산책가자!'를 출력하는 프로퍼티를 공통적으로 추가해야하는 일이 생겼다고 가정해봅시다.
// 아래와 같은 방법으로 추가할 수 있을겁니다.

dog1.play = () => console.log("우리 산책가자!");
dog2.play = () => console.log("우리 산책가자!");
dog3.play = () => console.log("우리 산책가자!");

dog1.play(); // 우리 산책가자!
dog2.play(); // 우리 산책가자!
dog3.play(); // 우리 산책가자!

// 정상적으로 작동하는 것을 알 수 있습니다. 그런데 만약 인스턴스가 100개 이상의 많은 수가 있다면 어떨까요? 위와 같은 방법으로 추가하기엔 손가락이 너무 아플겁니다..
// 이러한 상황에서 prototype 패턴이 유용하죠. '이제 집에가자!'를 출력하는 메서드를 추가해보도록 하겠습니다.

Dog.prototype.home = () => console.log("이제 집에가자!");

dog1.home(); // 이제 집에가자!
dog2.home(); // 이제 집에가자!
dog3.home(); // 이제 집에가자!

// 프로토타입 객체에 추가하면 한번에 이 일을 처리할 수 있습니다.
// 위 인스턴스들의 바로 상위의 프로토타입 객체에 home이 없다하더라도 자바스크립트는 prototype chain을 타고 끝까지 home을 찾을겁니다.

// prototype chain이 이해가 되지 않는다면 예제를 한번 만들어 봅시다.
// Dog를 상속받는 SuperDog를 만듭니다.
class SuperDog extends Dog {
    constructor(name) {
        super(name);
    }

    fly() {
        console.log("하늘을 날아!");
    }
}

const dog4 = new SuperDog("Yeah");

console.log(dog4.bark()); // woof!
dog4.home(); // 이제 집에가자!
dog4.fly(); // 하늘을 날아!
// Dog를 상속받아 정상적으로 작동하는 것을 볼 수 있습니다. 이제 프로토타입 객체를 추적해볼까요?

console.log(Object.getPrototypeOf(dog4) === SuperDog.prototype); // true
console.log(SuperDog.__proto__); // [class dog]

// 여기서 dog4와 SuperDog은 같은 프로토타입 객체를 가리키고 있는 것을 알 수 있고, SuperDog의 프로토타입은 Dog임을 알 수 있습니다.
// 이렇게 prototype chain이 이어져 있음을 확인할 수 있습니다.
// javascript의 prototype을 활용하면서 Prototype 패턴에 대해 알아봤습니다.
// Prototype 패턴은 어떤 객체가 다른 객체의 프로퍼티를 상속받을 수 있도록 해 줍니다. Prototype 체인을 통해 해당 객체에 프로퍼티가 직접 선언되어 있지 않아도 되므로 메서드 중복을 줄일 수 있고 이는 메모리 절약으로 이어집니다.
