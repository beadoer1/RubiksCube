var input = {
    text : function(){
        t = document.getElementById('in').value;
        return t;
    }
}

var check = {

    resultErr : true,

    num : function(num){
        if(num - Math.floor(num) === 0){
            if(Number(num) >= -100 && Number(num) < 0){
                return true;
            } else if(Number(num) >= 0 && Number(num) < 100){
                return false;
            } else{
                this.resultErr = false;
            }
        } else{
            this.resultErr = false;
        }
    },
    direction : function(value){
        if(value === "r" || value === "R"){
            return true;
        } else if(value === "l" || value === "L"){
            return false;
        } else {
            this.resultErr = false;
        }
    }
};

var movePuzzle = {
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
        var out = document.getElementById("output");
        if (check.resultErr === true){
            out.innerHTML = "최종 결과값은 " + result + " 입니다.";
        } else {
            out.innerHTML = "값을 잘못 입력 하였습니다.(조건 참고)";
            check.resultErr = true;
        }
    }    
}

var main = function() {
    var mainText = input.text();
    var sepArr = mainText.split(" ");
    var sepTextArr = sepArr[0].split("");
    if(check.num(sepArr[1]) + check.direction(sepArr[2]) === 1){
        movePuzzle.right(sepTextArr, sepArr[1]);
    } else {
        movePuzzle.left(sepTextArr, sepArr[1]);
    }
    var result = sepTextArr.join("");
    output.printResult(result);
}