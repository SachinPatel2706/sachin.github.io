console.log("This is my Website");
showNotes();

async function renderPage(page) {

    switch (page) {
        case 'home':
            break;
        case 'about':
            break;
        case 'covid19_India':
            covid19India();
            break;
        case 'covid19_World':
            covid19World();
            break;
        case 'keepNotes':
            keepNotes();
            break;
        case 'blog':
            myBlog();
            break;
    }
}

function changeTab(name) {
    let tabs = ['home', 'about', 'covid19_India', 'covid19_World', 'keepNotes', 'blog'];

    for (let i = 0; i < tabs.length; i++) {
        document.getElementById(tabs[i]).style.display = 'none'
        document.getElementById(tabs[i]).classList.remove("active");
    }
    renderPage(name)
    document.getElementById(name).style.display = 'block';
    document.getElementById(name).classList.add("active");
}


// ------------------------------------KeepNotes----------------------------------------------
async function keepNotes() {
    let btn_Add = document.getElementById('btn_Add');
    let div_Add = document.getElementById('div_Add');


    div_Add.addEventListener("click", function (e) {
        let add_Title = document.getElementById('add_Title');
        let add_Note = document.getElementById('add_Note');
        let notes = localStorage.getItem('notes');

        if (notes == null) {
            noteObj = [];
            //alert('Please Enter Notes')
        } else if (add_Title.value == "" || add_Title.value == null && add_Note == "" || add_Note == null) {
            let header = document.getElementById('header');
            header.innerHTML = `<span style='color: red;'>Please enter something</span>`
            setTimeout(() => {
                header.innerHTML = `<span style='color: rgba(255, 255, 0, 0.637); ;'>Take Notes</span>`
                // header.style.color ='red'
            }, 5000)
            return false;


        }
        else if (notes !== null) {
            noteObj = JSON.parse(notes);
        }

        let myObj = {
            title: add_Title.value,
            note: add_Note.value
        }

        noteObj.unshift(myObj);
        localStorage.setItem('notes', JSON.stringify(noteObj));
        add_Title.value = "";
        add_Note.value = "";

        console.log(noteObj);
        showNotes();
    });

}
function showNotes() {
    let notes = localStorage.getItem('notes');
    let noteObj = JSON.parse(notes);

    let myNotes = "";
    noteObj.forEach(function (element, index) {
        myNotes += `
                    <div class="notesList_Div" id="notesList_Div">
                    <h3 class="show_Title">${element.title}</h3>
                    <p class="show_note">${element.note}</p>
                    <button class="note_Delete" id="${index}" onclick="deleteNote(this.id)"> x </button>
                    </div>
                    `;
    });

    let notesList = document.getElementById('notes');
    notesList.innerHTML = myNotes;

}

function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
        //alert('Please Enter Notes')
    }
    else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    showNotes();
}


// -------------------covid19_India---------------------------

async function covid19India() {
    let response = await fetch('JS/updates.json');

    if (response.ok) {
        document.getElementById('state_List').innerHTML = "";
        let json = await response.json();

        for (let i = 0; i < json.length; i++) {
            document.getElementById('state_List').insertAdjacentHTML('beforeend', updatesIndia(json[i]))
        }
    }
    function updatesIndia(obj) {
        return `               
                <tr>
                    <td>${obj.state}</td>
                    <td>${obj.newcases}</td>
                    <td>${obj.newdeath}</td>
                    <td>${obj.totlecases}</td>
                    <td>${obj.totlerecovers}</td>
                    <td>${obj.totledeaths}</td>
                </tr>
               
                `
    }

    let search = document.getElementById('search');
    search.addEventListener('input', function(){
        let filter = search.value
        console.log(filter);

        let state_List = document.getElementById('state_List');
        let tr = state_List.getElementsByTagName('tr');

        for (let i=0; i < tr.length; i++){
            tr[i].style.display = "none";
            let td = tr[i].getElementsByTagName('td');
            for(let j=0; j < td.length; j++){
                let cell = tr[i].getElementsByTagName('td')[j];
                if ((cell)) {
                    if (cell.innerHTML.indexOf(filter) > -1){
                        tr[i].style.display = "block";
                        break;
                    }
                    
                }
            }
        }
    })
}

// -------------------covid19_World---------------------------

async function covid19World() {
    try {
        document.getElementById('contry_List').innerHTML = "";
        const getData = await fetch('http://api.covid19api.com/summary');
        const getJson = await getData.json();
        const myData = getJson.Countries;
        console.log(myData);
        // console.log(myData[i-1]['Country']);
        for (let i = 0; i < (myData['Countries'].length); i++) {
            document.getElementById('contry_List').insertAdjacentHTML('beforeend', updatesWorld(myData['Countries'][i]))
        }
    }
    catch (error) {
        console.log(`The Error is ${error}`)
    }

    function updatesWorld(obj) {
        return `
                <tr>
                    <td>${obj.Country}</td>
                    <td>${obj.NewConfirmed}</td>
                    <td>${obj.NewDeaths}</td>
                    <td>${obj.TotalConfirmed}</td>
                    <td>${obj.TotalRecovered}</td>
                    <td>${obj.TotalDeaths}</td>
                 </tr>`
    }

}

async function myBlog(){
    document.getElementById('myBlogDiv').innerHTML = "";
    let blogResponce = await fetch('JS/blog.json');

    if (blogResponce.ok) {
        let json = await blogResponce.json();

        for (let i = 0; i<json.length; i++){
            document.getElementById('myBlogDiv').insertAdjacentHTML('beforeend', updatesBlog(json[i]))
        }
    }

    function updatesBlog(obj){
        return `
                <div class="content_Div" id="content_Div">
                <h2>${obj.title}</h2>
                <p>${obj.blog} <a href=""> Read more...</a></p>
                <div class="blog_Footer">
                    <div class="time_Ago">${obj.datetime}</div>
                    
                </div>
                `
    }
}