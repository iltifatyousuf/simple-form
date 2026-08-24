// ================ NEXT & PREVIOUS ========================//
let signupContent = document.querySelector(".signup-form-container"),
  stagebtn1b = document.querySelector(".stagebtn1b"),
  stagebtn2a = document.querySelector(".stagebtn2a"),
  stagebtn2b = document.querySelector(".stagebtn2b"),
  stagebtn4b = document.querySelector(".stagebtn4b"),
  stagebtn5a = document.querySelector(".stagebtn5a"),
  stagebtn5b = document.querySelector(".stagebtn5b"),
  signupContent1 = document.querySelector(".stage1-content"),
  signupContent2 = document.querySelector(".stage2-content"),
  signupContent4 = document.querySelector(".stage4-content"),
  signupContent5 = document.querySelector(".stage5-content");

signupContent2.style.display = "none";
signupContent5.style.display = "none";

function showAlert(message) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("custom-alert");
  alertContainer.innerText = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000); // Remove the alert after 3 seconds
}

function stage1to2() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var lookingFor = document.getElementById("lookingFor");

  if (
    fname === "" ||
    lname === "" ||
    phone === "" ||
    email === "" ||
    lookingFor.value === ""
  ) {
    showAlert("Please fill in all the required fields.");

    // Highlight the dropdown for better visibility
    lookingFor.classList.add("validation-error");
  } else {
    // Reset the style if valid
    lookingFor.classList.remove("validation-error");

    signupContent1.style.display = "none";
    signupContent4.style.display = "none";
    signupContent2.style.display = "block";
    signupContent5.style.display = "block";
    document.querySelector(".stageno-1").innerText = "✔";
    document.querySelector(".stageno-1").style.backgroundColor = "#7d9014";
    document.querySelector(".stageno-1").style.color = "#fff";
  }
}

function stage2to1() {
  signupContent1.style.display = "block";
  signupContent4.style.display = "block";
  signupContent2.style.display = "none";
  signupContent5.style.display = "none";
}

function submitForm() {
  var selectedOption = document.querySelector(".stage2-content select").value;
  var feedback = document.getElementById("comments").value;
  var budgetRange = document.getElementById("budgetRange");

  // Check if the range slider value is empty or falls outside the desired range
  if (
    selectedOption === "1" ||
    feedback.trim() === "" ||
    budgetRange.value === "" ||
    budgetRange.value < 100 ||
    budgetRange.value > 1000
  ) {
    showAlert("Please fill in all the required fields in Stage 2.");

    // Highlight the budget range input for better visibility
    budgetRange.classList.add("validation-error");
  } else {
    // Reset the style if valid
    budgetRange.classList.remove("validation-error");

    // Continue with the submission logic
    window.location.href = "thankyou.html";
  }
}
// ===== ======================= DROP DOWN ===== ============================= //

function create_custom_dropdowns() {
  $("select").each(function (i, select) {
    if (!$(this).next().hasClass("dropdown-select")) {
      $(this).after(
        '<div class="dropdown-select wide ' +
          ($(this).attr("class") || "") +
          '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
      );
      var dropdown = $(this).next();
      var options = $(select).find("option");
      var selected = $(this).find("option:selected");
      dropdown
        .find(".current")
        .html(selected.data("display-text") || selected.text());
      options.each(function (j, o) {
        var display = $(o).data("display-text") || "";
        dropdown
          .find("ul")
          .append(
            '<li class="option ' +
              ($(o).is(":selected") ? "selected" : "") +
              '" data-value="' +
              $(o).val() +
              '" data-display-text="' +
              display +
              '">' +
              $(o).text() +
              "</li>"
          );
      });
    }
  });

  $(".dropdown-select ul").before(
    '<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text"></div>'
  );
}

// Event listeners

// Open/close
$(document).on("click", ".dropdown-select", function (event) {
  if ($(event.target).hasClass("dd-searchbox")) {
    return;
  }
  $(".dropdown-select").not($(this)).removeClass("open");
  $(this).toggleClass("open");
  if ($(this).hasClass("open")) {
    $(this).find(".option").attr("tabindex", 0);
    $(this).find(".selected").focus();
  } else {
    $(this).find(".option").removeAttr("tabindex");
    $(this).focus();
  }
});

// Close when clicking outside
$(document).on("click", function (event) {
  if ($(event.target).closest(".dropdown-select").length === 0) {
    $(".dropdown-select").removeClass("open");
    $(".dropdown-select .option").removeAttr("tabindex");
  }
  event.stopPropagation();
});

