
//   1. 초기 배열을 구성한다. (javadcript 3X3 배열 구성)
var topArr = ["R", "R", "W"];
var middleArr = ["G", "C", "W"];
var bottomArr = ["G", "B", "B"];

//   2. 초기 상태를 출력한다.
var cube = document.getElementById('cube');
var output = function(){
    cube.innerHTML = topArr + "<br>"+ middleArr +"<br>"+ bottomArr;
}
output();

//   3. 상태 변경 동작을 입력 받는다.(console 명령 구현(조건)과 함께 html 구현하는 김에 button 구성도 하고 싶다.)
//   4. 입력 받은 조건을 구동한다.
//   4-1. button 동작(윗줄, 아랫줄)
var uLeft = function(){
    var getWord = topArr.shift();
    topArr.push(getWord);
    output();
};
var uRight = function(){
    var getWord = topArr.pop();
    topArr.unshift(getWord);
    output();
};
var bRight = function(){
    var getWord = bottomArr.pop();
    bottomArr.unshift(getWord);
    output();
};
var bLeft = function(){
    var getWord = bottomArr.shift();
    bottomArr.push(getWord);
    output();
};

//   4-2. button 동작(오른쪽, 왼쪽)
var rUp = function(){
    var getWord1 = topArr.pop();
    var getWord2 = middleArr.pop();
    var getWord3 = bottomArr.pop();
    topArr.push(getWord2);
    middleArr.push(getWord3);
    bottomArr.push(getWord1);
    output();
};
var rDown = function(){
    var getWord1 = topArr.pop();
    var getWord2 = middleArr.pop();
    var getWord3 = bottomArr.pop();
    topArr.push(getWord3);
    middleArr.push(getWord1);
    bottomArr.push(getWord2);
    output();
};
var lUp = function(){
    var getWord1 = topArr.shift();
    var getWord2 = middleArr.shift();
    var getWord3 = bottomArr.shift();
    topArr.unshift(getWord2);
    middleArr.unshift(getWord3);
    bottomArr.unshift(getWord1);
    output();
};
var lDown = function(){
    var getWord1 = topArr.shift();
    var getWord2 = middleArr.shift();
    var getWord3 = bottomArr.shift();
    topArr.unshift(getWord3);
    middleArr.unshift(getWord1);
    bottomArr.unshift(getWord2);
    output();
};
//   4-3. button 동작(종료 버튼)
var q = function(){
    cube.innerHTML = "Bye~~!";
}

//   5. 변동된 조건을 출력한다. (html 에 text 형태 및 console 모두 뜨도록 하자.)
//   -> 버튼에 적용 완료