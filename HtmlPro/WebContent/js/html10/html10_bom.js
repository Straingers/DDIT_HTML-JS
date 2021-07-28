/**
 * 
 */
var pop;
function proc() {
	pop = window.open("http://www.google.com");
// 	pop = open("http://www.google.com"); // 생략 가능
}
function proc2() {
	pop.close();
}
function showMsg() {
	window.setTimeout(alertMsg, 3000);
// 	setTimeout(); // 생략 가능
	
	window.setTimeout(function() {
		alert("왜 이래유~");
	}, 5000)
}
function alertMsg() {
	alert("타이머 썼어유~")
}
function changeBgColor(){
	setInterval(changeColor, 1000);
}
function changeColor(){
	//랜덤으로 색을 만들어서 p태그의 배경을 넣어주기
	//1.랜덤 색 뽑기
	var r = 0, g = 0, b = 0;
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	//2.p태그에 배경색주기
	document.getElementById("body").style.backgroundColor 
	= "rgb("+ r +", " + g + ", " + b + ")";
}

