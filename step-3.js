// 1. 초기 배열을 구성한다. (6개 객체 내 3X3 배열 구성)
var test = {
    arr0 : ["1","2","3"],
    arr1 : ["4","5","6"],
    arr2 : ["7","8","9"]
};
var surfUp = {
    arr0 : ["B","B","B"],
    arr1 : ["B","B","B"],
    arr2 : ["B","B","B"] 
};
var surfDown = {
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

var answer = [];

// 2. 초기 상태를 출력한다.(상태 출력 객체) 
var output = {
    totalId : ["Up","Left","Front","Right","Back","Down"],
    totalSurf : [surfUp, surfLeft, surfFront, surfRight, surfBack, surfDown],
    get : function(id){ //결과 값을 나타낼 때마다 'id'를 html에서 불러오는게 효율적일까..??(vs 전역변수 사용 시)
        var divArr = [];
        for(var i = 0; i < this.totalId.length; i++){
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
    },
    printEnd : function(){
        var outputEnd = document.getElementById("result");
        outputEnd.innerHTML = "게임이 종료 되었습니다."
    },
    // 추가구현3. 모든 면을 맞추면 축하 메시지와 함께 프로그램을 자동 종료(getAnswer,checkAnswer,printSuccess,result)
    getAnswer : function(){
        for (var i = 0; i < this.totalSurf.length; i++){
            var a = [];
            a.push(this.totalSurf[i].arr0.join(" "));
            a.push(this.totalSurf[i].arr1.join(" "));
            a.push(this.totalSurf[i].arr2.join(" "));
            answer.push(a);
        }
        return answer;
    },
    checkAnswer : function(vsValue){
        result = true;
        for(var i = 0; i < 6; i++){
            for(var j = 0; j < 3; j++){
                if(answer[i][j] != vsValue[i][j])
                result = false;
            }
        }
        return result;
    },
    printSuccess : function(){
        var outputEnd = document.getElementById("result");
        outputEnd.innerHTML = "축하합니다!! 성공하였습니다!!"
    },
    firstScreen : function(){
        var id = this.get(this.totalId);
        var resultStr = this.arrToStr(this.totalSurf);
        this.printStr(id, resultStr);
    },
    result : function(){
        var id = this.get(this.totalId);
        var resultStr = this.arrToStr(this.totalSurf);
        var checkResult = this.checkAnswer(resultStr);
        if(checkResult === true){
            time.updateTime();
            this.printSuccess();
        } else {
            this.printStr(id, resultStr);
        };
    }
};

// 3. 상태 변경 동작을 입력 받는다.(한 줄 입력 명령 구현(조건)과 함께 html 구현하는 김에 button 구성 해보기.)
// 3-1. btn 구성 및 연결(html,js)
// 3-2. input 창 구성 및 연결
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
// v추가구현1. 프로그램 종료 시 경과 시간 출력
var time = {
    startTime : 0,
    x : setInterval(this.updateTime,50),
    start : function(){
        this.startTime = Date.now();
    },
    updateTime : function(){
        var gameTime = document.getElementById("time");
        var now = Date.now() - this.startTime
        var sec = now / 1000;
        gameTime.innerHTML = "경과시간 : " + sec + " s";
    },
}
// 4. 입력 받은 조건을 구동한다.(큐브 작동에 대한 코드 규현)
// 4-1. 조작 면에 적용되는 움직임 구현
var cubeMoveParts = {
    totalArr : ["arr0","arr1","arr2"],

    mainTurn : function(obj){
        var getObj = {
            arr0 : [],
            arr1 : [],
            arr2 : []
        };
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
               getObj[this.totalArr[i]].push(obj[this.totalArr[i]][j]);
            }
        };
        for(var k = 0; k < 3; k++){
            for(var l = 0; l < 3; l++){
                obj[this.totalArr[2-l]][k] = getObj[this.totalArr[k]][l];
            }
        };
        return obj;
    },
    mainTurnRev : function(obj){
        var getObj = {
            arr0 : [],
            arr1 : [],
            arr2 : []
        };
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
               getObj[this.totalArr[i]].push(obj[this.totalArr[i]][j]);
            }
        };
        for(var k = 0; k < 3; k++){
            for(var l = 0; l < 3; l++){
                obj[this.totalArr[l]][2-k] = getObj[this.totalArr[k]][l];
            }
        };
        return obj;
    },
    getRow : function(obj, num){ // num은 0(first row) 혹은 2(third row)를 입력.
        var getValue = obj[this.totalArr[num]]
        return getValue;
    },
    getColumn : function(obj, num){// num은 0(first column) 혹은 2(third column)를 입력.
        var getValue = [];
        for(i = 0; i < 3; i++){
            getValue.push(obj[this.totalArr[i]][num]);
        };
        return getValue;
    },
    pushRow : function(valueFrom, objTo, num){ // num은 0(first row) 혹은 2(third row)를 입력.
        objTo[this.totalArr[num]] = valueFrom;
        return;
    },
    pushRowRev : function(valueFrom, objTo, num){ //역으로 넣어주는 경우 필요
        var result = [];
        while(valueFrom.length != 0){
            var getValue = valueFrom.pop();
            result.push(getValue);
        }
        objTo[this.totalArr[num]] = result;
        return;
    },
    pushColumn : function(valueFrom, objTo, num){ // num은 0(first row) 혹은 2(third row)를 입력.
        for(i = 0; i < 3; i++){
            objTo[this.totalArr[i]][num] = valueFrom[i];
        }
        return;
    },
    pushColumnRev : function(valueFrom, objTo, num){ //역으로 넣어주는 경우 필요
        for(i = 0; i < 3; i++){
            objTo[this.totalArr[i]][num] = valueFrom[2-i];
        }
        return;
    }
};

