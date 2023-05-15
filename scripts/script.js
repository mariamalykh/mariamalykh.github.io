const rain_button = document.querySelector(".footer__rain-button");
let rain = document.querySelector(".rain");

rain_button.addEventListener('click', function (event) {
    event.preventDefault();
    if (window.innerWidth >= 800) {
        rain.classList.add("rain_active");
        rain.classList.add("rain_animation");
    }
})

window.addEventListener('resize', function () {
    if (rain.classList.contains("rain_active")) {
        rain.classList.toggle("rain_animation");
    }
})

rain.addEventListener('click', function () {
    if (rain.classList.contains("rain_active")) {
        rain.classList.remove("rain_active");
    }
})

let btn = document.getElementById("theme-button");
let link = document.getElementById("theme-link");

btn.addEventListener("click", function () { ChangeTheme(); });

function ChangeTheme()
{
    let mainTheme = "css/main_theme.css";
    let darkTheme = "css/dark_theme.css";

    let current = link.getAttribute("href");
    let theme = "";

    if(current === darkTheme)
    {
        current = mainTheme;
        theme = "dark";
    }
    else
    {
        current = darkTheme;
        theme = "light";
    }

    link.setAttribute("href", current);
}

function validation(form) {

    function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains("error")) {
            parent.querySelector(".error-label").remove();
            parent.classList.remove("error");

        }
    }
    function makeError(input, text){
        const parent = input.parentNode;
        if (!parent.classList.contains("error")) {
            const errorLabel = document.createElement('label');
            errorLabel.classList.add("error-label");

            errorLabel.textContent = text;
            parent.classList.add("error");
            parent.append(errorLabel);
        }
    }

    // console.log(form);
    let result = true;
    form.querySelectorAll("input").forEach(input => {
        removeError(input);

        if (input.dataset.maxLength) {
            removeError(input);
            if (input.value.length > input.dataset.maxLength) {
                console.log("Error!");
                makeError(input,`Максимальное количество символов ${input.dataset.maxLength}`);
                result = false;
            }
        }

        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength) {
                console.log("Error!");
                makeError(input,`Минимальное количество символов ${input.dataset.minLength}`);
                result = false;
            }
        }

        if (input.dataset.requiredLength) {
            if (input.value.length !== input.dataset.reauiredLength) {
                console.log("Error!");
                makeError(input,`Требуемое количество символов ${input.dataset.requiredLength}`);
                result = false;
            }
        }

        if (input.value=="") {
            console.log("Error!");
            makeError(input,'Поле не заполнено');
            result = false;
        }
    });
    return result;
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    validation(form);
})

