# React Hook - useEffect 介紹

useEffect 用在

> 發 ajax 請求讀取<br>
> 網頁中定時器功能<br>
> 訂閱、愛心收藏功能...<br>
> 手動更改 DOM 節點(很少見)

引入 Reacr 和 useEffect

```ruby
import React, {useState, useEffect} from 'react';
```

useEffect 需要帶入一個函式，且會在畫面**render 後**被呼叫<br>
只要有 state(狀態)發生改變，都會呼叫 useEffect，即監測 state 的變化<br>

- 看起來類似 class 生命週期(lifeCycle)裡的 **componentDidMount** & **componentDidUpdate**

> useEffect(()=>{}, []); 裡面的 [] ，只要沒有[]，就會全部都監測<br>
> 如: useEffect(()=>{}); 這樣就是 state 只要一變化，即呼叫 useEffect

> 如: useEffect(()=>{}, []); 這樣就是 誰都部監測，state 變化**不會呼叫**useEffect

> 如: useEffect(()=>{}, [變數]); [] 裡面有變數，則是監測該變數，<br>
> 該變數只要 state 變化，即呼叫 useEffect

> 如有多個變數，[] 裡面有幾個，則監測幾個<br>
> 如下範例: 如果 useEffect 裡[]只有 count 變數，則變動 count 時會呼叫<br>
> 沒有 name 時， name 的元件(component)變動也不會呼叫 useEffect

```ruby
useEffect(() => {
    //程式碼寫這
}, []);
```

## function 寫法

```ruby
import React, {useState, useEffect} from 'react';

function Demo(){

    const [count, setCount] = useState(0);
    const [name, setName] = useState('Alex');

    useEffect(() => {
        return () => {
            // 程式碼寫在這
            console.log('useEffect');
        };
    }, [count,name]);

    function cli(){
        //第一種寫法
        //setCount(count+1);

        //第二種寫法
        setCount((count)=>{
            return count+1;
        })
    }

    function changeName(){
        setName('John');
    }

    return (
        <div>
            <h2>點擊次數為{count}</h2>
            <h2>我的名字是{name}</h2>
            <button onClick={cli}>點擊+1</button>
            <button onClick={changeName}>點擊換名字</button>
        <div>
    )
}
export default Demo

```

---

## Class 寫法

```ruby
import React, {component} from 'react'
export default class Demo extends Component{
    state = { count:0 };

    cli = () => {
        this.setState(state => ({ count: state.count+1}))
    }

    render = () => {
        return (
            <div>
                <h2>點擊次數為{this.state.count}</h2>
                <button onClick={this.cli}>點擊+1</button>
            <div>
        )
    }
}

export default Demo

```

這一段是 render 頁

```ruby
import React, {component} from 'react'
import Demo from '/hook路徑'

export default class App extends Component {
    render(){
        return (
            <div>
                <Demo/>
            <div>
        )
    }
}

```

---

## 刪除元件

class 寫法

```ruby
export default class Demo extends Component{
    state = { count:0 };

    cli = () => {
        this.setState(state => ({ count: state.count+1}))
    }

    unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }

    componentDidMount(){
        //程式碼寫這，如一個計時器
        this.timer = setInterval(()=>{
            this.setState((state) => ({count: state.count + 1}));
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render = () => {
        return (
            <div>
                <h2>點擊次數為{this.state.count}</h2>
                <button onClick={this.cli}>點擊+1</button>
                <button onClick={this.unmount}>刪除此元件</button>
            <div>
        )
    }
}

```

函數式寫法

```ruby
function Demo(){

    const [count, setCount] = useState(0);

    //設定 每秒+1
    useEffect(() => {
        setInterval(()=>{
            this.setState((state) => ({count: state.count + 1}));
        }, 1000)
    }, []);

    //定義 每點擊一次+1
    function cli(){
        setCount((count)=>{
            count += 1;
        })
    }

    //定義刪除元件的callBack函式
    function unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }

    return (
        <div>
            <h2>點擊次數為{count}</h2>
            <button onClick={cli}>點擊+1</button>
            <button onClick={unmount}>刪除此元件</button>
        <div>
    )
}


```

> 做到這一步，但只有有**元件**已刪除，但計數器功能還在，在 console.log()還是會有錯誤

> 這邊要注意 useEffect() 相當於 componentUpDate & componentDidMount 這 2 個<br>
> 所以 還欠需一個 componentWillUnmount 的功能<br>

```ruby
useEffect(() => {
    setInterval(()=>{
        this.setState((state) => ({count: state.count + 1}));
    }, 1000)
}, []);
```

把上面這段計時器的功能改寫成 : 在變數 timer 裡，並加上 return clearInterval()

```ruby
useEffect(() => {
    let timer = setInterval(()=>{
        this.setState((state) => ({count: state.count + 1}));
    }, 1000)
    return ()=>{
        clearInterval(timer);
    }
}, []);

```
