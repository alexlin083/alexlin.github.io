# :root{} 使用方式

同一設定需要在同一個地方出現多次，為了好管理，可以使用 **root**

```bash
:root {
    --font-xl: 70px;
    --font-l:  36px;
    --font-m:  24px;
    --bg-color: #1d3557;
    --list-color: #457b9d;
}
```

## 使用 root 設定的

```bash
.class名稱0{
    background: var(--bg-color);
}

.class名稱1{
    background: var(--bg-color);
}

.class名稱2{
    font-size: var(--font-m);
}

.class名稱3{
    font-size: var(--font-m);
}
```

看起來很像 變數:變數值 的概念
