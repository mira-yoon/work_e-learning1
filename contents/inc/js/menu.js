document.write("<div id='left-menu'>");
document.write("<button type='button' class='btn-menu btn-open' onClick='leftClose()' tabindex='2'>메뉴 열기</button>")
document.write("<div class='subject-title'>")
document.write("<div class='title-box'>")
document.write("<h3>INDEX</h3>")
document.write("<div class='list'>")
document.write("</div>")
document.write("</div>")
document.write("</div>")
document.write("<button type='button' class='btn-menu btn-close' onClick='leftClose()' tabindex='3' >메뉴 닫기</button>")
document.write("</div>");

function leftClose() {
  if ($("#left-menu").css("left") !== 0 + "px") {
    $("#left-menu").addClass("open");
  } else {
    $("#left-menu").removeClass("open");
    $(".btn-menu").focus();
  }
}

// 닫기 버튼이 포커스 아웃되면 메뉴 닫히기
$(".btn-close").on('blur', function(){
  $("#left-menu").removeClass("open");
  $(".btn-menu").focus();
});


var thisMain = this;
var indexOpenBtn;
var indexCloseBtn;
var indexTarget;
var indexStatus = "close";
var currentSco1;
currentSco1 = pages[currentPage - 1].text;
currentSco1 = currentSco1.replace(/<[a-z|/]+[^<>]*>/gi, '');

var MenuController = function () {
  var menuContent = $(".list");
  if (menuContent) {
    //menuContent.empty();

    //메뉴구성
    var menuString = "";
    var currentCategory = "";
    var currentText = "";


    for (var i = 0; i < pages.length; i++) {
      if (typeof (pages[i].category) == 'undefined' || pages[i].category == '' || pages[i].category == 'null')
        continue;

      // 카테고리 설정
      if (currentCategory != pages[i].category) {
        if (currentCategory != "")
          menuString += "</div>";
        currentCategory = pages[i].category;
        if (isCurrentCategory(i, currentPage) == true)
          menuString += "<div class='category'><a class='on'";
        else
          menuString += "<div class='category'><a";
        menuString += " href='#'>" + pages[i].category + "</a></div>";
      }

      // 페이지 설정
      if (currentText != pages[i].text) {
        currentText = pages[i].text;
        if (isCurrentText(i, currentPage) == true) {
          menuString += "<a class='link current' tabindex='3'";
        } else {
          menuString += "<a class='link' tabindex='3'";
        }
        menuString += " href='" + pages[i].url + "'>" + pages[i].text + "</a>";
      }
    }
    //		menuString += "</dl>";

    menuContent.append(menuString);
  }
};


function isCurrentCategory(index, currentPage) { //로컬용에서 카테고리 설정 정의 함수
  var currentCategory = "";
  for (var i = currentPage - 1; i > -1; i--) {
    if (typeof (pages[i].category) == 'undefined' || pages[i].category == '' || pages[i].category == 'null')
      continue;
    else {
      currentCategory = pages[i].category;
      break;
    }
  }

  for (var j = index; j > -1; j--) {
    if (typeof (pages[i].category) == 'undefined' || pages[i].category == '' || pages[i].category == 'null')
      continue;
    else {
      if (pages[j].category == currentCategory)
        return true;
      else
        return false;
    }
  }
  return false;
}



function isCurrentText(index, currentPage) { //로컬용에서 페이지 설정 정의 함수
  var currentText = "";
  for (var i = currentPage - 1; i > -1; i--) {
    if (typeof (pages[i].text) == 'undefined' || pages[i].text == '' || pages[i].text == 'null')
      continue;
    else {
      currentText = pages[i].text;
      break;
    }
  }

  for (var j = index; j > -1; j--) {
    if (typeof (pages[i].text) == 'undefined' || pages[i].text == '' || pages[i].text == 'null')
      continue;
    else {
      if (pages[j].text == currentText)
        return true;
      else
        return false;
    }
  }
  return false;
}



function isCurrentPage(index, currentPage) { // 로컬용에서 페이지 이동 정의 함수
  var maxPage = currentPage - 1;

  if (index == maxPage) {
    return true;
  } else if (maxPage < index)
    return false;
  else { // if (index < current contentIdPage)
    var countFarFromCurrentPage = 0;
    for (var i = index; i < currentPage; i++) {
      if (typeof (pages[i].text) == 'undefined' || pages[i].text == '' || pages[i].text == 'null')
        continue;
      else
        countFarFromCurrentPage++;
    }
  }
  if (countFarFromCurrentPage > 1)
    return false;
  return true;
}

function menuInit() { // 로컬용에서 노출되는 Index 메뉴 표출
  var menuController = new MenuController();
}

$(document).ready(function () {
  menuInit();
  isCurrentCategory()

  // 메뉴 활성화
  var currIndex = $("#left-menu a.current").index()
  var lastIndex = $("#left-menu a:last-child").index()

  if (currIndex >= 1) {
    $("#left-menu span").addClass("on")
  }
  if (currIndex == lastIndex) {
    $("#left-menu span").removeClass("on")
  }

});