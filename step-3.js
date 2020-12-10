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
    },
    result : function(){
        var id = output.get(totalId);
        var resultStr = output.arrToStr(totalSurf);
        output.printStr(id, resultStr);
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
        Obj = {
            arr0 : [getObj[2],getObj[5],getObj[8]],
            arr1 : [getObj[1],getObj[4],getObj[7]],
            arr2 : [getObj[0],getObj[3],getObj[6]]
        };
        return Obj;
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
    getRow : function(obj, num){ // num은 0(first row) 혹은 2(third row)를 입력.
        var getValue = obj[totalArr[num]]
        return getValue;
    },
    getColumn : function(obj, num){// num은 0(first column) 혹은 2(third column)를 입력.
        var getValue = [];
        for(i = 0; i < 3; i++){
            getValue.push(obj[totalArr[i]][num]);
        };
        return getValue;
    },
    pushRow : function(valueFrom, objTo, num){ // num은 0(first row) 혹은 2(third row)를 입력.
        objTo[totalArr[num]] = valueFrom;
        return;
    },
    pushRowRev : function(valueFrom, objTo, num){ //역으로 넣어주는 경우 필요
        var result = [];
        while(valueFrom.length != 0){
            var getValue = valueFrom.pop();
            result.push(getValue);
        }
        objTo[totalArr[num]] = result;
        return;
    },
    pushColumn : function(valueFrom, objTo, num){ // num은 0(first row) 혹은 2(third row)를 입력.
        for(i = 0; i < 3; i++){
            objTo[totalArr[i]][num] = valueFrom[i];
        }
        return;
    },
    pushColumnRev : function(valueFrom, objTo, num){ //역으로 넣어주는 경우 필요
        for(i = 0; i < 3; i++){
            objTo[totalArr[i]][num] = valueFrom[2-i];
        }
        return;
    }
};

