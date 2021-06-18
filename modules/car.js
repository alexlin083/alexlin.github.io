const name = "Alex";
const bic = {
  color: "black",
  size: "M",
};

exports.name = "Ben";

//建立一個getColor並回傳該值
exports.getColor = function () {
  return bic.color;
};

//建立一個setColor並回傳該值
exports.setColor = function (color) {
  if (color == "Red" || color == "Blue") {
    bic.color = color;
  }
};
