let doWorkPromise = function (job, timer, success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (success) {
        // 成功
        return resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      }
      reject(`!!工作失敗: ${job} at ${dt.toISOString()}`);
    }, timer);
  });
};

// 方法一
// doWorkPromise("刷牙", 2000, true)
//   .then((result) => {
//     // fulfilled 處理成功 resolve
//     console.log(result);
//     return doWorkPromise("吃早餐", 3000, false);
//   })
//   .then((result) => {
//     console.log(result);
//     return doWorkPromise("寫功課", 5000, true);
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     // rejected 處理失敗 reject
//     console.error("發生錯誤", err);
//     return doWorkPromise("吃早餐", 3000, true);
//   })
//   .finally(() => {
//     console.log("我是 Finally");
//   });

//方法二
doWorkPromise("刷牙", 2000, true)
  .then(
    (result) => {
      // fulfilled 處理成功 resolve
      console.log(result);
      return doWorkPromise("吃早餐", 3000, false);
    },
    (reject) => {
      console.log("中途攔截A", reject);
    }
  )
  .then(
    (result) => {
      console.log(result);
      return doWorkPromise("寫功課", 5000, true);
    },
    (reject) => {
      console.log("中途攔截B", reject);
      // 試試看這行有註解 跟 沒註解的差異
      return doWorkPromise("寫功課", 5000, true);
    }
  )
  .then(
    (result) => {
      console.log(result);
    },
    (reject) => {
      console.log("中途攔截C", reject);
    }
  )
  .catch((err) => {
    // rejected 處理失敗 reject
    console.error("發生錯誤", err);
  })
  .finally(() => {
    console.log("我是 Finally");
  });

//Ans:A
// 方法二沒辦法抓到失敗的參數，方法一則可以
// 然而方法二抓到失敗後，如後續又有return，則可以繼續執行下去，方法一在失敗地方加return的話則不行

//Ans:B
//感覺方法一比較好維護，除了易讀，在執行reject方面就一板一眼，錯就錯了，沒在給你後面接return再跑下去，直接跳到catch
//方法二就比較有彈性，抓到一個錯誤後，不想讓程式停在那邊還可以給予對的參數接續跑下去，程式沒有寫完善的話卻有可能會找不到錯誤的地方