// 4-3. 6면 조작에 대한 함수 구현
var cubeMove = {
    reload : function(){
        window.location.reload();},
// v2. 큐브의 무작위 섞기 기능(random)
    random : function(){
        var cubeMoveArr = ["up","down","left","right","front","back","upRev","downRev","leftRev","rightRev","frontRev","backRev"];
        for (var i = 0; i < 20 ; i++){
            var ranNum = Math.floor(Math.random() * cubeMoveArr.length);
            this[cubeMoveArr[ranNum]]();
        }
        output.result();
        time.start();
        console.log("시작(랜덤 섞기)")
    },
    inputGo : function(){
        var message  = document.getElementById("message");
        message.innerHTML = "";
        var inputStr = input.get();
        var inputArr = input.strToArr(inputStr);
        var maxNum = inputArr.length;
        for(var i = 0; i < maxNum; i++){
           var a = inputArr.shift();
           if( a === "U"){
               this.up();
           } else if(a === "D"){
               this.down();
           } else if(a === "L"){
               this.left();
           } else if(a === "R"){
               this.right();
           } else if(a === "F"){
               this.front();
           } else if(a === "B"){
               this.back();
           } else if(a === "U'"){
               this.upRev();
           } else if(a === "D'"){
               this.downRev();
           } else if(a === "L'"){
               this.leftRev();
           } else if(a === "R'"){
               this.rightRev();
           } else if(a === "F'"){
               this.frontRev();
           } else if(a === "B'"){
               this.Rev();
           } else {
               message.innerHTML = "잘못된 값(형식)을 입력하였습니다.";
           }
        }
    },
    up : function(){
        cubeMoveParts.mainTurnRev(surfUp);

        var turn = [surfFront, surfLeft, surfBack, surfRight]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveParts.getRow(turn[i],0));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveParts.pushRow(getArr[j], turn[j], 0);
        }

        console.log("Up Move");
        output.result();
        return;
    },
    down : function(){
        cubeMoveParts.mainTurnRev(surfDown);

        var turn = [surfFront, surfRight, surfBack, surfLeft];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveParts.getRow(turn[i],2));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveParts.pushRow(getArr[j], turn[j], 2); 
        }
        console.log("Down Move");
        output.result();
        return;
    },
    left : function(){
        cubeMoveParts.mainTurnRev(surfLeft); 

        var turn = [surfUp, surfFront, surfDown, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            } else{
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){ 
            if(j <= 1){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 2);
            } else{
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 0);
            }
        }
        console.log("Left Move");
        output.result();
        return;
    },
    right : function(){
        cubeMoveParts.mainTurnRev(surfRight);

        var turn = [surfDown, surfFront, surfUp, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            } else{
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            }
        };

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j <= 1){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 0);
            } else{
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 2);
            }
        };
        console.log("Right Move");
        output.result();
        return;
    },
    front : function(){
        cubeMoveParts.mainTurnRev(surfFront); 

        var turn = [surfUp, surfRight, surfDown, surfLeft]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveParts.getRow(turn[i],2));
            } else if(i === 1){
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            } else if(i === 2){
                getArr.push(cubeMoveParts.getRow(turn[i],0));
            } else {
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 0);
            } else if(j === 1){
                cubeMoveParts.pushRowRev(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 2);
            } else{
                cubeMoveParts.pushRowRev(getArr[j], turn[j], 2);
            }
        }

        console.log("Front Move");
        output.result();
        return;
    },
    back : function(){
        cubeMoveParts.mainTurnRev(surfBack); 

        var turn = [surfUp, surfLeft, surfDown, surfRight]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveParts.getRow(turn[i],0));
            } else if(i === 1){
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            } else if(i === 2){
                getArr.push(cubeMoveParts.getRow(turn[i],2));
            } else {
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 0);
            } else if(j === 1){
                cubeMoveParts.pushRow(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 2);
            } else{
                cubeMoveParts.pushRow(getArr[j], turn[j], 0);
            }
        }

        console.log("Back Move");
        output.result();
        return;
    },
    upRev : function(){
        cubeMoveParts.mainTurn(surfUp);

        var turn = [surfFront, surfRight, surfBack, surfLeft];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveParts.getRow(turn[i],0));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveParts.pushRow(getArr[j], turn[j], 0);
        }
        console.log("Up Reverse Move");
        output.result();
        return;
    },
    downRev : function(){
        cubeMoveParts.mainTurn(surfDown);

        var turn = [surfFront, surfLeft, surfBack, surfRight];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveParts.getRow(turn[i],2));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveParts.pushRow(getArr[j], turn[j], 2);
        }
        console.log("Down Reverse Move");
        output.result();
        return;
    },
    leftRev : function(){
        cubeMoveParts.mainTurn(surfLeft);

        var turn = [surfDown, surfFront, surfUp, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            } else{
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            }
        };

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j <= 1){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 2);
            } else{
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 0);
            }
        };
        console.log("Left Reverse Move");
        output.result();
        return;
    },

    rightRev : function(){
        cubeMoveParts.mainTurn(surfRight);

        var turn = [surfUp, surfFront, surfDown, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            } else{
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j <= 1){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 0);
            } else{
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 2);
            }
        }
        console.log("Right Reverse Move");
        output.result();
        return;
    },
    frontRev : function(){
        cubeMoveParts.mainTurn(surfFront); 

        var turn = [surfUp, surfLeft, surfDown, surfRight]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveParts.getRow(turn[i],2));
            } else if(i === 1){
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            } else if(i === 2){
                getArr.push(cubeMoveParts.getRow(turn[i],0));
            } else {
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 2);
            } else if(j === 1){
                cubeMoveParts.pushRow(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveParts.pushColumnRev(getArr[j], turn[j], 0);
            } else{
                cubeMoveParts.pushRow(getArr[j], turn[j], 2);
            }
        }

        console.log("Front Reverse Move");
        output.result();
        return;
    },
    backRev : function(){
        cubeMoveParts.mainTurn(surfBack); 

        var turn = [surfUp, surfRight, surfDown, surfLeft]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveParts.getRow(turn[i],0));
            } else if(i === 1){
                getArr.push(cubeMoveParts.getColumn(turn[i],2));
            } else if(i === 2){
                getArr.push(cubeMoveParts.getRow(turn[i],2));
            } else {
                getArr.push(cubeMoveParts.getColumn(turn[i],0));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 2);
            } else if(j === 1){
                cubeMoveParts.pushRowRev(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveParts.pushColumn(getArr[j], turn[j], 0);
            } else{
                cubeMoveParts.pushRowRev(getArr[j], turn[j], 0);
            }
        }

        console.log("Back Reverse Move");
        output.result();
        return;
    },
    quit :function(){
        // clearInterval(x);
        time.updateTime();
        output.printEnd();
        console.log("게임이 종료 되었습니다.");
    }

}
// 5. 변동된 조건을 출력한다. (html 에 text 형태로 구현.)

var main = function(){
    output.firstScreen();
    output.getAnswer();
}
main();