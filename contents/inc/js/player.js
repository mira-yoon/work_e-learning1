$(document).ready(function() {

  // 스킵내비게이션
  var skip = "";
  skip += "<ul id='skip'>";
  skip += "<li><a href='#' class='skip' onClick='goPrevPage()' tabindex='1'>이전 페이지</a></li>";
  skip += "<li><a href='#' class='skip' onClick='goNextPage()' tabindex='1'>다음 페이지</a></li>";
  skip += "</ul>"
  $("body").prepend(skip);

  // 우측 클릭 방지
  $(".mov-box").on("contextmenu", function() {
    return false;
  });

  //로딩화면
  var loading = '<div class="loading">'
  loading += '<div class="loading-text"><i class="fa fa-spinner fa-spin"></i><span>Loading..</span></div>'
  loading += '</div>'
  $("#wrapper").append(loading)
  $(window).ready(function() {
    $(".loading").remove();
  });


  // 재생 큰버튼
  var bigPlay = '<div class="btn-big-play"><button tabindex="1"><span class="blind">재생하기</span></button></div>';
  if (currentPage !== 1 && currentPage !== totalPage) {
    $(".mov-box").append(bigPlay)

    // 타이틀
    var title = "<div class='title'>";
    title += "<h1><img src='img/ui/title.png' alt='"+subject+"' /></h1>";
    title += "</div>";
    $("#wrapper").prepend(title);
  }

  $(".btn-big-play").on('click', function() {
    $(this).fadeOut();
    player.play();
    $('footer').focus()
  });


  if ($(".mov-box video").length == 1) {
    player = document.getElementById("videoPlayer");

  } else {
    player = document.getElementById("audioPlayer");
  }


  player.addEventListener("canplay", function() {
    //총재생시간
    var alltime = player.duration;
    var alltimemin = Math.floor(alltime / 60);
    var alltimesec = Math.floor(alltime - (alltimemin * 60))
    if (alltimemin < 10) {
      alltimemin = "0" + alltimemin
    }

    if (alltimesec < 10) {
      alltimesec = "0" + alltimesec
    }

    alltimeTotal = alltimemin + ":" + alltimesec
    $(".all-time").html(alltimeTotal)
  });

  //현재 재생시간
  setInterval(function() {
    var nowtime = player.currentTime;
    var nowtimemin = Math.floor(nowtime / 60);
    var nowtimesec = Math.floor(nowtime - (nowtimemin * 60))
    if (nowtimemin < 10) {
      nowtimemin = "0" + nowtimemin
    }
    if (nowtimesec < 10) {
      nowtimesec = "0" + nowtimesec
    }
    nowtimeTotal = nowtimemin + ":" + nowtimesec

    var nowtime = player.currentTime;
    $(".now-time").html(nowtimeTotal);
  }, 1000)


  //비디오 재생
  $('.btn-play').on('click', function() {
    play();
  });

  // Enter 키로 비디오 재생
  document.querySelector('.btn-play').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      play();
    }
  });

  // space 키로 비디오 재생, 일시정지
  $(window).keypress(function(e) {
    switch (e.keyCode) {
      case 32:
        e.preventDefault();
        play();
        break;
    }
  });


  // 다시보기
  $(".btn-re").click(function() {
    replay();
  });

  // Enter 키로 다시보기
  document.querySelector('.btn-re').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      replay();
    }
  });

  // 자막 생성
  var subtitle = '<div class="subtitle"><span class="blind">자막 내용 영역</span><p tabindex="5"></p></div>';
  $("#wrapper").append(subtitle);
  var subclose = "<button class='btn-subtit-close fa fa-times-circle' onclick='subClose()' title='자막닫기' tabindex='5'><span class='blind'>자막닫기</span></button>";
  $(".subtitle").append(subclose);

  $(".btn-subtitle").on('click', function() {
    openSubtitle();
  });

  // Enter 키로 자막열기
  document.querySelector('.btn-subtitle').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      openSubtitle();
    }
  });

  $(".btn-subtit-close").on('blur', function(){
    subClose();
  });

  //동영상 진행바
  var progress = document.getElementById("bar");

  player.addEventListener("play", function() {
    setInterval(videoPro, 100)
    $('.btn-play').addClass("btn-pause");
    $('.btn-pause').attr("title","일시정지");
    $('.btn-pause').children("span").text("일시정지");
    $(".btn-big-play").fadeOut();
    removePageEnd();
  });


  //페이지끝 팝업창
  var lastQuiz = $(".mov-box").parent(".quiz-area").length == 1;
  var keyPoint = $(".mov-box").siblings(".key-point").length == 1;

  if (!lastQuiz && !keyPoint) {
    player.addEventListener("ended", function() {
      pageEnd();
    });
  } else {
    player.addEventListener("ended", function() {
      return false;
    });
  }

  player.addEventListener("pause", function() {
    clearInterval(videoPro)
    $('.btn-play').removeClass("btn-pause");
    $('.btn-play').attr("title","재생");
    $('.btn-play').children("span").text("재생");
    $(".btn-big-play").show();
  });


  //동영상 진행바 클릭이벤트
  progress.addEventListener('click', scrub);


  //사운드
  const ranges = document.getElementById('sound');
  ranges.addEventListener('change', handleRangeUpdate)
  ranges.addEventListener('mousemove', handleRangeUpdate)

  $('input[type=range]').on('input', function() {
    var val = $(this).val();
    $(this).css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + val + '%, #d5d4d3 ' + (val * 100) + '%, #d5d4d3 100%)');
    localStorage.setItem("soundrange", JSON.stringify(val));
  });


  //사운드 수치 로컬저장
  var soundVal = JSON.parse(localStorage.getItem('soundrange'));
  $('input[type=range]').attr("value", soundVal)
  if (soundVal == null) {
    player.volume = 0.5;
  } else {
    player.volume = soundVal;
  }

  $('#sound').val(soundVal)
  $('#sound').css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + soundVal + '%, #d5d4d3 ' + (soundVal * 100) + '%, #d5d4d3 100%)')


  //배속목록 열고 닫기
  $(".rate-area > a").click(function() {
    openRateUl();
  });

  $(".rate-area ul li:last-child a").on('blur', function(){
    $(".rate-area ul").hide();
    $(".rate-area > a").focus();
  });

  // Enter키로 배속목록 열고 닫기
  document.querySelector('.rate-area > a').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      openRateUl();
    }
  });

  //배속기능
  $(".rate-area li a").click(function() {
    var rate = $(this).text();
    $(".rate-area ul").hide();
    $(".rate-area span").text(rate);
    $(".rate-area > a").attr("title", rate+" 배속");

    player.playbackRate = rate;
    $(this).change(function() {
      player.play();
    });
    localStorage.setItem("rate", JSON.stringify(rate));
      $(".rate-area > a").focus();
  });

  // Enter키로 배속기능 작동
  $(".rate-area li a").on("keypress", function(e) {
    if (e.keyCode === 13) {
      var rate = $(this).text();
      $(".rate-area ul").hide();
      $(".rate-area span").text(rate);
      $(".rate-area > a").attr("title", rate+" 배속");

      player.playbackRate = rate;
      $(this).change(function() {
        player.play();
      });
      localStorage.setItem("rate", JSON.stringify(rate));
      $(".rate-area > a").focus();
    }
  });


  //배속수치 로컬저장
  var ratesave = JSON.parse(localStorage.getItem('rate'));
  $('input[type=range]').attr("value", soundVal)
  if (ratesave == null) {
    player.playbackRate = 1;
    $(".rate-area span").text("1.0");
    $(".rate-area > a").attr("title", "1.0 배속");

  } else {
    player.playbackRate = ratesave;
    $(".rate-area span").text(ratesave);
    $(".rate-area > a").attr("title", ratesave+" 배속");
  }

  $('html').click(function(e) {
    if (!$(e.target).is(".rate-area ul, .rate-area span")) {
      $(".rate-area ul").hide();
    }
  });

  // 음소거 버튼
  $(".btn-sound").click(function() {
    if (player.muted == true) {
      $(".btn-sound span").remove();
      player.muted = false;
    } else {
      $(this).append("<span></span>");
      player.muted = true;
    }
  });

  // Enter 키로 음소거 버튼 작동하기
  $(document).on('keypress', ".btn-sound", function(e) {
    if (e.keyCode === 13) {
      if (player.muted == true) {
        $(".btn-sound span").remove();
        player.muted = false;
      } else {
        $(this).append("<span></span>");
        player.muted = true;
      }
    }
  });
  
  var runningMap = '<div class="running-map">'
  runningMap += '<div class="run-box"><iframe src="map.html" title="러닝맵 영역"></iframe>'
  runningMap += '<button class="run-close" tabindex="4"><p class="blind">러닝맵 닫기</p><div class="close-mark"><span></span><span></span></div></button></div>'
  runningMap += '</div>'

  $(".icon-box a").one("click", function(e) {
    e.preventDefault();
    $("#wrapper").append(runningMap);
  });

  //러닝맵 열기
  $(".icon-box a").click(function(e) {
    e.preventDefault();
    $(".running-map").show();
  });

  // 러닝맵 닫기 
  $(document).on('click', ".run-close", function(){
    $(".running-map").hide();
    $(".icon-box a").focus();
  });

  // Enter 키로 러닝맵 닫기 
  $(document).on('keypress', ".run-close", function(e) {
    if (e.keyCode === 13) {
      $(".running-map").hide();
      $(".icon-box a").focus();
    }
  });

  // 마지막페이지
  if (currentPage == totalPage) {
    $("#next a").css({
      "background": "none",
      "pointer-events": "none"
    })
  }

  //끝까지 재생 후 다시 진행바 중간을 눌렀을 때 말풍선 사라짐
  $("#bar").click(function() {
    removePageEnd();
  })

  //말풍선 클릭시 사라짐
  $(document).on('click', ".pageEnd", function() {
    $(".pageEnd").remove();
  });


}); //document

