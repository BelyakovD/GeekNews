var editedId = "";

function LoadSections() {
    var myObj, i, j, x = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/api/Connect/", false);
    request.send();

    myObj = JSON.parse(request.responseText);

    for (j in myObj[0].news) {
        x += `
            <div class="col-md-6">
            <img src="${myObj[0].news[j].image}">
            <h4>${myObj[0].news[j].title}</h4>
            <div>${myObj[0].news[j].content}</div>
            <h6>${myObj[0].news[j].date}</h6>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteNews(${myObj[0].news[j].newsId})" data-toggle="modal" data-target="#delModal">Удалить</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="EditNews(${myObj[0].news[j].newsId})" data-toggle="modal" data-target="#myModal">Редактировать</button>
            </div>
        `;
    }
    document.getElementById("sectionGame").innerHTML = x; x = "";

    for (j in myObj[1].news) {
        x += `
            <div class="col-md-6">
            <img src="${myObj[1].news[j].image}">
            <h4>${myObj[1].news[j].title}</h4>
            <p>${myObj[1].news[j].content}</p>
            <h6>${myObj[1].news[j].date}</h6>
            </div>
        `;
    }
    /*x += `
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteSection(${myObj[1].sectionId})">Удалить</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="NewSection(${myObj[1].sectionId})" data-toggle="modal" data-target="#myModal">Редактировать</button>
    `;*/
    document.getElementById("sectionFilm").innerHTML = x; x = "";

    for (j in myObj[2].news) {
        x += `
            <div class="col-md-6">
            <img src="${myObj[2].news[j].image}">
            <h4>${myObj[2].news[j].title}</h4>
            <p>${myObj[2].news[j].content}</p>
            <h6>${myObj[2].news[j].date}</h6>
            </div>
        `;
    }
    /*x += `
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteSection(${myObj[2].sectionId})">Удалить</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="NewSection(${myObj[2].sectionId})" data-toggle="modal" data-target="#myModal">Редактировать</button>
    `;*/
    document.getElementById("sectionComics").innerHTML = x;
}
LoadSections();

function DeleteNews(NewsId) {
    var request = new XMLHttpRequest();

    request.onload = function (ev) {
        var msg = ""
        if (request.status == 401) {
            msg = "У вас не хватает прав для удаления";
        } else if (request.status == 200) {
            msg = "Запись удалена, обновите страницу";
        } else {
            msg = "Неизвестная ошибка";
        }
        document.getElementById("msgDel").innerHTML = msg;
    }

    url = "/api/News/" + NewsId;
    request.open("DELETE", url, false);
    request.send();
}

function CreateNew() {
    titleText = document.getElementById("createTitle").value;
    if (document.getElementById("sectionChoose").value == "Игры") idNum = 25;
    else if (document.getElementById("sectionChoose").value == "Фильмы") idNum = 26;
    else idNum = 1025;
    contentText = document.getElementById("contentAdd").value;
    imgUrl = document.getElementById("img").value;
    dateText = document.getElementById("createDate").value;
    if (imgUrl.indexOf('://') > 0 && titleText != "" && contentText != "" && dateText != "") {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/api/News");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ sectionId: idNum, content: contentText, title: titleText, image: imgUrl, date: dateText }));
    }
}

function EditNews(NewsId) {
    editedId = NewsId;
}

function EditNewsAfterModal() {
    titleText = document.getElementById("editTitle").value;
    if (document.getElementById("sectionEdit").value == "Игры") idNum = 25;
    else if (document.getElementById("sectionEdit").value == "Фильмы") idNum = 26;
    else idNum = 1025;
    contentText = document.getElementById("contentEdit").value;
    imgUrl = document.getElementById("imgEdit").value;
    dateText = document.getElementById("editDate").value;
    if (imgUrl.indexOf('://') > 0 && titleText != "" && contentText != "" && dateText != "")
    {
        var xmlhttp = new XMLHttpRequest();
        url1 = "/api/News/" + editedId;
        xmlhttp.open("PUT", url1);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ newsId: editedId, sectionId: idNum, content: contentText, title: titleText, image: imgUrl, date: dateText }));
    }
}

