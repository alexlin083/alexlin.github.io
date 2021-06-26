# label 標籤 如何包 < input type="file" >

參考文章:https://ithelp.ithome.com.tw/articles/10196187

## 在做專題時，遇到上傳檔案的情況

想說怎麼都無法改 input->type=file 的 CSS 樣式，上網查了一下順道記錄下來

[stackoverflow](https://stackoverflow.com/questions/572768/styling-an-input-type-file-button)

發現原來是**樣式文件輸入是出了名的困難，因為大多數瀏覽器不會改變 CSS 或 javascript 的外觀。**

> 解決方法:<br>
> 在表單的 input 會搭配 label 一起使用<br>
> 在網頁上 label 不會呈現任何效果，但是搭配 input 使用時<br>
> 在 label 上加上 for ，而 input 加上 id <br>
> 這樣可以讓 label 與 input 互相指定，當滑鼠點到 label 包覆的文字<br>
> 就能使游標指到 input 上面。<br>

```bash
<label for="name">
<input type="file" id="name">選擇照片</label>
```

> 將 label 跟 input 用 li 或 div 包起來，<br>
> 再將 label 跟 input 設為 display:inline-block ，<br>
> 可以針對 label 跟 input 統一設定寬度，或是製作想要的樣式，<br>
> 在許多國外免費表單的樣式設計上都可以看到類似的做法。<br>
