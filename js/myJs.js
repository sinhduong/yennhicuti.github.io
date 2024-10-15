const textConfig = {
  text1: "Chào cậu! :D",
  text2: "Tớ có một điều muốn hỏi, cậu nhớ trả lời thật lòng nha.",
  text3: "Cậu có muốn làm quen với tớ không? ._.",
  text4: "Nếu cậu thoát ra mà không trả lời thì tức là đồng ý rùi đó nha :v",
  text5: "Cậu đùa à???",
  text6: "Tớ cũng muốn làm quen với cậu <3",
  text7: "Lý do cậu muốn làm quen với tớ đi :vvvv",
  text8: "Gửi cho tớ <3",
  text9: "Vì cậu trông dễ thương quá trời quá đất",
  text10: "Tớ biết mà ^^ Cảm ơn cậu nhiều nha",
  text11:
    "Tối nay mình có thể chơi liên quân cùng khum? Còn giờ thì mình chờ tin nhắn của cậu nha!",
  text12: "Được thôi, nhắn tin cho cậu ngay <3",
};

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/cuteCat.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }

  // move random button position
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    var x, y;
    if (screen.width <= 600) {
      x = Math.random() * 300;
      y = Math.random() * 500;
    } else {
      x = Math.random() * 500;
      y = Math.random() * 500;
    }
    $("#no").css({
      left: x + "px",
      top: y + "px",
    });
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason' placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#fe8a71",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            // Chuyển hướng người dùng tới Messenger với tin nhắn sẵn
            window.location.href =
              "https://m.me/100039216303261?ref=T%C6%A1%20c%C5%A9ng%20th%C3%ADch%20c%E1%BA%ADu!";
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});
