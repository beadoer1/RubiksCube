// 1. 초기 배열을 구성한다. (6개 객체 내 3X3 배열 구성)
var test = {
    arr0 : ["1","2","3"],
    arr1 : ["4","5","6"],
    arr2 : ["7","8","9"]
};
var surfTop = {
    arr0 : ["B","B","B"],
    arr1 : ["B","B","B"],
    arr2 : ["B","B","B"] 
};
var surfBottom = {
    arr0 : ["R","R","R"],
    arr1 : ["R","R","R"],
    arr2 : ["R","R","R"]     
};
var surfLeft = {
    arr0 : ["W","W","W"],
    arr1 : ["W","W","W"],
    arr2 : ["W","W","W"]     
};
var surfRight = {
    arr0 : ["G","G","G"],
    arr1 : ["G","G","G"],
    arr2 : ["G","G","G"]     
};
var surfFront = {
    arr0 : ["O","O","O"],
    arr1 : ["O","O","O"],
    arr2 : ["O","O","O"]
};
var surfBack = {
    arr0 : ["Y","Y","Y"],
    arr1 : ["Y","Y","Y"],
    arr2 : ["Y","Y","Y"]
};

// 1-2. 배열 출력 및 반복문에 적용할 List를 만든다.
var totalId = ["Top","Left","Front","Right","Back","Bottom"];
var totalSurf = [surfTop, surfLeft, surfFront, surfRight, surfBack, surfBottom];
var totalArr = ["arr0","arr1","arr2"];

// 2. 초기 상태를 출력한다.(상태 출력 객체) 
var output = {
    get : function(id){
        var divArr = [];
        for(var i = 0; i < totalId.length; i++){
            divArr.push(document.getElementById(id[i]));
        }
        return divArr;
    },
    arrToStr : function(surfArr){
        var strArr = [];
        for (var i = 0; i < surfArr.length; i++){
            var a = [];
            a.push(surfArr[i].arr0.join(" "));
            a.push(surfArr[i].arr1.join(" "));
            a.push(surfArr[i].arr2.join(" "));
            strArr.push(a);
        }
        return strArr;
    },
    printStr : function(outArr, strArr){
        for(var i = 0; i < outArr.length; i++){
            outArr[i].innerHTML = strArr[i][0] + "<br>" + strArr[i][1] + "</br>" + strArr[i][2]
        }
        return;
    }
};
// 3. 상태 변경 동작을 입력 받는다.(한 줄 입력 명령 구현(조건)과 함께 html 구현하는 김에 button 구성 해보기.)
// 4. 입력 받은 조건을 구동한다.(큐브 작동에 대한 코드 규현)
// 4-1. 조작 면에 적용되는 움직임 구현
var cubeMoveMain = {
    turnLeft : function(obj){
        var getObj = [];
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
               getObj.push(obj[totalArr[i]][j]);
            }
        };
        var resultObj = {
            arr0 : [getObj[2],getObj[5],getObj[8]],
            arr1 : [getObj[1],getObj[4],getObj[7]],
            arr2 : [getObj[0],getObj[3].getObj[6]]
        };
        return resultObj;
    },
    turnRight : function(obj){
        var getObj = [];
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
               getObj.push(obj[totalArr[i]][j]);
            }
        };
        var resultObj = {
            arr0 : [getObj[6],getObj[3],getObj[0]],
            arr1 : [getObj[7],getObj[4],getObj[1]],
            arr2 : [getObj[8],getObj[5],getObj[2]]
        };
        return resultObj;
    }
};
// 4-2. 조작 면 주변 4면에 적용되는 움직임을 구현
var cubeMoveSide = {
    getFirstRow : function(){

    },    
    getThirdtRow : function(){

    },
    getFirstColumn : function(){

    },    
    getThirdColumn : function(){

    },
    pushFirstRow : function(){

    },
    pushThirdRow : function(){

    },
    pushFirstColumn : function(){

    },
    pushThirdColumn : function(){

    }
};
// 4-3. 6면 조작에 대한 함수 구현
var cubeMove = {
    top : function(){
        console.log("Top Move");
    },
    bottom : function(){
        console.log("Bottom Move");
    },
    left : function(){
        console.log("Left Move");
    },
    right : function(){
        console.log("Right Move");
    },
    front : function(){
        console.log("Front Move");
    },
    back : function(){
        console.log("Back Move");
    },
    topRev : function(){
        console.log("Top Reverse Move");
    },
    bottomRev : function(){
        console.log("Bottom Reverse Move");
    },
    leftRev : function(){
        console.log("Left Reverse Move");
    },
    rightRev : function(){
        console.log("Right Reverse Move");
    },
    frontRev : function(){
        console.log("Front Reverse Move");
    },
    backRev : function(){
        console.log("Back Reverse Move");
    }
}
var quitBtn = {
    quit : function(){
        console.log("게임이 종료 되었습니다.")
    }
}
// 5. 변동된 조건을 출력한다. (html 에 text 형태로 구현.)
var main = function(){
    var id = output.get(totalId);
    var resultStr = output.arrToStr(totalSurf);
    output.printStr(id, resultStr);
}

main();