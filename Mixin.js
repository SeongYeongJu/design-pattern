// https://patterns-dev-kr.github.io/ 이 사이트를 보고 공부합니다.
// (주석의 느낌표, todo는 색깔 구분을 위해 사용했습니다. 별 의미는 없어요.)

//Todo Mixin
//Todo Mixin패턴은 상속 없이 어떤 객체나 클래스에 재사용 가능한 기능을 추가할 수 있는 객체입니다. Mixin은 단독으로 사용할 순 없고 상속 없이 객체나 클래스에 기능을 추가하는 목적으로 사용됩니다.

//-------------------------------------------------------------------------------------------------------------//

// 강아지 여러 마리를 만들기 위해 강아지와 관련된 클래스를 정의했습니다.
class Dog {
    constructor(name) {
        this.name = name;
    }
}

// 강아지의 행동을 Dog 클래스에 직접 정의하는 대신, 강아지 행동을 가진 Mixin을 만들도록 하겠습니다.
const dogFunctionality = {
    bark: () => console.log("Woof!"),
    wagTail: () => console.log("Wagging my tail!"),
    play: () => console.log("Playing!"),
};

// target에 source 객체를 합성하는 Object.assign을 통해 Mixin에 정의한 기능을 Dog.prototype에 추가할 수 있습니다.
Object.assign(Dog.prototype, dogFunctionality);

// 인스턴스를 하나 만들고 어떻게 동작하는지 보겠습니다.
const pet1 = new Dog("james");

console.log(pet1.name); // james
pet1.bark(); // Woff!
pet1.wagTail(); // Wagging my tail!
pet1.play(); // Playing!

// 위와 같이 '상속없이' 객체에 프로퍼티를 추가하는 것이 가능합니다.
// 이제 animalFunctionality라는 mixin을 만들고 dogFuctionality에 상속을 해보겠습니다. (mixin끼리 상속)
class Dog2 {
    constructor(name) {
        this.name = name;
    }
}

const animalFunctionality = {
    walk: () => console.log(`I'm walking now..!`),
    sleep: () => console.log(`I'm sleeping now..!`),
};

const dogFunctionality2 = {
    bark: () => console.log("Woof!"),
    wagTail: () => console.log("Wagging my tail!"),
    play: () => console.log("Playing!"),
    walk() {
        super.walk();
    },
    sleep() {
        super.sleep();
    },
};

Object.assign(dogFunctionality2, animalFunctionality);
Object.assign(Dog2.prototype, dogFunctionality2);

const pet2 = new Dog2("Jerry");

pet2.walk(); // I'm walking now..!
pet2.sleep(); // I'm sleeping now..!

// 믹스인은 상속을 하지 않고도 객체의 프로토타입에 특정 기능들을 주입할 수 있습니다. 다만 객체의 프로토타입을 직접 수정하는 것은 의도하지 않은 프로토타입 프로퍼티의 수정으로 이어질 수 있어 주의가 필요합니다.
