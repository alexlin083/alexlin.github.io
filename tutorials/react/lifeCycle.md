# 生命週期方法 lifeCycle

設計給 **類別型元件** 使用的<br>
函式型元件可以使用 useEffect 勾子來模擬，但不是 100%相同

#### componentDidMount

表示元件 **已經** 出現在網頁上，可以直接使用 DOM 處理，或向伺服器要初始化資料的 JS 程式碼

#### componentDidUpdate

表示元件 **已經** 更新完成(真的 DOM)，可以得到最後更新完的狀態值(State、或接收到新的 props)

#### componentWillUnmount

表示元件 **即將** 被移除到 DOM 外(不是隱藏)

呼叫順序

> constructor<br>
> render<br>
> DidMount

有更動元件的話

> render 先渲染<br>
> componentDidUpdate 再更動，也會抓到最後更動的值

```ruby
class App extends React.Component{
    constructor(){
        console.log("constructor")
        super()
        this.state = {
            total : 0,
        }
    }
}

componentDidMount(){
    console.log("DidMount");
}

componentDidUpdate(){
    console.log("DidUpdate");
}

componentWillUnmount(){
    console.log("WillUnmount");
}

render(){
    console.log("render");
    return{
        <>
            <h1 onClick={()=>{
                this.setState({ total : this.state.total +1})
            }}>{this.state.total}</h1>
        </>
    }
}

```

## useEffect 勾子

```ruby

// 模擬 componentDidMount
useEffect(()=>{
    //程式碼寫這.......
}, []);


// 模擬 componentDidUpdate
// componentDidMount會先執行，再執行DidUpdate
useEffect(()=>{
    //程式碼寫這.......
}, [變數]);


// 模擬 componentWillUnmount
useEffect(()=>{
    return ()=>{
        //程式碼寫這.......
    }
}, [變數]);

```

##　在父元件有使用子元件的情況下呼叫順序

> 1.  父 constructor
> 2.  父 render
> 3.  子 constructor
> 4.  子 render
> 5.  子 componentDidMount
> 6.  父 componentDidMount
