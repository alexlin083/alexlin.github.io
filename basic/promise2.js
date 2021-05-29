//promise  是一個表示非同步運算的"最終" 完成或失敗 的物件
//promise  多個then的寫法(同一個then)
//.catch() 設一個斷點，避免程式繼續跑下去
let doWork = function (job, timer, cb) {
    setTimeout(() => {
      let dt = new Date();
      cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
    }, timer);
  };
  
  // new Promise(function (resolve, reject) {});
  //
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
  // 刷完牙 > 吃早餐 > 寫功課
  // Promise.then.catch
  // Promise chain

// 在 "寫功課"地方false 就會停止，不會繼續再下去
// 適用在除錯的地方，找出問題
    doWorkPromise("刷牙", 2000, true)
    .then((result) => {
        console.log(result);
        return doWorkPromise("吃早餐", 3000, true);
    }) 
    .then((result) => {
        console.log(result);
        return doWorkPromise("寫功課", 3000, false);
    })
    .then((result) => {
        console.log(result);
        return doWorkPromise("看電視", 3000, true);
    })
    .catch((err) => {
        console.error("發生錯誤", err);
    });

    //   doWorkPromise("刷牙", 2000, true)
//     .then((result) => {
//       // fulfilled 處理成功 resolve
//       console.log(result);
//       return doWorkPromise("吃早餐", 3000, false);
//     })
//     .then((result) => {
//       console.log(result);
//       return doWorkPromise("寫功課", 5000, true);
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       // rejected 處理失敗 reject
//       console.error("發生錯誤", err);
//     })
//     .finally(() => {
//       console.log("我是 Finally");
//     });