function filter() {
  var valThis = $("#txtSearchValue").val();
  $(".dropdown-select ul > li").each(function () {
    var text = $(this).text();
    text.toLowerCase().indexOf(valThis.toLowerCase()) > -1
      ? $(this).show()
      : $(this).hide();
  });
}
// Search

// Option click
$(document).on("click", ".dropdown-select .option", function (event) {
  $(this).closest(".list").find(".selected").removeClass("selected");
  $(this).addClass("selected");
  var text = $(this).data("display-text") || $(this).text();
  $(this).closest(".dropdown-select").find(".current").text(text);
  $(this)
    .closest(".dropdown-select")
    .prev("select")
    .val($(this).data("value"))
    .trigger("change");
});

// Keyboard events
$(document).on("keydown", ".dropdown-select", function (event) {
  var focused_option = $(
    $(this).find(".list .option:focus")[0] ||
      $(this).find(".list .option.selected")[0]
  );
  // Space or Enter
  //if (event.keyCode == 32 || event.keyCode == 13) {
  if (event.keyCode == 13) {
    if ($(this).hasClass("open")) {
      focused_option.trigger("click");
    } else {
      $(this).trigger("click");
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      var focused_option = $(
        $(this).find(".list .option:focus")[0] ||
          $(this).find(".list .option.selected")[0]
      );
      focused_option.prev().focus();
    }
    return false;
    // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass("open")) {
      $(this).trigger("click");
    }
    return false;
  }
});

$(document).ready(function () {
  create_custom_dropdowns();
});

//========================= RANGE SLIDER ===============================//

