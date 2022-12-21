// Håller hårdkodade värden samlat vid toppen istället 
// för att sprida ut dessa i koden/funktionen så andra
// utvecklare inte behöver leta dessa (eller när du kommer 
// tillbaka till koden efter ett längre tag).
const CLASS_ITEM_REMOVE_BUTTON_TEXT = "Ta bort";
const CLASS_ITEM_FILTER_ALL = "Alla";

// Vi cachar i förväg de element vi vill ha en referens till
const classListEl = document.querySelector(".class-list");
const filterInputElement = document.querySelector("#filterInput");

// Lista med framtida student data
let classListData = [];


/***********************************
    Student Controller Functions
***********************************/

function filterStudents()
{
    renderAllStudents();
}

function createStudent(inputName, inputPhone, inputYear)
{
    // Lägg till datan i vår student data lista
    let studentObj = {
        name: inputName,
        phone: inputPhone,
        year: inputYear
    };
    classListData.push(studentObj);

    // Vi renderar om studentlistan
    renderAllStudents();
}

function removeStudent(index)
{
    // Vi tar bort från och med indexet "index" och antalet element vi vill ta bort är 1
    classListData.splice(index, 1);

    // Vi renderar om studentlistan
    renderAllStudents();
}

/***********************************
    Student Render Functions
***********************************/

function renderAllStudents()
{
    const filteredList = filterStudentList(filterInputElement.value);
    classListEl.innerHTML = renderAllStudentsFromList(filteredList);
}

function renderAllStudentsFromList(list)
{
    // Transformerar listan till html och använder join för att göra listan till en sammanslagen sträng
    return list.map((item, index) => {
        return renderStudent(index, item.name, item.phone, item.year);
    }).join("");
}

function renderStudent(index, inputName, inputPhone, inputYear)
{
    return `
        <div class="class-list-item">
            <span class="class-list-item-name">${inputName}</span>
            <span class="class-list-item-phone">${inputPhone}</span>
            <span class="class-list-item-type">${inputYear}</span>
            <button onclick="removeStudent(${index})">${CLASS_ITEM_REMOVE_BUTTON_TEXT}</button>
        </div>
    `;
}

/***********************************
    Student General Functions
***********************************/

function filterStudentList(filterValue)
{
    // Hämta referens till: input taggen för filter-type som är ikryssad
    let filterType = document.querySelector('input[type="radio"]:checked.filter-type').value;

    // Filtrerar listan
    let filteredList = classListData.filter((listItem)=>{
        console.log(listItem);
        return listItem.name.toUpperCase().includes(filterValue.toUpperCase()) && 
              (listItem.year === filterType || filterType === CLASS_ITEM_FILTER_ALL);
    });

    return filteredList;
}