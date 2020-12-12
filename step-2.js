
//   1. 초기 배열을 구성한다. (javadcript 3X3 배열 구성)
var cube = {
    arr0 : ["R", "R", "W"],
    arr1 : ["G", "C", "W"],
    arr2 : ["G", "B", "B"]
};
//   2. 초기 상태를 출력한다.
var output = function(){
    var cubeArea = document.getElementById('cubeArea');
    var arrs = ["arr0", "arr1", "arr2"];
    var getStr = [];
    for (var i = 0; i < 3; i++){
        getStr.push(cube[arrs[i]].join(" "));
    }
    cubeArea.innerHTML = getStr[0] + "<br>"+ getStr[1] +"<br>"+ getStr[2];
};
//   3. 상태 변경 동작을 입력 받는다.(console 명령 구현(조건)과 함께 html 구현하는 김에 button 구성도 하고 싶다.)
//   3-1. button 구현 완료(html)
//   3-2. input 구현
var input = {
    get : function(){
        var inputValue = document.getElementById("input").value;
        return inputValue;
    },
    strToArr : function(str){
        var arr = str.split(" ");
        return arr;
    }
}
//   4. 입력 받은 조건을 구동한다.
//   4-1. 동작 객체 (왼쪽,오른쪽 이동(윗줄, 아랫줄), 위,아래 이동(왼줄, 오른줄))

var cubeMoveParts = {
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
//   4-2. button 동작 함수 구현
var cubeMove = {
    inputGo : function(){
        var message = document.getElementById("message");
        message.innerHTML = "";
        var orderStr = input.get();
        var orderArr = input.strToArr(orderStr);
        var maxNum = orderArr.length;
        for (var i = 0; i < maxNum; i++){
            var a = orderArr.shift();
            if(a === "U"){
                cubeMove.tLeft();
            } else if(a === "R"){
                cubeMove.rUp();
            } else if(a === "L"){
                cubeMove.lDown();
            } else if(a === "B"){
                cubeMove.bRight();
            } else if(a === "U'"){
                cubeMove.tRight();
            } else if(a === "R'"){
                cubeMove.rDown();
            } else if(a === "L'"){
                cubeMove.lUp();
            } else if(a === "B'"){
                cubeMove.bLeft();
            } else if(a === "Q"){
                cubeMove.q();
            } else{
                message.innerHTML = "잘못된 값(형식)을 입력하였습니다."
            }
        }
    },
    tLeft : function(){
        cubeMoveParts.left(cube.arr0);
        console.log("윗줄을 왼쪽으로 이동");
    },
    tRight : function(){
        cubeMoveParts.right(cube.arr0);
        console.log("윗줄을 오른쪽으로 이동");    
    },
    bRight : function(){
        cubeMoveParts.right(cube.arr2);
        console.log("아랫줄을 오른쪽으로 이동");    
    },
    bLeft : function(){
        cubeMoveParts.left(cube.arr2);
        console.log("아랫줄을 왼쪽으로 이동");
    },
    rUp : function(){
        cubeMoveParts.up(cube, 2);
        console.log("오른쪽 줄을 위로 이동");
    },
    rDown : function(){
        cubeMoveParts.down(cube, 2);
        console.log("오른쪽 줄을 아래로 이동");
    },
    lUp : function(){
        cubeMoveParts.up(cube, 0);
        console.log("왼쪽 줄을 위로 이동");
    },
    lDown : function(){
        cubeMoveParts.down(cube, 0);
        console.log("왼쪽 줄을 아래로 이동");
    },
    //   4-3. button 동작(종료 버튼)
    q : function(){
        cubeArea.innerHTML = "Bye~~!";
        console.log("종료");
    }
}

//   5. 변동된 조건을 출력한다. (html 에 text 형태 및 console 모두 뜨도록 하자.)
output();