//用jquery.ajax取

$(function () {
  //   $.ajax({
  //     method: "GET",
  //     url: '/api/stock',
  //     dataType: "json",
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
