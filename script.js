 const display = document.getElementById("display");
  const buttons = document.querySelectorAll("#buttons button");

  let expression = "";
  const operators = ["+", "−", "×", "÷", "%"];

  function updateDisplay(val, reset = false) {
    if (reset) {
      display.innerHTML = `<span>${val}</span>`;
    } else {
      if (display.textContent.trim() === "0") {
        display.innerHTML = `<span>${val}</span>`;
      } else {
        let lastSpan = display.querySelector("span:last-child");
        if (lastSpan) {
          lastSpan.textContent += val;
        } else {
          display.innerHTML += `<span>${val}</span>`;
        }
      }
    }
    display.scrollTop = display.scrollHeight; 
    }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent.trim();

      if (value === "C") {
        expression = "";
        updateDisplay("0", true);
      } else if (value === "=") {
        try {
          if (!expression || operators.includes(expression.slice(-1))) return;

          const result = eval(
            expression.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-")
          );
          expression = result.toString();
          updateDisplay(expression, true);
        } catch {
          updateDisplay("error", true);
          expression = "";
        }
      } else if (operators.includes(value)) {
        if (!expression) return;
        if (operators.includes(expression.slice(-1))) return;

        expression += value;
        updateDisplay(value);
      } else {
        expression += value;
        updateDisplay(value);
      }
    });
  });