
`async`/`await`는 **“시간이 좀 걸리는 작업(비동기 작업)”을 기다렸다가 차례대로 실행하기 위해** 쓴다

---

## 1. 왜 필요할까?

브라우저에서 하는 일에는 시간이 걸리는 것들이 많아요.
예를 들어:

* 서버에 로그인 요청 보내기 (`signIn`)
* 파일 읽어오기 (`fs.read`)
* AI한테 질문 보내고 답 받기 (`ai.chat`)

➡️ 이런 건 **바로 결과가 안 오고**, 잠깐 기다려야 해요.

---

## 2. async / await 안 쓰면?

예시 – 로그인 정보 가져오기:

```ts
// Promise 방식 (async/await 안 씀)
window.puter.auth.getUser().then(user => {
  console.log("사용자:", user);
});
```

* `.then()` 체인을 계속 써야 해서 코드가 길고 헷갈림

---

## 3. async / await 쓰면?

```ts
// async/await 방식
async function showUser() {
  const user = await window.puter.auth.getUser();
  console.log("사용자:", user);
}
showUser();
```

* `await` = “잠깐만! 이 작업 끝날 때까지 기다릴게”
* 코드가 위에서 아래로 쭉 읽히니까 **동기 코드처럼 직관적**이에요.

---

## 4. 비유

* **Promise.then()** → “너 먼저 가, 끝나면 전화 줘”
* **async/await** → “내가 여기서 기다릴게, 끝나면 같이 가자”

---

## 5. 언제 꼭 써야 해?

* 서버 통신 (로그인/로그아웃, 데이터 요청)
* 파일 읽기/쓰기
* AI API 호출
  ➡️ 결과가 바로 안 오고, **나중에 도착하는 작업**에 필요해요.

---

👉 정리:

* `async` = “이 함수 안에서는 `await`를 쓸 수 있다”는 표시
* `await` = “이 작업 끝날 때까지 잠시 기다려라”
* 덕분에 코드가 **간단하고 이해하기 쉬움**

---




## 1. Promise란?

* 자바스크립트에서 **“결과가 나중에 올 거야”라고 약속하는 상자**예요.
* 지금은 비어있지만, 나중에 성공 값(✅)이나 실패 이유(❌)를 넣을 수 있어요.
* 예:

  ```ts
  const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("끝났어!"), 1000);
  });
  ```

---

## 2. then()과 관련

* `then()`은 Promise가 **성공했을 때 실행할 코드**를 붙이는 방법이에요.
* 예:

  ```ts
  window.puter.auth.getUser().then(user => {
    console.log("로그인한 사용자:", user);
  });
  ```

  * `getUser()`는 Promise를 반환 → 결과가 올 때까지 기다림.
  * 결과가 오면 `then(user => {...})` 안의 코드 실행.

---

## 3. 왜 써?

* 자바스크립트는 기본적으로 **비동기(동시에 여러 일)**를 잘 다뤄야 해요.
* 서버 통신, 파일 읽기, AI 응답 같은 건 **바로 안 끝나니까** Promise로 처리.
* `then()`은 “끝나면 이거 실행해”라는 예약 버튼이에요.

---

## 4. 언제 쓰냐?

* **옛날 코드**나 **간단한 연결**에서는 `then()`이 여전히 많이 쓰여요.
* 예:

  ```ts
  fetch("/api/data")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  ```
* Promise 체이닝으로 **순서를 보장**할 수 있어요.

---

## 5. 왜 번거롭다고 했을까?

* `then()`만 계속 쓰면 **피라미드처럼 깊어지는 콜백 지옥**이 돼요.

  ```ts
  doA().then(() => {
    doB().then(() => {
      doC().then(() => {
        console.log("끝!");
      });
    });
  });
  ```

  실행 흐름
    doA() 실행 → 끝날 때까지 기다림
    doB() 실행 → 끝날 때까지 기다림
    doC() 실행 → 끝날 때까지 기다림
    console.log("끝!") 실행

👉 따라서 무조건 A → B → C → 끝! 순서로 실행돼요.


* async/await은 이걸 평평하게 만들어서 읽기 쉽게 해 줘요.

---

## 6. 그렇다면 왜 여전히 Promise/then을 쓰냐?

* **병렬 작업(동시에 실행)**할 때 편리해요.

  ```ts
  Promise.all([doA(), doB(), doC()])
    .then(results => {
      console.log("모두 완료:", result);
    });
  ```
* A, B, C가 같이 시작
    가장 늦게 끝난 게 기준이 됨
    전부 끝나면 → "모두 완료!" 실행
* **콜백 대신** → Promise는 더 구조적임 (에러 처리도 `catch`로 깔끔).
* async/await을 못 쓰는 환경(옛날 JS)에서는 기본적으로 `then()` 사용.

---

✅ 정리

* **Promise** = “결과를 나중에 줄게”라는 약속 상자
* **then()** = 그 결과가 왔을 때 실행할 코드 붙이는 방법
* **async/await** = then을 보기 좋게 바꾼 문법 
* **then 방식도 유용**: 여러 작업을 동시에 묶을 때, 구형 코드와 호환할 때


---

## 1. Promise 기본 형태

* `Promise<T>`는 **“T 타입 값을 나중에 줄 거야”**라는 약속이에요.
* 예:

  ```ts
  Promise<string>  // 나중에 문자열을 줌
  Promise<number>  // 나중에 숫자를 줌
  Promise<User>    // 나중에 User 객체를 줌
  ```

---

## 2. void는 뭐야?

* `void`는 **“값 없음”**을 뜻해요.
* `Promise<void>`는 **“끝나긴 하는데, 특별히 결과는 안 줌”**이라는 약속.

---

## 3. 예시

```ts
// 예: 로그인 함수
async function signIn(): Promise<void> {
  console.log("로그인 중...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("로그인 완료!");
}
```

* 이 함수는 “로그인 작업을 1초 후에 끝낸다”라는 약속을 해요.
* 하지만 끝난 뒤에 특별히 돌려줄 데이터는 없어요 → 그래서 `Promise<void>`.

---

## 4. 비유

* `Promise<string>` = “택배가 오는데, 안에 **문자열**이 들어있음”
* `Promise<void>` = “택배가 오는데, 안에는 아무것도 없음. 그냥 **도착 자체가 의미**”

---

## 5. 언제 쓰냐?

* **결과가 필요 없는 비동기 작업**일 때:

  * 로그인/로그아웃 (`signIn`, `signOut`)
  * 로그 저장 (서버에 기록만 남기고 결과 없음)
  * 알림 보내기 (성공했는지 여부만 중요, 값은 안 돌려줌)

---