// 4-3. 6면 조작에 대한 함수 구현
var cubeMove = {
    top : function(){
        cubeMoveMain.turnRight(surfTop);

        var turn = [surfFront, surfLeft, surfBack, surfRight]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveSide.getRow(turn[i],0));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveSide.pushRow(getArr[j], turn[j], 0);
        }

        console.log("Top Reverse Move");
        output.result();
        return;
    },
    bottom : function(){
        cubeMoveMain.turnRight(surfBottom);

        var turn = [surfFront, surfRight, surfBack, surfLeft];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveSide.getRow(turn[i],2));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveSide.pushRow(getArr[j], turn[j], 2); 
        }
        console.log("Bottom Move");
        output.result();
        return;
    },
    left : function(){
        cubeMoveMain.turnRight(surfLeft); 

        var turn = [surfTop, surfFront, surfBottom, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            } else{
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){ 
            if(j <= 1){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 2);
            } else{
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 0);
            }
        }
        console.log("Left Move");
        output.result();
        return;
    },
    right : function(){
        cubeMoveMain.turnRight(surfRight);

        var turn = [surfBottom, surfFront, surfTop, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            } else{
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            }
        };

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j <= 1){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 0);
            } else{
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 2);
            }
        };
        console.log("Right Move");
        output.result();
        return;
    },
    front : function(){
        cubeMoveMain.turnRight(surfFront); 

        var turn = [surfTop, surfRight, surfBottom, surfLeft]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveSide.getRow(turn[i],2));
            } else if(i === 1){
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            } else if(i === 2){
                getArr.push(cubeMoveSide.getRow(turn[i],0));
            } else {
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 0);
            } else if(j === 1){
                cubeMoveSide.pushRowRev(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 2);
            } else{
                cubeMoveSide.pushRowRev(getArr[j], turn[j], 2);
            }
        }

        console.log("Front Move");
        output.result();
        return;
    },
    back : function(){
        cubeMoveMain.turnRight(surfBack); 

        var turn = [surfTop, surfLeft, surfBottom, surfRight]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveSide.getRow(turn[i],0));
            } else if(i === 1){
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            } else if(i === 2){
                getArr.push(cubeMoveSide.getRow(turn[i],2));
            } else {
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 0);
            } else if(j === 1){
                cubeMoveSide.pushRow(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 2);
            } else{
                cubeMoveSide.pushRow(getArr[j], turn[j], 0);
            }
        }

        console.log("Back Move");
        output.result();
        return;
    },
    topRev : function(){
        cubeMoveMain.turnLeft(surfTop);

        var turn = [surfFront, surfRight, surfBack, surfLeft];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveSide.getRow(turn[i],0));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveSide.pushRow(getArr[j], turn[j], 0);
        }
        console.log("Top Reverse Move");
        output.result();
        return;
    },
    bottomRev : function(){
        cubeMoveMain.turnLeft(surfBottom);

        var turn = [surfFront, surfLeft, surfBack, surfRight];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            getArr.push(cubeMoveSide.getRow(turn[i],2));
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            cubeMoveSide.pushRow(getArr[j], turn[j], 2);
        }
        console.log("Bottom Move");
        output.result();
        return;
    },
    leftRev : function(){
        cubeMoveMain.turnLeft(surfLeft);

        var turn = [surfBottom, surfFront, surfTop, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            } else{
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            }
        };

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j <= 1){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 2);
            } else{
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 0);
            }
        };
        console.log("Left Reverse Move");
        output.result();
        return;
    },

    rightRev : function(){
        cubeMoveMain.turnLeft(surfRight);

        var turn = [surfTop, surfFront, surfBottom, surfBack];
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i <= 2){
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            } else{
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j <= 1){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 0);
            } else{
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 2);
            }
        }
        console.log("Right Reverse Move");
        output.result();
        return;
    },
    frontRev : function(){
        cubeMoveMain.turnLeft(surfFront); 

        var turn = [surfTop, surfLeft, surfBottom, surfRight]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveSide.getRow(turn[i],2));
            } else if(i === 1){
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            } else if(i === 2){
                getArr.push(cubeMoveSide.getRow(turn[i],0));
            } else {
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 2);
            } else if(j === 1){
                cubeMoveSide.pushRow(getArr[j], turn[j], 0);
            } else if(j === 2){
                cubeMoveSide.pushColumnRev(getArr[j], turn[j], 0);
            } else{
                cubeMoveSide.pushRow(getArr[j], turn[j], 2);
            }
        }

        console.log("Front Reverse Move");
        output.result();
        return;
    },
    backRev : function(){
        cubeMoveMain.turnLeft(surfBack); 

        var turn = [surfTop, surfRight, surfBottom, surfLeft]; 
        var getArr = [];

        for(var i = 0; i < turn.length; i++){
            if(i === 0){
                getArr.push(cubeMoveSide.getRow(turn[i],0));
            } else if(i === 1){
                getArr.push(cubeMoveSide.getColumn(turn[i],2));
            } else if(i === 2){
                getArr.push(cubeMoveSide.getRow(turn[i],2));
            } else {
                getArr.push(cubeMoveSide.getColumn(turn[i],0));
            }
        }

        turn.push(turn.shift());

        for(var j = 0; j < turn.length; j++){
            if(j === 0){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 2);
            } else if(j === 1){
                cubeMoveSide.pushRowRev(getArr[j], turn[j], 2);
            } else if(j === 2){
                cubeMoveSide.pushColumn(getArr[j], turn[j], 0);
            } else{
                cubeMoveSide.pushRowRev(getArr[j], turn[j], 0);
            }
        }

        console.log("Back Reverse Move");
        output.result();
        return;
    }
}
var quitBtn = {
    quit : function(){
        console.log("게임이 종료 되었습니다.")
    }
}
// 5. 변동된 조건을 출력한다. (html 에 text 형태로 구현.)
output.result();