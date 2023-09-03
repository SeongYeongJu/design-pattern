// https://patterns-dev-kr.github.io/ 이 사이트를 보고 공부합니다.
// (주석의 느낌표, todo는 색깔 구분을 위해 사용했습니다. 별 의미는 없어요.)

//Todo Observer (아래 코드는 리액트 프로젝트에서 구현하세요)
//Todo 특정 객체를 구독하는 주체를 Observer라고 합니다. 반면에 구독 가능한 객체를 Observable이라 부릅니다. 어떤 이벤트가 Observable에서 발생했을 때, 그 이벤트를 Observer에 전달합니다.

//-------------------------------------------------------------------------------------------------------------//

// ES6 class를 이용하여 옵저버 패턴을 아래와 같이 구현해봅시다.
// 옵저버 패턴의 특징은 아래 3개의 메서드를 통해 확인할 수 있습니다.
// observers -> 구독중인 observer를 모은 배열
// subscribe -> observable을 구독을 하기 위한 메서드
// unsubscribe -> 구독 취소
// notify -> 각 observer들에게 데이터를 전달

class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(func) {
        this.observers.push(func);
    }

    unsubscribe(func) {
        this.observers.filter((observer) => observer !== func);
    }

    notify(data) {
        this.observers.forEach((observer) => observer(data));
    }
}

// -------------------------------------- App -------------------------------------- //

// 리액트에서 observer 패턴을 구현합니다.
import { useState } from "react";
import { Observable } from "./hooks/observerClass";
import Alert from "./components/alert/Alert";
import "./App.css";

// getAlert와 logger를 subscribe 합니다. getAlert는 경고창을 띄우고 logger는 콘솔로 기록을 합니다.
// handleClick을 누르면 notify를 호출합니다.
// 그러면 subscribe로 등록된 getAlert와 logger에 data를 전달됩니다.

function App() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState("");
    const observable = new Observable();

    const handleClickBtn = () => {
        observable.notify("경고 버튼을 클릭했습니다"); // notify를 통해 등록된 observer에게 데이터를 전달합니다.
    };

    const getAlert = (newData) => {
        setData(newData); // state에 데이터를 새로 설정하고,
        setOpen(true); // 경고 모달을 오픈합니다.
    };

    const logger = (newData) => {
        console.log(`${Date.now()}-${newData}`); // 콘솔에 로그를 찍습니다.
    };

    // getAlert와 logger를 observers에 등록합니다.
    observable.subscribe(getAlert);
    observable.subscribe(logger);

    return (
        <>
            <div className="button-container">
                <button className="alert-button" onClick={handleClickBtn}>
                    Alert
                </button>
            </div>
            <Alert open={open} setOpen={setOpen} data={data}>
                data:
            </Alert>
        </>
    );
}

// -------------------------------------- Alert -------------------------------------- //

import { useEffect } from "react";
import "./Alert.css";

const Alert = ({ children, open, setOpen, data }) => {
    useEffect(() => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    });

    return (
        <>
            {open ? (
                <div className="dark-background">
                    <div className="alert-container">
                        <span className="alert-text">{`${children} ${data}`}</span>
                    </div>
                </div>
            ) : null}
        </>
    );
};

// ----------------------------------------------------------------------------------- //

// 위 Observable 클래스를 custom hook으로도 구현할 수 있을 것 같습니다.
import { useState } from "react";

// Custom Hook으로 구현
const useObservable = () => {
    const [observers, setObservers] = useState([]);

    const subscribe = (func) => {
        setObservers((prev) => [...prev, func]);
    };

    const unsubscribe = (func) => {
        setObservers((prev) => prev.filter((observer) => observer !== func));
    };

    const notify = (data) => {
        observers.forEach((observer) => observer(data));
    };

    return {
        observers,
        subscribe,
        unsubscribe,
        notify,
    };
};

// ----------------------------------------------------------------------------------- //

// 이처럼 앱 내에 버튼을 누르는 인터렉션이 발생하는 동안 getAlert와 logger는 notify를 통해 계속해서 이벤트를 받아 볼 수 있습니다.
// Observer 패턴은 다양하게 활용할 수 있지만 비동기 호출 혹은 이벤트 기반 데이터를 처리할 때 매우 유용합니다.
// 만약 어떤 컴포넌트가 특정 데이터의 다운로드 완료 알림을 받기 원하거나, 사용자가 메시지 보드에 새로운 메시지를 게시했을 때 모든 멤버가 알림을 받거나 하는 등의 상황에서 유용합니다.
// Observer 패턴을 사용하는 것도 관심사의 분리와 단일 책임의 원칙을 강제하기 위한 좋은 방법입니다.
// Observer 객체는 Observable 객체와 강결합 되어있지 않고 언제든지 분리될 수 있습니다. Observable 객체는 이벤트 모니터링의 역할을 하고. Observer는 받은 데이터를 처리하는 역할을 합니다.
// 다만, Observer가 복잡해지면 모든 Observer들에 알림을 전파하는 데 성능 이슈가 발생할 수 있습니다.
