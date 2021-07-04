# React Hook - useState 介紹

引入 Reacr 和 useState

```ruby
import React, {useState} from 'react';
```

要在 function 裡面建立變數及方法

```ruby
const [state, setState] = useState();
```

1. 第一個是 state 值
2. 第二個是更新 state 的**函數**
3. useState()裡面可以給**最初始值**
4. 右邊函數(setState)的通常命名是左邊的變數(state)加 set
5. setState 是用來對 state 變數 做改變的函式

起手式

> import、function、export 都先寫出來<br>
> 檔名、function 名稱、export default 名稱 都要一樣<br>

## function 寫法

```ruby
import React, { useState } from 'react';

function Demo(){

    const [count, setCount] = useState(0);
    const [name], setName] = useState('Alex');

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
