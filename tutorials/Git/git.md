# Git 指令操作

1. 如何更新 GitHub Fork 的 repository

https://marcus116.blogspot.com/2019/04/git-github-sync-fork-repository.html?m=1

協同開發 分支流程

1. 先 fork 對方的檔案
2. 再 git clone 對方專案網址，到自己的硬碟
3. 接著 切出自己分支， 我會切 develop 當分支 git branch develop
4. 切換到分支 git checkout develop
5. 我會先在 README.md 檔 加一行文字 先測試推到自己的 repo( 如沒有要測試也行，直接跳到第 8.)
6. git ci -m "XXXXXXXXXXX"
7. git push

---

8. 開發完一個檔案後， git add 這個檔案
9. git push 上去 repo
10. 發送 Pull Request，通知遠端進行 merge
11. git pull upstream develop (這是從遠端 pull 下來 merge 自己的分支，首先要去設定 .git 檔的 config 內容，參考上面連結)<br>
    簡單講就是 4 個步驟 (設定此動作的好處是 fork 的檔案，會跟著遠端 repo 變動而變動，就不會有遠端已經跟新到第三版，自己 fork 還在第一版)<br>
    - git remote -v
    - git remote add upstream https://github.com/對方的檔案路徑
    - git remote -v
    - git pull upstream develop(從 fork 的地方 pull 下來進行 merge)
