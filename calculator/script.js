function getHistory() {
    return document.getElementById("history-value").innerText;
    /*get the history by value id*/
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
    /*this function will print the history value by passing the parameter*/
}
function getOutput() {
    return document.getElementById("output-value").innerText;

}
function printOutput(num) 
{
    /*get the value from getFormattedNumber function */
    /*if the string is empty then it will print empty or else it will print the comma separated value*/
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    }
    else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }

}
function getFormattedNumber(num) {
    if(num=="-")
    {
        return "";
        //When we get a negative value, backspace will give us NaN(Not a number) as it only return the value outpt
        //So to resolve this the above condition is used
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    /*Converts a number to a string by using the current or specified locale.*/
    return value;
    /*this function puts ',' after numbers i.e. comma separated value*/
}

function reverseNumberFormat(num)
{
    return Number(num.replace(/,/g,''));
    /*this will move the comma separated value to its original state */
    /*the value to be replaced should be put inside / and /g*/
}
var operator = document.getElementsByClassName("operator");
/*var operator will keep all the operator*/
for(var i=0; i<operator.length; i++)
{
    /*fetch operators one by one by */
    operator[i].addEventListener('click',function(){
        /*inside this function we can give any action to the operators that we need to perform*/
        if(this.id=="clear")
        {
            printHistory("");
            printOutput("");
            //the clear C button will earase the history and output
        }
        else if(this.id=="backspace")
        {
            var output=reverseNumberFormat(getOutput()).toString();
            if(output)
            {
                //if output has a value
                output=output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else {
            var output=getOutput();
            var history=getHistory();
            if(output==""&&history!="")
            {
                if(isNaN(history[history.length-1]))
                {
                    //if the last character is an operator and remove the last character
                    history=history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!="")
            {
                //condition?true:false
                output=output==""?output:reverseNumberFormat(output);
                history=history+output;
                //the output is added at the history
                if(this.id=="=")
                {
                    //if the user clicks at the = then the result is evaluated
                    var result=eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else{
                    //for other operators it is added to the history and the output is empty
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}
var number= document.getElementsByClassName("number");
for(var i=0; i<number.length; i++)
{
    /*for numbers */
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput()); /*the outputs with commas removed */
        if(output!=NaN)
        { /*if output is a number*/
            output=output+this.id;
            printOutput(output);
        }
    });
}