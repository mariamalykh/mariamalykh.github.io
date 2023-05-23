const rain_button = document.querySelector(".footer__rain-button");
let rain = document.querySelector(".rain");
const time_popup = document.querySelector('.time_popup');
const time_popup__close_button = document.querySelector('.time_popup__close_button');

function showPopup() {
    if (localStorage.getItem('sent')) {
        return;
    }
    time_popup.classList.add('time_popup_active');
}

function closePopup() {
    time_popup.classList.remove('time_popup_active');
    localStorage.setItem('sent', 'true');
}

time_popup__close_button.addEventListener('click', (evt) => {
    closePopup();
})

setTimeout(showPopup, 3000);

let btn = document.getElementById("theme-button");
let link = document.getElementById("theme-link");

btn.addEventListener("click", function () {
    ChangeTheme();
    localStorage.setItem('changed', 'true');
});

function ChangeTheme()
{
    if (localStorage.getItem('changed')) {
        return;
    }
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
            let res =  String(input.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            removeError(input);
            console.log("regular:");
            console.log(res);
            if (res === null) {
                console.log("Error!");
                makeError(input,`Неверно введен емейл`);
                result = false;
            }
        }

        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength)
            // console.log("Error!");
            makeError(input,`Минимальное количество символов ${input.dataset.minLength}`);
            result = false;
        }

        // console.log(input.dataset);

        if (input.dataset.requiredLength) {
            if (input.value.length !== parseInt(input.dataset.requiredLength)) {
                // console.log("Error!");
                makeError(input,`Требуемое количество символов ${input.dataset.requiredLength}`);
                result = false;
                // console.log(input.dataset.requiredLength === parseInt(input.dataset.requiredLength));
            }
        }

        if (input.value==="") {
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

const contactForm = document.querySelector(".contact__form");
const contactFormButton = document.querySelector(".contact__form_button");

contactForm.addEventListener('submit',  (evt)  =>{
    evt.preventDefault();
    if (validation(form)) {
        contactFormButton.textContent = "Sending...";
        document.body.style.cursor = 'wait';
        const {name, email, tel, text} = evt.currentTarget.elements;
        createPost({
            name: name.value,
            email: email.value,
            phone: tel.value,
            message: text.value
        })
    }
    contactFormButton.textContent = "Sent!";
})

const createPost =  (data) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json, charset=UTF-8'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        })
    })

        .then(() => {
            contactFormButton.textContent = "Send";
            document.body.style.cursor = 'default';
        })
}

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("tel");
const message = document.getElementById("text");

function send() {
    createPost({"name": name.value, "email": email.value, "phone": phone.value, "message": message.value});
}

send();

const popup = document.querySelector(".popup");
const image = document.querySelectorAll(".gallery__img");
const popupLeftArrow = document.querySelector(".popup__files_left_arrow");
const popupImage = document.querySelector(".popup__files_image");
const popupRightArrow = document.querySelector(".popup__files_right_arrow");

popup.addEventListener('click', function(event) {
    if (event.target === popup) {
        close(popup);
    }
    event.stopPropagation();
});

image.forEach(function(element) {
    element.addEventListener('click', function() {
        popup.classList.add('popup_opened');
        element.classList.add("current");
        popupImage.src = element.src;
        checkDirections(element);
    });
})

popupLeftArrow.addEventListener('click', function() {
    const curr = document.querySelector(".current");
    const left = curr.previousElementSibling;
    curr.classList.remove("current");
    left.classList.add("current");
    popupImage.src = left.src;
    checkDirections(left);
})

popupRightArrow.addEventListener('click', function() {
    const curr = document.querySelector(".current");
    const right = curr.nextElementSibling;
    curr.classList.remove("current");
    right.classList.add("current");
    popupImage.src = right.src;
    checkDirections(right);
})

function checkDirections(element) {
    if (!element.nextElementSibling) {
        popupRightArrow.classList.add("popup__files_arrow_disabled");
    }
    else {
        popupRightArrow.classList.remove("popup__files_arrow_disabled");
    }
    if (!element.previousElementSibling) {
        popupLeftArrow.classList.add("popup__files_arrow_disabled");
    }
    else {
        popupLeftArrow.classList.remove("popup__files_arrow_disabled");
    }
}

function close(popup) {
    const curr = document.querySelector(".current");
    if (curr) {
        curr.classList.remove("current");
    }
    popup.classList.remove('popup_opened');
    
}












