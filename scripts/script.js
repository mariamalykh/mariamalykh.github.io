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