!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  "use strict";
  function b() {
    var a = document.createElement("input");
    return a.setAttribute("type", "range"), "text" !== a.type;
  }
  function c(a, b) {
    var c = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function () {
      return a.apply(null, c);
    }, b);
  }
  function d(a, b) {
    return (
      (b = b || 100),
      function () {
        if (!a.debouncing) {
          var c = Array.prototype.slice.apply(arguments);
          (a.lastReturnVal = a.apply(window, c)), (a.debouncing = !0);
        }
        return (
          clearTimeout(a.debounceTimeout),
          (a.debounceTimeout = setTimeout(function () {
            a.debouncing = !1;
          }, b)),
          a.lastReturnVal
        );
      }
    );
  }
  function e(a) {
    return a && (0 === a.offsetWidth || 0 === a.offsetHeight || a.open === !1);
  }
  function f(a) {
    for (var b = [], c = a.parentNode; e(c); ) b.push(c), (c = c.parentNode);
    return b;
  }
  function g(a, b) {
    function c(a) {
      "undefined" != typeof a.open && (a.open = a.open ? !1 : !0);
    }
    var d = f(a),
      e = d.length,
      g = [],
      h = a[b];
    if (e) {
      for (var i = 0; e > i; i++)
        (g[i] = d[i].style.cssText),
          d[i].style.setProperty
            ? d[i].style.setProperty("display", "block", "important")
            : (d[i].style.cssText += ";display: block !important"),
          (d[i].style.height = "0"),
          (d[i].style.overflow = "hidden"),
          (d[i].style.visibility = "hidden"),
          c(d[i]);
      h = a[b];
      for (var j = 0; e > j; j++) (d[j].style.cssText = g[j]), c(d[j]);
    }
    return h;
  }
  function h(a, b) {
    var c = parseFloat(a);
    return Number.isNaN(c) ? b : c;
  }
  function i(a) {
    return a.charAt(0).toUpperCase() + a.substr(1);
  }
  function j(b, e) {
    if (
      ((this.$window = a(window)),
      (this.$document = a(document)),
      (this.$element = a(b)),
      (this.options = a.extend({}, n, e)),
      (this.polyfill = this.options.polyfill),
      (this.orientation =
        this.$element[0].getAttribute("data-orientation") ||
        this.options.orientation),
      (this.onInit = this.options.onInit),
      (this.onSlide = this.options.onSlide),
      (this.onSlideEnd = this.options.onSlideEnd),
      (this.DIMENSION = o.orientation[this.orientation].dimension),
      (this.DIRECTION = o.orientation[this.orientation].direction),
      (this.DIRECTION_STYLE = o.orientation[this.orientation].directionStyle),
      (this.COORDINATE = o.orientation[this.orientation].coordinate),
      this.polyfill && m)
    )
      return !1;
    (this.identifier = "js-" + k + "-" + l++),
      (this.startEvent =
        this.options.startEvent.join("." + this.identifier + " ") +
        "." +
        this.identifier),
      (this.moveEvent =
        this.options.moveEvent.join("." + this.identifier + " ") +
        "." +
        this.identifier),
      (this.endEvent =
        this.options.endEvent.join("." + this.identifier + " ") +
        "." +
        this.identifier),
      (this.toFixed = (this.step + "").replace(".", "").length - 1),
      (this.$fill = a('<div class="' + this.options.fillClass + '" />')),
      (this.$handle = a('<div class="' + this.options.handleClass + '" />')),
      (this.$range = a(
        '<div class="' +
          this.options.rangeClass +
          " " +
          this.options[this.orientation + "Class"] +
          '" id="' +
          this.identifier +
          '" />'
      )
        .insertAfter(this.$element)
        .prepend(this.$fill, this.$handle)),
      this.$element.css({
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        opacity: "0",
      }),
      (this.handleDown = a.proxy(this.handleDown, this)),
      (this.handleMove = a.proxy(this.handleMove, this)),
      (this.handleEnd = a.proxy(this.handleEnd, this)),
      this.init();
    var f = this;
    this.$window.on(
      "resize." + this.identifier,
      d(function () {
        c(function () {
          f.update(!1, !1);
        }, 300);
      }, 20)
    ),
      this.$document.on(
        this.startEvent,
        "#" + this.identifier + ":not(." + this.options.disabledClass + ")",
        this.handleDown
      ),
      this.$element.on("change." + this.identifier, function (a, b) {
        if (!b || b.origin !== f.identifier) {
          var c = a.target.value,
            d = f.getPositionFromValue(c);
          f.setPosition(d);
        }
      });
  }
  Number.isNaN =
    Number.isNaN ||
    function (a) {
      return "number" == typeof a && a !== a;
    };
  var k = "rangeslider",
    l = 0,
    m = b(),
    n = {
      polyfill: !0,
      orientation: "horizontal",
      rangeClass: "rangeslider",
      disabledClass: "rangeslider--disabled",
      horizontalClass: "rangeslider--horizontal",
      verticalClass: "rangeslider--vertical",
      fillClass: "rangeslider__fill",
      handleClass: "rangeslider__handle",
      startEvent: ["mousedown", "touchstart", "pointerdown"],
      moveEvent: ["mousemove", "touchmove", "pointermove"],
      endEvent: ["mouseup", "touchend", "pointerup"],
    },
    o = {
      orientation: {
        horizontal: {
          dimension: "width",
          direction: "left",
          directionStyle: "left",
          coordinate: "x",
        },
        vertical: {
          dimension: "height",
          direction: "top",
          directionStyle: "bottom",
          coordinate: "y",
        },
      },
    };
  return (
    (j.prototype.init = function () {
      this.update(!0, !1),
        this.onInit && "function" == typeof this.onInit && this.onInit();
    }),
    (j.prototype.update = function (a, b) {
      (a = a || !1),
        a &&
          ((this.min = h(this.$element[0].getAttribute("min"), 100)),
          (this.max = h(this.$element[0].getAttribute("max"), 1000)),
          (this.value = h(
            this.$element[0].value,
            Math.round(this.min + (this.max - this.min) / 2)
          )),
          (this.step = h(this.$element[0].getAttribute("step"), 1))),
        (this.handleDimension = g(
          this.$handle[0],
          "offset" + i(this.DIMENSION)
        )),
        (this.rangeDimension = g(this.$range[0], "offset" + i(this.DIMENSION))),
        (this.maxHandlePos = this.rangeDimension - this.handleDimension),
        (this.grabPos = this.handleDimension / 2),
        (this.position = this.getPositionFromValue(this.value)),
        this.$element[0].disabled
          ? this.$range.addClass(this.options.disabledClass)
          : this.$range.removeClass(this.options.disabledClass),
        this.setPosition(this.position, b);
    }),
    (j.prototype.handleDown = function (a) {
      if (
        (this.$document.on(this.moveEvent, this.handleMove),
        this.$document.on(this.endEvent, this.handleEnd),
        !(
          (" " + a.target.className + " ")
            .replace(/[\n\t]/g, " ")
            .indexOf(this.options.handleClass) > -1
        ))
      ) {
        var b = this.getRelativePosition(a),
          c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
          d = this.getPositionFromNode(this.$handle[0]) - c,
          e =
            "vertical" === this.orientation
              ? this.maxHandlePos - (b - this.grabPos)
              : b - this.grabPos;
        this.setPosition(e),
          b >= d && b < d + this.handleDimension && (this.grabPos = b - d);
      }
    }),
    (j.prototype.handleMove = function (a) {
      a.preventDefault();
      var b = this.getRelativePosition(a),
        c =
          "vertical" === this.orientation
            ? this.maxHandlePos - (b - this.grabPos)
            : b - this.grabPos;
      this.setPosition(c);
    }),
    (j.prototype.handleEnd = function (a) {
      a.preventDefault(),
        this.$document.off(this.moveEvent, this.handleMove),
        this.$document.off(this.endEvent, this.handleEnd),
        this.$element.trigger("change", { origin: this.identifier }),
        this.onSlideEnd &&
          "function" == typeof this.onSlideEnd &&
          this.onSlideEnd(this.position, this.value);
    }),
    (j.prototype.cap = function (a, b, c) {
      return b > a ? b : a > c ? c : a;
    }),
    (j.prototype.setPosition = function (a, b) {
      var c, d;
      void 0 === b && (b = !0),
        (c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos))),
        (d = this.getPositionFromValue(c)),
        (this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px"),
        (this.$handle[0].style[this.DIRECTION_STYLE] = d + "px"),
        this.setValue(c),
        (this.position = d),
        (this.value = c),
        b &&
          this.onSlide &&
          "function" == typeof this.onSlide &&
          this.onSlide(d, c);
    }),
    (j.prototype.getPositionFromNode = function (a) {
      for (var b = 0; null !== a; ) (b += a.offsetLeft), (a = a.offsetParent);
      return b;
    }),
    (j.prototype.getRelativePosition = function (a) {
      var b = i(this.COORDINATE),
        c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
        d = 0;
      return (
        "undefined" != typeof a["page" + b]
          ? (d = a["client" + b])
          : "undefined" != typeof a.originalEvent["client" + b]
          ? (d = a.originalEvent["client" + b])
          : a.originalEvent.touches &&
            a.originalEvent.touches[0] &&
            "undefined" != typeof a.originalEvent.touches[0]["client" + b]
          ? (d = a.originalEvent.touches[0]["client" + b])
          : a.currentPoint &&
            "undefined" != typeof a.currentPoint[this.COORDINATE] &&
            (d = a.currentPoint[this.COORDINATE]),
        d - c
      );
    }),
    (j.prototype.getPositionFromValue = function (a) {
      var b, c;
      return (
        (b = (a - this.min) / (this.max - this.min)),
        (c = Number.isNaN(b) ? 0 : b * this.maxHandlePos)
      );
    }),
    (j.prototype.getValueFromPosition = function (a) {
      var b, c;
      return (
        (b = a / (this.maxHandlePos || 1)),
        (c =
          this.step * Math.round((b * (this.max - this.min)) / this.step) +
          this.min),
        Number(c.toFixed(this.toFixed))
      );
    }),
    (j.prototype.setValue = function (a) {
      (a !== this.value || "" === this.$element[0].value) &&
        this.$element.val(a).trigger("input", { origin: this.identifier });
    }),
    (j.prototype.destroy = function () {
      this.$document.off("." + this.identifier),
        this.$window.off("." + this.identifier),
        this.$element
          .off("." + this.identifier)
          .removeAttr("style")
          .removeData("plugin_" + k),
        this.$range &&
          this.$range.length &&
          this.$range[0].parentNode.removeChild(this.$range[0]);
    }),
    (a.fn[k] = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          e = d.data("plugin_" + k);
        e || d.data("plugin_" + k, (e = new j(this, b))),
          "string" == typeof b && e[b].apply(e, c);
      });
    }),
    "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
  );
});
$(function () {
  $('input[type="range"]').rangeslider({
    polyfill: false,
    onInit: function () {
      $(".header .pull-right").text($('input[type="range"]').val() + "$");
    },
    onSlide: function (position, value) {
      //console.log('onSlide');
      //console.log('position: ' + position, 'value: ' + value);
      $(".header .pull-right").text(value + "$");
    },
    onSlideEnd: function (position, value) {
      //console.log('onSlideEnd');
      //console.log('position: ' + position, 'value: ' + value);
    },
  });
});

// ===================== VALIDATION ===========================//

// Default tab
$(".tab").css("display", "none");
$("#tab-1").css("display", "block");

function run(hideTab, showTab) {
  if (hideTab < showTab) {
    // If not press previous button
    // Validation if press next button
    var currentTab = 0;
    x = $("#tab-" + hideTab);
    y = $(x).find("input");
    for (i = 0; i < y.length; i++) {
      if (y[i].value == "") {
        $(y[i]).css("background", "#ffdddd");
        return false;
      }
    }
  }

  // Progress bar
  for (i = 1; i < showTab; i++) {
    $("#step-" + i).css("opacity", "1");
  }

  // Switch tab
  $("#tab-" + hideTab).css("display", "none");
  $("#tab-" + showTab).css("display", "block");
  $("input").css("background", "#fff");
}
