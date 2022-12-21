// Håller hårdkodade värden samlat vid toppen istället 
// för att sprida ut dessa i koden/funktionen så andra
// utvecklare inte behöver leta dessa (eller när du kommer 
// tillbaka till koden efter ett längre tag).
const CLASS_ITEM_REMOVE_BUTTON_TEXT = "Ta bort";
const CLASS_ITEM_FILTER_ALL = "Alla";

// Vi cachar i förväg de element vi vill ha en referens till
const inputTypeElement = document.querySelector('#inputType');
const classListEl = document.querySelector(".class-list");
const filterInputElement = document.querySelector("#filterInput");

function filterStudents(filterValue)
{
    // Hämta referens till: alla element i klasslistan
    let classListElements = document.querySelectorAll(".class-list-item");
    // Hämta referens till: en <input> tag som har attributet type="radio" och attributet checked="true" och har klassen "filter-type"
    let filterType = document.querySelector('input[type="radio"]:checked.filter-type').value;

    // Gå igenom alla element i klasslistan
    classListElements.forEach((listItem) => {

        // Namnet att filtrera på
        const itemName = listItem.querySelector(".class-list-item-name").innerText;
        // Vilken årskurs vi ska filtrera på
        const itemType = listItem.querySelector(".class-list-item-type").innerText;

        // Vi filtrerar bort baserat på namnet
        if(!itemName.includes(filterValue))
        {
            listItem.classList.add("hide");
        }
        // Annars filtererar vi bort baserat på typen
        else if(itemType !== filterType && filterType !== CLASS_ITEM_FILTER_ALL)
        {
            listItem.classList.add("hide");
        }
        // Annars så ska vi inte filtrera bort
        else
        {
            listItem.classList.remove("hide");
        }
    });
}


function createStudent(inputName, inputPhone, inputYear)
{
    // Skapar vår "container/klassrad":
    // <div class="class-list-item"></div>
    let classListItem = document.createElement("div");
    classListItem.classList.add("class-list-item");
    classListEl.appendChild(classListItem);

    // Skapar elementen som ska vara i klassraden:
    // <span id="class-list-item-name">inputName</span>
    let classListItemName = document.createElement("span");
    classListItemName.classList.add("class-list-item-name");
    classListItemName.innerText = inputName;
    // <span id="class-list-item-phone">inputPhone</span>
    let classListItemPhone = document.createElement("span");
    classListItemPhone.classList.add("class-list-item-phone");
    classListItemPhone.innerText = inputPhone;
    // <span id="class-list-item-type">inputYear</span>
    let classListItemType = document.createElement("span");
    classListItemType.classList.add("class-list-item-type");
    classListItemType.innerText = inputYear;
    // <button onclick="removeStudent()">Ta bort</button>
    let classListItemRemoveBtn = document.createElement("button");
    classListItemRemoveBtn.innerText = CLASS_ITEM_REMOVE_BUTTON_TEXT;
    classListItemRemoveBtn.onclick = ()=>{
        removeStudent(classListItem);
    }

    // Lägg till de skapade elementen i "container/klassraden":
    classListItem.appendChild(classListItemName);
    classListItem.appendChild(classListItemPhone);
    classListItem.appendChild(classListItemType);
    classListItem.appendChild(classListItemRemoveBtn);

    /* Resultat:
        <div class="class-list-item">
            <span id="class-list-item-name">inputName</span>
            <span id="class-list-item-phone">inputPhone</span>
            <button onclick="removeStudent()">btnText</button>
        </div>
    */

    // Vi behöver applicera filtrering även på det nya objektet så vi kallar på
    filterStudents(filterInputElement.value);
}

function removeStudent(studentElement)
{
    studentElement.remove();
}