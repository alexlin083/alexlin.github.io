const name = "Alex";
const bic = {
  color: "black",
  size: "M",
};

exports.name = "Ben";
exports.getColor = function () {
  return bic.color;
};

exports.setColor = function (color) {
  if (color == "Red" || color == "Blue") {
    bic.color = color;
  }
};
