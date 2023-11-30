const input = document.getElementById("myInput");
const dropdown = document.getElementById("myDropdown");

input.onfocus = show;
input.onkeyup = filterFunction;

function show() {
    dropdown.classList.add("show");
}

function hide() {
    dropdown.classList.remove("show");
}

function setInputValue(e) {
    const value = e.target.innerText;
    input.value = value;
    hide();
}

function filterFunction() {
    let i;
    let filter = input.value.toUpperCase();
    let options = dropdown.getElementsByTagName("span");

    for (i = 0; i < options.length; i++) {
        txtValue = options[i].textContent || options[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            options[i].style.display = "";
        } else {
            options[i].style.display = "none";
        }
    }
}


const fragment = document.createDocumentFragment();

names.forEach((name) => {
    let a = document.createElement('span');
    a.innerText = name;
    a.onclick = setInputValue;
    fragment.append(a);
})

dropdown.append(fragment);
