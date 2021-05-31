//await
let toDo = function (job, timer, success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();

      if (success) {
        return resolve(`我${job} at ${dt.toISOString()}`);
      }
    }, timer);
  });
};

async function callAwait() {
  try {
    let result = await toDo("刷牙", 1000, true);
    console.log("await", result);

    result = await toDo("吃飯", 2000, true);
    console.log("await", result);

    result = await toDo("看電視", 5000, true);
    console.log("await", result);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("結束");
  }
}

callAwait();
