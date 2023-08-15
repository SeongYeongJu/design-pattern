// https://patterns-dev-kr.github.io/ 이 사이트를 보고 공부합니다.
// (주석의 느낌표, todo는 색깔 구분을 위해 사용했습니다. 별 의미는 없어요.)

//Todo Proxy
//Todo 어떤 객체를 '수정' 및 '조회'할 때 직접적으로 조작하는 것이 아니라, Proxy 객체를 통해 인터렉션합니다. 이러한 방법으로 데이터를 다룰 때 실수를 줄일 수 있습니다.

//-------------------------------------------------------------------------------------------------------------//

// person 객체를 생성해봅시다.

const person = {
    name: "John Doe",
    age: 42,
    nationality: "American",
};

// 다들 아시다시피 해당 객체를 조회하거나 수정하는 것은 아래와 같이 할 수 있습니다.

// 이름 수정
person.name = "Hong GilDong";
// 이름 조회
console.log(person.name); // Hong GilDong

// 이와 같은 방법으로 접근할 수 있지만, Proxy 인스턴스를 만들어 볼겁니다.
// const personProxy = new Proxy(person, {}) -> new Proxy(target, handler), target은 프록시할 원본 객체이며 handler는 인터렉션을 정의할 객체라 생각하시면 됩니다.
// 그리고 handler에는 get(조회)과 set(수정)을 정의할 수 있습니다. 그외에도 다른 메소드들이 있으니 찾아보세요!

const presonProxy = new Proxy(person, {
    get: (obj, prop) => {
        console.log(`이 obj(=person)의 프로퍼티 ${prop}의 값은 ${obj[prop]}입니다.`);
        return obj[prop];
    },

    set: (obj, prop, value) => {
        console.log(`${prop}의 값은 ${obj[prop]}에서 ${value}로 바뀌게 될 것입니다.`);
        obj[prop] = value;
        return obj[prop];
    },
});

// 위에서 정의한 get과 set이 어떻게 작동하는지 확인해 보겠습니다.

presonProxy.name; // 이 obj(=person)의 프로퍼티 name의 값은 Hong GilDong입니다.
presonProxy.age = 50; // age의 값은 42에서 50로 바뀌게 될 것입니다.
console.log(`name: ${presonProxy.name}, age: ${presonProxy.age}`); // name: Hong GilDong, age: 50

// Reflect를 활용해서 코드를 작성해보겠습니다.
const newPerson = {
    name: "Eric",
    age: 20,
    nationality: "American",
};

const newPersonProxy = new Proxy(newPerson, {
    get: (obj, prop) => {
        console.log(Reflect.get(obj, prop));
        return Reflect.get(obj, prop);
    },

    set: (obj, prop, value) => {
        console.log(Reflect.set(obj, prop, value));
        return Reflect.set(obj, prop, value);
    },
});

newPersonProxy.name; // Eric
newPersonProxy.age = 30; // true, set의 결괏값은 로직 성공 여부로 나타납니다. 아래 콘솔에서 모든 변경이 제대로 이루어졌음을 알 수 있습니다.
console.log(newPersonProxy); // { name: 'Eric', age: 30, nationality: 'American' }

// Proxy 객체를 사용할 때 Reflect 객체의 메소드를 사용하면 코드가 더 명확하고 직관적이며, 일관된 동작을 보장할 수 있다고 합니다. 좋다면 Proxy와 함께 써주는 것이 좋겠죠?

// 이제 Proxy 패턴을 따를 때와 아닐 때의 차이점을 생각해 봅시다.
// '로깅 및 감시'에 이점이 있습니다. 위 코드처럼 set, get 핸들러 안에서 로그를 남길 수 있습니다. 그리고 특정 조건에서 해당 객체에 대한 접근을 허용하거나 차단할 수 있죠.
// '보안 및 검증'에 이점이 있습니다. '유효성 검사 로직'을 구현할 때 아주 편리하죠. 아래에 간단한 예제를 보여드리겠습니다.

const jay = {
    name: "Jay",
    age: 16,
    nationality: "Korean",
};

const jayProxy = new Proxy(jay, {
    get: (obj, prop) => {
        if (!Reflect.get(obj, prop)) {
            console.log("잘못된 접근입니다.");
            return;
        }
        return Reflect.get(obj, prop);
    },

    set: (obj, prop, value) => {
        if (prop === "name" && typeof value !== "string") {
            console.log(`${prop}의 타입을 확인해주세요.`);
            return;
        }

        if (prop === "nationality" && typeof value !== "string") {
            console.log(`${prop}의 타입을 확인해주세요.`);
            return;
        }

        if (prop === "age" && typeof value !== "number") {
            console.log(`${prop}의 타입을 확인해주세요.`);
            return;
        }

        return Reflect.set(obj, prop, value);
    },
});

jayProxy.nickName; // 잘못된 접근입니다.
jayProxy.name = 123; // name의 타입을 확인해주세요.
console.log(jayProxy.name); // Jay -> 올바르게 조회됩니다.
jayProxy.age = 123;
console.log(jayProxy); // { name: 'Jay', age: 123, nationality: 'Korean' } -> 올바르게 수정됩니다.

// 이처럼 직접 jay를 조작하는 것보다 jayProxy를 통하면 유효성 검사를 쉽게 구현할 수 있습니다.
// 이제 아래의 장점들이 이해가 쉬울겁니다.

// '인터셉트와 중개' Proxy를 사용하면 중개자 역할을 수행하여 원본 객체에 직접 접근하지 않고 중간에서 데이터를 가공하거나 조작할 수 있습니다.
// '명확성 및 유지보수' Proxy를 사용하면 객체 조작 로직이 명시적으로 핸들러에 구현되어 있으므로 코드가 더 명확하고 유지보수가 용이해집니다.

// 결국 Proxy 패턴을 사용하면 객체에 접근할 때 추가적인 로직을 적용하거나 데이터를 보호하는 등의 다양한 기능을 수행할 수 있습니다.
// Proxy는 객체의 동작을 커스터마이징할 수 있는 유용한 기능입니다. Proxy는 유효성 검사, 포메팅, 알림, 디버깅 등에 유용하게 사용할 수 있습니다.
// 다만, 핸들러 객체에서 Proxy를 헤비하게 사용하면 성능 저하를 유발할 수 있다고 합니다. 적당한 게 좋겠죠?
