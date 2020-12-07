// input 창 내에 적힌 텍스트 불러오기
// 3가지 요소 배열로 나누기
// 단어 요소 배열로 다시 나누기
// 단어 요소 저장 배열 방향, 칸 수 만큼 밀어내기
// 다시 배열로 저장
// 배열 -> 문자열 변경 후 출력

var input = {
    text : function(){
        t = document.getElementById('in').value;
        return t;
    }
}

var resultArr = {
    right : function(arr, num){
        for(var i = 0; i < Number(num); i++){
            var w = arr.pop();
            arr.unshift(w);
        }
        return arr;
    },
    left : function(arr, num){
        for(var i = 0; i < Number(num); i++){
            var w = arr.shift();
            arr.push(w);
        }
        return arr;
    }
}

var output = {
    printResult : function(result){
        var out = document.getElementById('output');
        out.innerHTML = "최종 결과값은 " + result + " 입니다.";
    }    
}

var main = function() {
    var mainText = input.text();
    var sepArr = mainText.split(" ");
    var sepTextArr = sepArr[0].split("");
    if(sepArr[1] === "r" || sepArr[1] === "R") {
        resultArr.right(sepTextArr, sepArr[2]);
    } else if(sepArr[1] === "l" || sepArr[1] === "L"){
        resultArr.left(sepTextArr, sepArr[2]);
    } else {
        document.write("잘못된 값을 입력하였습니다.");
        return;
    };
    var result = sepTextArr.join("");
    output.printResult(result);
}