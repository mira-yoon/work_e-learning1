

// footer html
document.write("<footer>");

document.write("<img src='img/inc/logo.png' class='inc-logo' alt='한국과학창의재단' />");
document.write("<div id='lms-area'>");
document.write("<div class='icon-box'>")
document.write("<a class='fa fa-file-text-o btn-map' href='#none' title='러닝맵 : 레이어 팝업' class='support-1' tabindex='4'>러닝맵</a>");
document.write("</div>")
document.write("</div>");

document.write("<div id='videoTime'>");
document.write("<div id='bar' class='progress'><div id='progressBar' class='progress-bar' style='width:0%;'></div></div>")
document.write("<div class='time-box'>");
document.write("<span class='now-time'>00:00</span>");
document.write("<span>/</span>");
document.write("<span class='all-time'>00:00</span>");
document.write("</div>");
document.write("</div>");

document.write("<div id='videoButton'>");
document.write("<a class='btn-play' title='재생' tabindex='5'><span>재생</span></a>")
document.write("<a class='btn-re' title='다시보기' tabindex='5'><span>다시보기</span></a>")
document.write("<a class='btn-subtitle' title='자막' tabindex='5'><span>자막</span></a>")
document.write("</div>");

document.write("<div class='rate-area'>");
document.write("<a id='rate' title='배속' tabindex='6'>");
document.write("<span>1.0</span>");
document.write("<em>배속</em>");
document.write("</a>");
document.write("<ul>")
document.write("<li title='2.0 배속'><a tabindex='6'>2.0</a> <em>배속</em></li>");
document.write("<li title='1.5 배속'><a tabindex='6'>1.5</a> <em>배속</em></li>");
document.write("<li title='1.0 배속'><a tabindex='6'>1.0</a> <em>배속</em></li>");
document.write("<li title='0.5 배속'><a tabindex='6'>0.5</a> <em>배속</em></li>");
document.write("</ul>")
document.write("</div>");



document.write("<div id='videoSound'>");
document.write("<a class='btn-sound' title='음소거' tabindex='7'><span class='blind'>음소거</span></a>")
document.write("<input type='range' name='volume' id='sound' min='0' max='1' step='0.05' title='음량' tabindex='7' />");
document.write("</div>");



document.write("<div id='paging'>");
document.write("<div id='prev'><a href='#!' title='이전 페이지' onClick='goPrevPage()' id='lmsGoPrevPage' tabindex='8'>이전 페이지</a></div>");
document.write("<div id='page_num'><span id='current_page'></span>/<span id='total_page'></span></div>");
document.write("<div id='next'><a href='#!' title='다음 페이지' onClick='goNextPage()' id='lmsGoNextPage' tabindex='8'>다음 페이지</a></div>");
document.write("</div>");

document.write("</footer>");








var currentPageContent = $("#current_page");// 현재페이지 변수값

//현재페이지가 한자리 일 경우 앞에 0을 붙여주고 아닌 경우 그대로 사용
//currentPage는 차시별 HTML 스크립트의 현재 페이지 값
if(currentPageContent){
	currentPageContent.empty();
	if(currentPage > 9)
		currentPageContent.append(currentPage);
	else
		currentPageContent.append("0"+currentPage);
}



var totalPageContent = $("#total_page");//전체 페이지 변수값

//전체페이지 수가 한자리일 경우 앞에 0을 붙여주고 아닌 경우 그대로 사용
//totalPage는 차시별 HTML 스크립트의 전체 페이지 값
if(totalPageContent){
	totalPageContent.empty();
	if(totalPage > 9)
		totalPageContent.append(totalPage);
	else
		totalPageContent.append("0"+totalPage);
}


//이전 페이지로 이동하는 함수
//currentPage는 차시별 HTML 스크립트의 현재 페이지 값
function goPrevPage() { // 로컬용에서 이전 화면으로 이동 설정 정의 함수
	if(currentPage == 1)
		alert('첫 페이지 입니다.');

	presentPageIndex = currentPage - 1;
	document.location = pages[presentPageIndex - 1].url;
}


//다음 페이지로 이동하는 함수
//currentPage는 차시별 HTML 스크립트의 현재 페이지 값
//totalPage는 차시별 HTML 스크립트의 전체 페이지 값
function goNextPage() { // 로컬용에서 다음 화면으로 이동 설정 정의 함수
	if(currentPage == totalPage)
		alert('마지막 페이지 입니다.');

	presentPageIndex = currentPage - 1;
	document.location = pages[presentPageIndex + 1].url;
}



function runLearingMap() {
	if($("#map").css("display") == "none")
		$("#map").show();
	else
		$("#map").hide();
}

function closeLearningMap() {
	$("#map").hide();
}


// 팝업창 호출 함수
function showPopupChapter() {
	if (currentPage == totalPage) {
		// playAudio('nextaudio');
		$('#next_btn_end').show();
		$("#next_btn_end").click(function() {
			$(this).hide();
		});
	} else {
		// playAudio('nextaudio');
		$('#next_btn_start').show();
		$("#next_btn_start").click(function() {
			$(this).hide();
		});
	}
}


