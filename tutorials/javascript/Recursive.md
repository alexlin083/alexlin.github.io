# 遞迴

## 遞迴就是運用函數可以呼叫函數本身並搭配邊界條件(終止條件)，來達到可以簡化迴圈的效果。

```ruby

function sumRecursion(num) {
  console.log("num : ", num);
  if (num == 1) {
    console.log("num =1 ", num);
    return 1;
  } else {
    const sn = sumRecursion(num - 1) + num;
    console.log("sn ", sn);
    return sn;
  }
}

console.log(sumRecursion(6));

```

## 計算

| num |           sn            |
| --- | :---------------------: |
| 6   | sumRecursion(6 - 1) + 6 |
| 5   | sumRecursion(5 - 1) + 5 |
| 4   | sumRecursion(4 - 1) + 4 |
| 3   | sumRecursion(3 - 1) + 3 |
| 2   | sumRecursion(2 - 1) + 2 |
| 1   |     sumRecursion(1)     |

從以上得知，num 依序從 6 開始往下找，找到 1，
因為 num = 6 的時候，sumRecursion(5) 又是 sumRecursion(4) +5
所以必須要從最底端開始往上累加取的值

## ANS

```
num :  6
num :  5
num :  4
num :  3
num :  2
num :  1
num =1  1
sn  3
sn  6
sn  10
sn  15
sn  21
21
```
