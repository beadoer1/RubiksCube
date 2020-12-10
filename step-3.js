// 1. 초기 배열을 구성한다. (6개 객체 내 3X3 배열 구성)
var surfTop = {
    arr1 : ["B","B","B"],
    arr2 : ["B","B","B"],
    arr3 : ["B","B","B"] 
};
var surfBottom = {
    arr1 : ["R","R","R"],
    arr2 : ["R","R","R"],
    arr3 : ["R","R","R"]     
};
var surfLeft = {
    arr1 : ["W","W","W"],
    arr2 : ["W","W","W"],
    arr3 : ["W","W","W"]     
};
var surfRight = {
    arr1 : ["G","G","G"],
    arr2 : ["G","G","G"],
    arr3 : ["G","G","G"]     
};
var surfFront = {
    arr1 : ["O","O","O"],
    arr2 : ["O","O","O"],
    arr3 : ["O","O","O"]
};
var surfBack = {
    arr1 : ["Y","Y","Y"],
    arr2 : ["Y","Y","Y"],
    arr3 : ["Y","Y","Y"]
};
var totalId = ["Top","Left","Front","Right","Back","Bottom"];
var totalSurf = [surfTop, surfLeft, surfFront, surfRight, surfBack, surfBottom];

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
            a.push(surfArr[i].arr1.join(" "));
            a.push(surfArr[i].arr2.join(" "));
            a.push(surfArr[i].arr3.join(" "));
            strArr.push(a);
        }
        return strArr;
    },
    // print : function(outArr, surfArr){
    //     for (var i = 0; i < outArr.length; i++){
    //         outArr[i].innerHTML = surfArr[i].arr1 + "<br>" + surfArr[i].arr2 + "<br>" + surfArr[i].arr3;
    //     }
    //     return;
    // },
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
// 4-2. 조작 면 주변 4면에 적용되는 움직임을 구현
// 4-3. 6면 조작에 대한 함수 구현
// 5. 변동된 조건을 출력한다. (html 에 text 형태로 구현.)