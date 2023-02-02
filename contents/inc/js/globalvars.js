
var totalPage = 8; // 차시 페이지 수 정보를 담고 있는 변수

var subject = "과정명: 교실 속 STEAM 교육 입문과정 고교, 차시명: 04. STEAM 수업 구성"; // 과정명 정보를 담고 있는 변수

var pages = [ // 파일명, 카테고리명, 페이지명의 정보를 담고 있는 변수 배열
	{pg:1, url:"04_01.html", category:"수업준비", text:"INTRO"},
	{pg:2, url:"04_02.html", category:"수업준비", text:"오늘의 주제"},
	{pg:3, url:"04_03.html", category:"학습하기", text:"STEAM 수업, 어떻게 시작할까?"},
	{pg:4, url:"04_04.html", category:"학습하기", text:"STEAM 수업 계획"},
	{pg:5, url:"04_05.html", category:"학습하기", text:"STEAM 수업 실행"},
	{pg:6, url:"04_06.html", category:"수업마무리", text:"퀴즈"},
	{pg:7, url:"04_07.html", category:"수업마무리", text:"핵심정리"},
	{pg:8, url:"04_08.html", category:"수업마무리", text:"Outro"}
];

document.title = pages[currentPage-1].text;
