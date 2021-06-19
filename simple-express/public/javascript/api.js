//用jquery.ajax取

$(function () {
  //   $.ajax({
  //     type: "GET",
  //     url: "/api/stocks",
  //   }).done(function (data) {
  //     console.log(data);
  //   });

  //axios
  axios
    .get("/api/stocks")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
});
