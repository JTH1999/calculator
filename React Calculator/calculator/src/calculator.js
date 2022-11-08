import { useState } from "react";

function Button({ className, id, value, onClick, darkSwitch }) {
    return (
        <div
            className={darkSwitch ? className + " dark" : className}
            id={id}
            onClick={onClick}
        >
            {value}
        </div>
    );
}

function Switch(props) {
    return (
        <div className="switch">
            <input type="checkbox" checked={props.darkSwitch ? true : false} />
            <span className="slider round" onClick={props.onClick}></span>
        </div>
    );
}

export default function Calculator() {
    const [answer, setAnswer] = useState("");
    const [expression, setExpression] = useState("0");
    const [cleared, setCleared] = useState(true);
    const [darkSwitch, setDarkSwitch] = useState(false);

    function handleSwitch() {
        setDarkSwitch(!darkSwitch);
        if (!darkSwitch) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }

    function handleClick(value) {
        if (cleared) {
            if (
                value === "/" ||
                value === "*" ||
                value === "-" ||
                value === "+"
            ) {
                setExpression(expression + " " + value + " ");
                setCleared(false);
            } else if (!isNaN(parseFloat(value)) || value == ".") {
                setExpression(value);
                setCleared(false);
            }
        } else {
            if (
                value === "/" ||
                value === "*" ||
                value === "-" ||
                value === "+"
            ) {
                let last = expression[expression.length - 2];
                if (
                    last === "/" ||
                    last === "*" ||
                    last === "-" ||
                    last === "+"
                ) {
                    var newstring =
                        expression.substring(0, expression.length - 2) +
                        value +
                        " ";
                    setExpression(newstring);
                } else {
                    setExpression(expression + " " + value + " ");
                }
            } else {
                setExpression(expression + value);
            }
        }
    }

    function handleClick_Clear() {
        if (cleared) {
            setAnswer("");
        }
        setExpression(0);
        setCleared(true);
    }

    function handleClick_DeleteLast() {
        let last = expression[expression.length - 1];
        if (last == " ") {
            setExpression(expression.substring(0, expression.length - 3));
        } else {
            setExpression(expression.substring(0, expression.length - 1));
        }
    }

    function handleClick_equals() {
        let ans = Math.round(evaluate(expression) * 100) / 100;
        setAnswer(expression + " = " + ans);
        setExpression(ans);
        setCleared(true);
    }

    function evaluate(toEvaluate) {
        let result;

        let bracketsIndex = toEvaluate.indexOf("(");
        if (bracketsIndex != -1) {
            let before = toEvaluate.substring(0, bracketsIndex);
            const nums = Array(
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9"
            );
            if (nums.includes(before[before.length - 1])) {
                before += " * ";
            }
            let openBrackets = 0;
            let index = bracketsIndex + 1;
            let inside = "";
            while (openBrackets != 0 || toEvaluate[index] != ")") {
                if (toEvaluate[index] == "(") {
                    openBrackets++;
                }

                if (toEvaluate[index] == ")") {
                    openBrackets--;
                }

                inside += toEvaluate[index];
                index++;
            }

            inside = evaluate(inside);

            let after = toEvaluate.substring(index + 1);
            return evaluate(before + inside + after);
        }

        let plusIndex = toEvaluate.indexOf("+");
        if (plusIndex != -1) {
            let first = toEvaluate.substring(0, plusIndex);
            let second = toEvaluate.substring(plusIndex + 1);
            result = evaluate(first) + evaluate(second);
            return result;
        }

        let minusIndex = toEvaluate.indexOf("-");
        if (minusIndex != -1) {
            let first = toEvaluate.substring(0, minusIndex);
            let second = toEvaluate.substring(minusIndex + 1);
            result = evaluate(first) - evaluate(second);
            return result;
        }

        let multIndex = toEvaluate.indexOf("*");
        if (multIndex != -1) {
            let first = toEvaluate.substring(0, multIndex);
            let second = toEvaluate.substring(multIndex + 1);
            result = evaluate(first) * evaluate(second);
            return result;
        }

        let divIndex = toEvaluate.indexOf("/");
        if (divIndex != -1) {
            let first = toEvaluate.substring(0, divIndex);
            let second = toEvaluate.substring(divIndex + 1);
            result = evaluate(first) / evaluate(second);
            return result;
        }

        const parsed = parseFloat(toEvaluate);
        if (!isNaN(parsed)) {
            return parsed;
        }

        return result;
    }

    return (
        <div className="main ">
            <div className="d-flex justify-content-center">
                <div className={darkSwitch ? "calculator dark" : "calculator"}>
                    <div className="screen p-5 pb-3">
                        <div id="previous">{answer}</div>
                        <input id="current" value={expression} />
                    </div>
                    <div
                        className={
                            darkSwitch ? "dark calc-body p-5" : "calc-body p-5"
                        }
                    >
                        <div className="d-flex justify-content-between mb-4">
                            <Button
                                className="calc-btn thingy"
                                id="clear"
                                value="C"
                                onClick={handleClick_Clear}
                                darkSwitch={darkSwitch}
                            />

                            <Button
                                className="calc-btn thingy"
                                id="("
                                value="("
                                onClick={() => handleClick("(")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn thingy"
                                id=")"
                                value=")"
                                onClick={() => handleClick(")")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn thingy"
                                id="delete"
                                value="del"
                                onClick={handleClick_DeleteLast}
                                darkSwitch={darkSwitch}
                            />
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <Button
                                className="calc-btn expression"
                                id="7"
                                value="7"
                                onClick={() => handleClick("7")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="8"
                                value="8"
                                onClick={() => handleClick("8")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="9"
                                value="9"
                                onClick={() => handleClick("9")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn operator expression"
                                id="divide"
                                value="/"
                                onClick={() => handleClick("/")}
                                darkSwitch={darkSwitch}
                            />
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <Button
                                className="calc-btn expression"
                                id="4"
                                value="4"
                                onClick={() => handleClick("4")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="5"
                                value="5"
                                onClick={() => handleClick("5")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="6"
                                value="6"
                                onClick={() => handleClick("6")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn operator expression"
                                id="mult"
                                value="*"
                                onClick={() => handleClick("*")}
                                darkSwitch={darkSwitch}
                            />
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <Button
                                className="calc-btn expression"
                                id="1"
                                value="1"
                                onClick={() => handleClick("1")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="2"
                                value="2"
                                onClick={() => handleClick("2")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="3"
                                value="3"
                                onClick={() => handleClick("3")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn operator expression"
                                id="minus"
                                value="-"
                                onClick={() => handleClick("-")}
                                darkSwitch={darkSwitch}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                className="calc-btn expression"
                                id="0"
                                value="0"
                                onClick={() => handleClick("0")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn expression"
                                id="dot"
                                value="."
                                onClick={() => handleClick(".")}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn"
                                id="equals"
                                value="="
                                onClick={handleClick_equals}
                                darkSwitch={darkSwitch}
                            />
                            <Button
                                className="calc-btn operator expression"
                                id="plus"
                                value="+"
                                onClick={() => handleClick("+")}
                                darkSwitch={darkSwitch}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="switch-div">
                    <Switch darkSwitch={darkSwitch} onClick={handleSwitch} />
                </div>
            </div>
        </div>
    );
}
