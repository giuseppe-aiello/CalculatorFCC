import React, {useState} from "react";

import "../App.css"


function Result({content}) {
    return (
      <div id="display">
        <output>{content}</output>
      </div>
    )
  }

function Calculator(){
    const[formula, setFormula] = useState('');
    const [result, setResult] = useState();



  function trasformaNumero(numeroStringa) {
    const segmenti = numeroStringa.split('.').filter(Boolean); // Rimuovi gli elementi vuoti
  
    if (segmenti.length > 1) {
      const parteIntera = segmenti[0];
      const parteDecimale = segmenti.slice(1).join('');
      const numeroTrasformato = parteIntera +"." +parteDecimale;
      return numeroTrasformato;
    } else {
      return numeroStringa;
    }
  }
  
const handleInput = (value) => {

    if (formula[formula.length-1]==="." && value===".") {

          return;
      }

    // const regex = /[+\*/]/;
      
    // if(regex.test(formula[formula.length-1]) && regex.test(value)){
    //   return;
    // }



        let form = formula;

        if (/[+\-*/]/.test(value)) {
          // Se il precedente è un operatore o un punto, verifica se è un segno negativo
          if (/[+\-*/]/.test(form[form.length-1])) {
            // Se il valore corrente è "-", accettalo
  
            if (value === "-" || form[form.length-1]==="-") {
              if(/[+\-*/]/.test(form[form.length-2])){
                  form= form.slice(0, -2);
                  console.log("FORM" + form);
              }
              
              form = form+value;
              console.log("FORM:" + form);

            } else {
              // Altrimenti, rimuovi l'operatore duplicato e inserisci il nuovo operatore
              const formulaWithoutLastOperator = form.slice(0, -1);
              form = formulaWithoutLastOperator + value;
            }
          } else form = formula+value;
        } else form = formula+value;




        if(formula.split("").includes(".")){

        const tokens = form.match(/\d+\.\d*|\d+|[+\-*/]/g);

            // /\d+(\.\d+)?|[+\-*/]/g

            for(let i = 0; i< tokens.length; i++){

                if(tokens[i].split("").includes("."))
                tokens[i] = trasformaNumero(tokens[i]);

            }
            form= (tokens.join(''));

        }


        if(formula[0]==="0" && value!=="." && formula.length===1){
             setFormula(value);
        }
        else setFormula(form);

    };

    const calculateResult = () => {
        try {
            const calculatedResult = eval(formula);
            setResult(calculatedResult);
            setFormula(calculatedResult.toString())
        }
        catch(error) {
            setResult(null);
        }

    };
    //console.log(result)
    console.log('result', result, typeof result);

    return(
        <div className="calculator">
            <div className="display-div">
                <Result content={formula}/>

                <output  className="result">{result !== undefined ? result : ""}</output>
            </div>

            <div className="buttons">

                <button id="seven" onClick={() => handleInput("7")}>7</button>
                <button id="eight" onClick={() => handleInput("8")}>8</button>
                <button id="nine" onClick={() => handleInput("9")}>9</button>
                <button className="operations" id="divide" onClick={() => handleInput("/")}>/</button>


                <button id="four" onClick={() => handleInput("4")}>4</button>
                <button id="five" onClick={() => handleInput("5")}>5</button>
                <button id="six" onClick={() => handleInput("6")}>6</button>
                <button className="operations" id="multiply" onClick={() => handleInput("*")}>*</button>


                <button id="one" onClick={() => handleInput("1")}>1</button>
                <button id="two" onClick={() => handleInput("2")}>2</button>
                <button id="three" onClick={() => handleInput("3")}>3</button>
                <button className="operations" id="add" onClick={() => handleInput("+")}>+</button>

                <button id="decimal" onClick={() => handleInput(".")}>.</button>
                <button id="zero" onClick={() => handleInput("0")}>0</button>
                <button className="equals" id="equals" onClick={calculateResult}>=</button>



                <button className="operations" id="subtract" onClick={() => handleInput("-")}>-</button>

                <button id="clear" className="ac" onClick={() => {setFormula("0")}}>AC</button>


            </div>

        </div>
    );

}

export default Calculator;