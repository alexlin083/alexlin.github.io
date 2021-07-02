# 虛擬 DOM 和 DOM 的比較

在剛碰到 react 後，常聽到 Virtual DOM 這個詞，相對陌生，故寫一篇來讓自己記憶一下<br>
React 是建立於 Virtual DOM 之上，為的是避免直接操作 DOM，因為操作 DOM 這件事會耗費很大的成本。<br>

## VDOM (virtual DOM) 虛擬

> 是用物件(object)來描述 DOM 的結構，在 DOM 的節點需要更動時，不直接修改 DOM<br>
> 是透過 **diff** 演算法比較 Virtual DOM **修改前與修改後**的樹狀結構，然後批次更新真實 DOM 中的節點。

1. 本質是 object 的物件
2. 虛擬 DOM 身上的屬性 相較於 DOM 少， 用 console.log 看看就知，因為虛擬 DOM 是 React 內部使用，DOM 身上的其它屬性就不用全部使用
3. 虛擬 DOM 最後還是會被 React 轉化成 DOM 並呈現在頁面上。

```ruby

import React from 'react';

function ChildA(props) {
  return (
    <>  //這裡不用加 ' '，因為不是字串，是JSX
      <hr />
      <h1>Child A</h1>
      {props.parentData}
      <hr />
    </>
  );
}

export default ChildA;

```

參考資料網址:

1. https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/build-a-simple-virtual-dom-5cf12ccf379f
2. https://www.youtube.com/watch?v=85gJMUEcnkc&ab_channel=TechTalksYLD
3. https://www.youtube.com/watch?v=tSXsAPlittQ&list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu&index=5&ab_channel=%E5%B0%9A%E7%A1%85%E8%B0%B7IT%E5%9F%B9%E8%AE%AD%E5%AD%A6%E6%A0%A1

4. [操作 DOM 的方式](https://www.youtube.com/watch?v=yT-ys2W_d9g&list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu&index=3&ab_channel=%E5%B0%9A%E7%A1%85%E8%B0%B7IT%E5%9F%B9%E8%AE%AD%E5%AD%A6%E6%A0%A1)
