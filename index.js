var switch_devpost = function(toggle) {
    var black = document.getElementById("devpost-icon");
    var blue = document.getElementById("devpost-icon-blue");
    if (toggle == 1) {
      blue.style = "display: inline-block";
      black.style = "display: none";
    } else {
      black.style = "display: inline-block";
      blue.style = "display: none";
    }
  };