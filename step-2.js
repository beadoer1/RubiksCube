
//   1. 초기 배열을 구성한다. (javadcript 3X3 배열 구성)
var cube = {
    arr0 : ["R", "R", "W"],
    arr1 : ["G", "C", "W"],
    arr2 : ["G", "B", "B"]
};
//   2. 초기 상태를 출력한다.
var output = function(){
    var cubeArea = document.getElementById('cubeArea');
    cubeArea.innerHTML = cube.arr0 + "<br>"+ cube.arr1 +"<br>"+ cube.arr2;
};
//   3. 상태 변경 동작을 입력 받는다.(console 명령 구현(조건)과 함께 html 구현하는 김에 button 구성도 하고 싶다.)
//   4. 입력 받은 조건을 구동한다.
//   4-1. 동작 객체 (왼쪽,오른쪽 이동(윗줄, 아랫줄), 위,아래 이동(왼줄, 오른줄))

var cubeMove = {
    left : function(arr){
        var getWord = arr.shift();
        arr.push(getWord);
        output();
    },
    right : function(arr){
        var getWord = arr.pop();
        arr.unshift(getWord);
        output();
    },
    up : function(obj, colNum){
        var getArr = [];
        var arrs = ["arr0","arr1","arr2"];

        for (var i = 0; i < 3; i++){
            getArr.push(obj[arrs[i]][colNum]);
        };
        obj["arr0"][colNum] = getArr[1];
        obj["arr1"][colNum] = getArr[2];
        obj["arr2"][colNum] = getArr[0];
        output();
    },
    down : function(obj, colNum){
        var getArr = [];
        var arrs = ["arr0","arr1","arr2"];

        for (var i = 0; i < 3; i++){
            getArr.push(obj[arrs[i]][colNum]);
        };
        obj["arr0"][colNum] = getArr[2];
        obj["arr1"][colNum] = getArr[0];
        obj["arr2"][colNum] = getArr[1];
        output();
    }
}
//   4-2. button 동작 함수 구
var tLeft = function(){
    cubeMove.left(cube.arr0);
};
var tRight = function(){
    cubeMove.right(cube.arr0);
};
var bRight = function(){
    cubeMove.right(cube.arr2);
};
var bLeft = function(){
    cubeMove.left(cube.arr2);
};
var rUp = function(){
    cubeMove.up(cube, 2);
};
var rDown = function(){
    cubeMove.down(cube, 2);
};
var lUp = function(){
    cubeMove.up(cube, 0);
};
var lDown = function(){
    cubeMove.down(cube, 0);
};

//   4-3. button 동작(종료 버튼)
var q = function(){
    cubeArea.innerHTML = "Bye~~!";
};

//   5. 변동된 조건을 출력한다. (html 에 text 형태 및 console 모두 뜨도록 하자.)
output();