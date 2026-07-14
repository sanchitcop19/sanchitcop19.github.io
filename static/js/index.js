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

var toggleProjects = function() {
    var modal = document.getElementById("projects-modal");
    var toggleBtn = document.getElementById("projects-toggle");
    var isOpen = modal.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      var modal = document.getElementById("projects-modal");
      if (modal && modal.classList.contains("open")) {
        toggleProjects();
      }
    }
  });