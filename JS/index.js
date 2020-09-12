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

function myFunction() {
    var x = document.getElementById("navBar");
    if (x.className === "navBar") {
      x.className += " responsive";
    } else {
      x.className = "navBar";
    }
  }

// ------------------------------------KeepNotes----------------------------------------------
async function keepNotes() {
    let btn_Add = document.getElementById('btn_Add');
    let div_Add = document.getElementById('div_Add');


    btn_Add.addEventListener("click", function (e) {
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
let i = 0;
let txt = 'Corona Virus Updates of India';
function typeWriter() {
    if (i < txt.length) {
        document.getElementById("head_India").innerHTML += txt.charAt(i);
        i++;
    }
}
setInterval(typeWriter,100);

let urlIndia = 'https://api.covid19india.org/data.json';
async function covid19India(url) {
    try {
        const getData = await fetch(url);
        const getJson = await getData.json();
        console.log(getJson);
        if (getData.ok) {
            show(getJson);
        }
        function show(getJson) {
            let tab = `
                    <tr>
                        <th>States</th>
                        <th>New Confirmed</th>
                        <th>New Recovered</th>
                        <th>New Deaths</th>
                        <th>Total Confirmed</th>
                        <th>Total Recovered</th>
                        <th>Total Deaths</th>
                     </tr> `
            for (let r of getJson.statewise) {
                tab += `
                <tbody class="state_List" id="state_List">
                    <tr>
                        <td>${r.state} </td> 
                        <td>${r.NewConfirmed}</td> 
                        <td>${r.NewRecovered}</td> 
                        <td>${r.NewDeaths}</td> 
                        <td>${r.confirmed}</td>  
                        <td>${r.recovered}</td> 
                        <td>${r.deaths}</td> 
                    </tr>
                </tbody>
                `
            }
            document.getElementById('tableIndia').innerHTML = tab
        }
    }
    catch (error) {
        console.log(`The Error is ${error}`)
    }

}
covid19India(urlIndia)






// -------------------covid19_World---------------------------

let urlWorld = 'http://api.covid19api.com/summary';
async function covid19World(url) {
    try {
        const getData = await fetch(url);
        const getJson = await getData.json();
        console.log(getJson);
        if (getData.ok) {
            show(getJson);
        }
        function show(getJson) {
            let tab = `
                    <tr>
                        <th>Countries</th>
                        <th>New Confirmed</th>
                        <th>New Recovered</th>
                        <th>New Deaths</th>
                        <th>Total Confirmed</th>
                        <th>Total Recovered</th>
                        <th>Total Deaths</th>
                    </tr>`
            for (let r of getJson.Countries) {
                tab += `
                <tbody class="contry_List" id="contry_List">
                    <tr>
                        <td>${r.Country} </td> 
                        <td>${r.NewConfirmed}</td> 
                        <td>${r.NewRecovered}</td> 
                        <td>${r.NewDeaths}</td> 
                        <td>${r.TotalConfirmed}</td>  
                        <td>${r.TotalRecovered}</td> 
                        <td>${r.TotalDeaths}</td> 
                    </tr>
                </tbody>
                `
            }
            document.getElementById('tableWorld').innerHTML = tab
        }
    }
    catch (error) {
        console.log(`The Error is ${error}`)
    }
}
covid19World(urlWorld);


async function myBlog() {
    document.getElementById('myBlogDiv').innerHTML = "";
    let blogResponce = await fetch('JS/blog.json');

    if (blogResponce.ok) {
        let json = await blogResponce.json();

        for (let i = 0; i < json.length; i++) {
            document.getElementById('myBlogDiv').insertAdjacentHTML('beforeend', updatesBlog(json[i]))
        }
    }

    function updatesBlog(obj) {
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