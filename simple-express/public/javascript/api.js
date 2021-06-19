//用jquery.ajax取

//ajax
// $.ajax({
//   method: "GET",
//   url: "/api/stock",
//   dataType: "json",
// }).done(function (data) {
//   console.log(data);
// });

$.ajax({
  method: "GET",
  url: "/api/stocks",
  dataType: "json",
})
  .done(function (data) {
    console.log(data);
  })
  .fail(function (error) {
    console.log(error);
  })
  .always(function () {
    console.log("complete");
  });
//axios
axios
  .get("/api/stocks")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

//fetch
fetch("/api/stocks")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// Vue?
// $(function () {
//     new Vue({
//         el: "#app",
//         data: {
//             stock: [],
//         },
//         beforeMount: async function () {
//             let response = await fetch("api/stock");
//             this.stocks = await response.json();
//         },
//     })
// })
