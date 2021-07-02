# JSX 語法

JSX 語法的重點在於允許我們在 JS 的檔案中使用 HTML 的標籤，並且使用 JSX 語法建立的是「一個 React 的 element」

JSX 語法規範

1. 定義虛擬 DOM 時，不可用引號。
2. 標籤裡面要加 JS 表達式時 要加{}
3. 標籤裡 class="" 改用 className=""
4. 裡面 style 樣式 要用{{key:value}}
5. 只能有一個根標籤

```ruby
import React from 'react';

function ChildA(props) {
  return (
    <>  // 第五點，這是一個最外圍的根標籤
    //這裡不用加 ' '，因為不是字串，是JSX
      <hr />
      <h1 className="title" id={id} >Child A</h1>
      {props.parentData}
      <hr />
      <span style={{color:"red" , fontSize:"20px"}}> 這是測試 </span>
    </>
  );
}

export default ChildA;
```
