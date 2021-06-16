# DOM

## Manage HTML DOM with vanilla JavaScript

使用 DOM 前言: <br>

> 即使我們的應用程序由 Angular、Vue、React、Svelte 等現代工具提供支持，我們也必須處理 DOM。這些框架直接封裝和隱藏了 DOM 管理，但仍然為我們提供了一扇門，可以通
> 過 ref、事件處理程序使用 DOM。<br>
> 如果您在任何框架中開發或使用 Web 組件，您都必須在某個級別使用 DOM。<br>
> 了解瀏覽器 DOM API 以及如何使用它們在 Web 開發中發揮著重要作用。一個介紹 API、眾所周知的問題、最流行的問題的網站可能非常有用。

參考連結:https://htmldom.dev/

---

document

- 屬性
- 方法

---

1. DOM 的屬性

(1). 描述彼此之間的關係

```ruby
parentNode | childNodes
firstChild | lastChild
previousSibling | nextSibling
```

(2). 描述本身的資訊

```ruby
nodeType
nodeValue
nodeName
```

2. 尋找物件

(1). 直接找

```ruby
document.firstChild.lastChild.firstChild.innerText = 'ABC';
```

(2). 捷徑

```ruby
getElementById()
getElementsByName()
getElementsByTagName()
getElementsByClassName()
querySelector()
querySelectorAll()
```

3. 新增物件

(1). 先建標籤

```ruby
document.createElement('標籤');
[ex].
let image = document.createElement('img');
-----------------------------------------------------
| 在此，(2). 將該標籤的屬性和方法寫好                          |
| image.src = '路徑＋檔名';                            |
| image.width = 300;                                 |
| image.style.width = '300px';                       |
| image.addEventListener('click',function(){....});  |
-----------------------------------------------------
```

(3). 找到爸爸，放進爸爸節點中

```ruby
尋找父節點.appendChild(子物件);
尋找父節點.insertBefore(子物件,兄弟節點);
尋找父節點.replaceChild(子物件,兄弟節點);
```

4. 刪除物件

- 尋找父節點.removeChild(子物件);

5. 修改

(1). 文字內容

```ruby
某物件.innerHTML = '文字或包含標籤的內容';
某物件.innerText = '文字';
某物件.textContent = '文字';
```

(2). HTML 標籤本身的屬性

```ruby
找到img物件.src = '路徑+檔名';
找到img物件.width = 300;
某物件.id = 'myId';
某物件.className = 'myClass';
找到label物件.htmlFor = 'myLabel';
找到input物件.value = 'hello!';
```

(3). CSS 的屬性

```ruby
找到 img 物件.style.width = '300px';
某物件.style.backgroundColor = 'red';
```