function ParseResponseMsg() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/LogOff");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            var myObj = "";
            myObj = xmlhttp.responseText != "" ? JSON.parse(xmlhttp.responseText) : {};
            document.getElementById("msgLogoff").innerHTML = myObj.message;
        }
    }
    xmlhttp.send();
    /*document.getElementById("logoutBtn").style.display = 'none';
    document.getElementById("logModalBtn").style.display = '';
    document.getElementById("regModalBtn").style.display = '';*/
};

document.getElementById("logoutBtn").addEventListener("click", ParseResponseMsg);
//document.getElementById("logoutBtn").style.display = 'none';

/*Start reg*/
function ParseResponseReg() {
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    passwordConfirm = document.getElementById("PasswordConfirm").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/account/Register");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        document.getElementById("msgR").innerHTML = ""
        var mydiv = document.getElementById('formErrorR');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        myObj = JSON.parse(this.responseText);
        document.getElementById("msgR").innerHTML = myObj.message;
        if (myObj.error.length > 0) {
            for (var i = 0; i < myObj.error.length; i++) {
                var ul = document.getElementsByTagName("ul");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(myObj.error[i]));
                ul[0].appendChild(li);
            }
        }
        var msgR = document.getElementById("msgR").nodeValue;
        console.log("hgd", msgR);
        if (msgR.indexOf("Добавлен") != -1) {
            /*document.getElementById("logoutBtn").style.display = '';
            document.getElementById("logModalBtn").style.display = 'none';
            document.getElementById("regModalBtn").style.display = 'none';
            document.getElementById("registerBtn").style.display = 'none';*/
        }
        document.getElementById("Password").value = "";
        document.getElementById("PasswordConfirm").value = "";
    };
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }));
};
document.getElementById("registerBtn").addEventListener("click", ParseResponseReg);
/*End reg*/

/*Start log*/
function ParseResponseLog() {
    email = document.getElementById("EmailL").value;
    password = document.getElementById("PasswordL").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/Login");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        document.getElementById("msgL").innerHTML = ""
        var mydiv = document.getElementById('formErrorL');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        myObj = JSON.parse(this.responseText);
        document.getElementById("msgL").innerHTML = myObj.message;
        if (typeof myObj.error !== "undefined" && myObj.error.length > 0) {
            for (var i = 0; i < myObj.error.length; i++) {
                var ul = document.getElementsByTagName("ul");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(myObj.error[i]));
                ul[0].appendChild(li);
            }
        }
        document.getElementById("PasswordL").value = "";
    };
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password
    }));
};
document.getElementById("loginBtn").addEventListener("click", ParseResponseLog);
/*End log*/

function GetCurrentUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/isAuthenticated", true);
    xmlhttp.onreadystatechange = function () {
        var myObj = "";
        myObj = xmlhttp.responseText != "" ? JSON.parse(xmlhttp.responseText) : {};
        document.getElementById("msgAuth").innerHTML = myObj.message;
    }
    xmlhttp.send();
}
GetCurrentUser();

function AuthAuto() {
    var req = new XMLHttpRequest();
    req.open("POST", "/api/account/isauthenticated", true);
    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (this.responseText == "") {
                //auth = null;
                document.getElementById("logoutBtn").style.display = '';
                document.getElementById("logModalBtn").style.display = 'none';
                document.getElementById("regModalBtn").style.display = 'none';
               
            } else {
                //auth = true;
                document.getElementById("logoutBtn").style.display = 'none';
                document.getElementById("logModalBtn").style.display = '';
                document.getElementById("regModalBtn").style.display = '';           
            }
        }
    };
    req.send();
}
AuthAuto();