document.addEventListener("DOMContentLoaded",function (){

    //Random Number Guessing Game
    let random_number=Math.floor(Math.random()*100)+1;
    const user_guess=document.querySelector(".guessField");
    const submit_guess_btn=document.querySelector(".guessSubmit");
    const guesses=document.querySelector(".guesses");
    const result=document.querySelector(".lastResult");
    const hint=document.querySelector(".lowOrHi");
    const newGame=document.querySelector(".newGame");
    const welcomeText=document.querySelector("#welcomeText");
    let turns=0;    //number of turns
    //validation on releasing keys
    user_guess.addEventListener("keyup",function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            submit_guess_btn.click();
        }
        else
            extractNumber(this);
    });
    submit_guess_btn.addEventListener("click",startGame);
    newGame.addEventListener("click",resetGame);
    function startGame() {
        if(user_guess.value!=="")
            ++turns;
        else{
            return;
        }
        let value=+(user_guess.value);
        if(turns===1)
        {
            welcomeText.style.display="none";
            guesses.innerHTML = 'Previous guesses: ';
        }

        if(turns<=10)
        {
            if(value===random_number)
            {
                if(turns===1)
                    guesses.innerHTML+=user_guess.value;
                else
                    guesses.innerHTML+=", "+ user_guess.value;
                result.style.color="#36cc36";
                result.innerHTML="CONGRATULATIONS! Your guess is right!"
                submit_guess_btn.disabled=true;
                user_guess.disabled=true;
                hint.innerHTML="";
                newGame.style.display="block";
                submit_guess_btn.style.display="none";
            }
            else if(value>random_number)
            {
                if(turns===1)
                    guesses.innerHTML+=user_guess.value;
                else
                    guesses.innerHTML+=", "+ user_guess.value;
                result.style.color="red";
                hint.style.color="orange";
                result.innerHTML="WRONG GUESS!";
                hint.innerHTML="Hint: TOO HIGH!";
            }
            else
            {
                if(turns===1)
                    guesses.innerHTML+=user_guess.value;
                else
                    guesses.innerHTML+=", "+ user_guess.value;
                result.style.color="red";
                hint.style.color="orange";
                result.innerHTML="WRONG GUESS!";
                hint.innerHTML="Hint: TOO LOW!";
            }
        }
        else{
            result.innerHTML="!!!GAME OVER!!!";
            submit_guess_btn.disabled=true;
            user_guess.disabled=true;
            hint.innerHTML="";
            newGame.style.display="block";
            submit_guess_btn.style.display="none";
        }
    }
    function resetGame() {
        user_guess.value="";
        newGame.style.display="none";
        result.innerHTML="";
        guesses.innerHTML="";
        submit_guess_btn.style.display="block";
        turns=0;
        submit_guess_btn.disabled=false;
        user_guess.disabled=false;
        welcomeText.style.display="block";
        random_number=Math.floor(Math.random()*100)+1;
    }
    //Input Validation
    function extractNumber(obj)
    {
        let temp = obj.value;
        // avoid changing things if already formatted correctly
        // let reg0Str = '[0-9]*';
        const reg0=/^\d{0,2}$|^100$/;

        // first replace all non numbers
        let reg1 = /[^0-9]/g;
        temp = temp.replace(reg1, '');
        if(!reg0.exec(temp))
        {
            temp=temp.substring(0,temp.length-1);
        }
        document.querySelector("#guessField").innerHTML=temp;
        obj.value = temp;
    }
});