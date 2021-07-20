# Jeson Web Token (JWT)

在使用 Session 和 Cookie 認證時，使用者登入後，Session 會存在 Server 端，並提供給 Client 端的 Cookie 裡對應的 Session ID<br>

之後只要 Client 端向 Server 端發請求，伺服器會以 Cookie 中 Session ID 尋找 Session，讓 Server 端確認使用者身分。

這就表示使用者每驗證一次，就會建立和存取 Session 在資料庫中!!!!!