function play() {
  if (player.paused == true) {
    player.play();
    $('.btn-play').addClass("btn-pause")
  } else {
    player.pause();
    $('.btn-play').removeClass("btn-pause")
  }
}

function replay() {
  player.currentTime = '0';
  player.play();
  $(".quiz-mov").show();
  $(".key-point").hide();
}

//자막열고닫기
function openSubtitle() {
  if($(".subtitle").is(":visible")) {
    $(".subtitle").removeClass("subtitle-on");
  } else {
    $(".subtitle").addClass("subtitle-on");
  }
}

// 자막닫기
function subClose() {
  $(".subtitle").removeClass("subtitle-on");
  $(".btn-subtitle").focus();
}


function videoPro() {
  const percent = (player.currentTime / player.duration) * 100 + "%";
  var progressBar = document.getElementById("progressBar")
  progressBar.style.width = percent
}

function scrub(e) {
  var progress = document.getElementById("bar");
  const scrubTime = parseFloat(e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

// 배속목록 열고 닫기
function openRateUl() {
  if($(".rate-area ul").is(":visible")) {
    $(".rate-area ul").hide();
    $(".rate-area > a").focus();
  } else {
    $(".rate-area ul").show();
  }
}


function handleRangeUpdate() {
  player.volume = this.value;
}

function pageEnd() {
  // 다음 말풍선
  var nextPage = '<button type="button" class="pageEnd" onClick="goNextPage()" tabindex="0">다음 버튼을 클릭 하세요. </button>'
  $(".mov-box").append(nextPage);
  if (currentPage == totalPage) {
    $(".pageEnd").addClass("lastPage");
    $(".pageEnd").text("마지막 페이지입니다.");
  }
}

function removePageEnd() {
  $(".pageEnd").remove();
}


function movSrc(){
  //동영상 주소 불러오기
  var local = true;
  var val = location.href.split("/");
  var curPage = val[val.length - 1].substr(0, 5);

  if(local == true){
    document.write("<source src='./movie/"+curPage+".mp4' type='video/mp4' />")
  } else{
    document.write("<source src='./movie/"+curPage+".mp4' type='video/mp4' />")
  }

}
