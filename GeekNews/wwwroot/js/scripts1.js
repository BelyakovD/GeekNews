var crrntUsr = "", editedId = "";

function AuthAuto() {
    var req = new XMLHttpRequest();
    req.open("POST", "/api/account/isauthenticated", true);
    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (this.responseText === "") {
                //auth = null;
                crrntUsr = "guest";
                document.getElementById("msgAuth").innerHTML = "Вы Гость. Пожалуйста, выполните вход.";
                document.getElementById("logoutBtn").style.display = 'none';
                document.getElementById("logModalBtn").style.display = '';
                document.getElementById("regModalBtn").style.display = '';
                document.getElementById("nav-new-tab").style.display = 'none';
            }
            else {
                //auth = true;
                var myObj = "";
                myObj = req.responseText !== "" ? JSON.parse(req.responseText) : {};
                crrntUsr = myObj.message2;
                document.getElementById("msgAuth").innerHTML = myObj.message;
                document.getElementById("logoutBtn").style.display = '';
                document.getElementById("logModalBtn").style.display = 'none';
                document.getElementById("regModalBtn").style.display = 'none';
                document.getElementById("nav-new-tab").style.display = '';
            }
        }
        LoadSections();
    };
    req.send();
}
AuthAuto();

function LoadSections() {
    var allLikes, myObj, i, j, x = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/api/Connect/", false);
    request.send();
    myObj = JSON.parse(request.responseText);
    
    allLikes = GetLikes();

    for (j in myObj[0].news) {
        x += `
            <div class="col-md-6">
            <img src="${myObj[0].news[j].image}">
            <h4>${myObj[0].news[j].title}</h4>
            <div>${myObj[0].news[j].content}</div>
            <h6>${myObj[0].news[j].date}</h6>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteNews(${myObj[0].news[j].newsId})" data-toggle="modal" data-target="#delModal">Удалить</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="EditNews(${myObj[0].news[j].newsId}, '${myObj[0].news[j].title}', 
                \`${escapeHtml(myObj[0].news[j].content)}\`, '${myObj[0].news[j].image}', '${myObj[0].news[j].date}', 
                  ${myObj[0].news[j].sectionId})" data-toggle="modal" data-target="#myModal">Редактировать</button>            
        `;
        var flag = 1, LikeCntr = 0;
        for (i in allLikes) if (allLikes[i].newsId === myObj[0].news[j].newsId) LikeCntr++;
        if (crrntUsr !== "guest")
        for (i in allLikes) {
            if (allLikes[i].newsId === myObj[0].news[j].newsId && allLikes[i].userId === crrntUsr) {
                x += `<button type="button" class="btn btn-sm btn-outline-secondary active" role="button" aria-pressed="true"
                       onclick="DeleteLike(${myObj[0].news[j].newsId})">Нравится ${LikeCntr}</button>
              </div>`;
                flag = 0;
                }
            }        
        if (flag)
            x += `<button type="button" class="btn btn-sm btn-outline-secondary" onclick="LikeNews(${myObj[0].news[j].newsId})">Нравится ${LikeCntr}</button>
              </div>`;
    }
    document.getElementById("sectionGame").innerHTML = x; x = "";

    for (j in myObj[1].news) {
        x += `
            <div class="col-md-6">
            <img src="${myObj[1].news[j].image}">
            <h4>${myObj[1].news[j].title}</h4>
            <div>${myObj[1].news[j].content}</div>
            <h6>${myObj[1].news[j].date}</h6>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteNews(${myObj[1].news[j].newsId})" data-toggle="modal" data-target="#delModal">Удалить</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="EditNews(${myObj[1].news[j].newsId}, '${myObj[1].news[j].title}', 
                \`${escapeHtml(myObj[1].news[j].content)}\`, '${myObj[1].news[j].image}', '${myObj[1].news[j].date}', 
                  ${myObj[1].news[j].sectionId})" data-toggle="modal" data-target="#myModal">Редактировать</button>
        `;
        flag = 1; LikeCntr = 0;
        for (i in allLikes) if (allLikes[i].newsId === myObj[1].news[j].newsId) LikeCntr++;
        if (crrntUsr !== "guest")
            for (i in allLikes) {
                if (allLikes[i].newsId === myObj[1].news[j].newsId && allLikes[i].userId === crrntUsr) {
                    x += `<button type="button" class="btn btn-sm btn-outline-secondary active" role="button" aria-pressed="true"
                       onclick="DeleteLike(${myObj[1].news[j].newsId})">Нравится ${LikeCntr}</button>
                    </div>`;
                    flag = 0;
                }
            }
        if (flag)
            x += `<button type="button" class="btn btn-sm btn-outline-secondary" onclick="LikeNews(${myObj[1].news[j].newsId})">Нравится ${LikeCntr}</button>
              </div>`;
    }
    document.getElementById("sectionFilm").innerHTML = x; x = "";

    for (j in myObj[2].news) {
        x += `
            <div class="col-md-6">
            <img src="${myObj[2].news[j].image}">
            <h4>${myObj[2].news[j].title}</h4>
            <div>${myObj[2].news[j].content}</div>
            <h6>${myObj[2].news[j].date}</h6>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteNews(${myObj[2].news[j].newsId})" data-toggle="modal" data-target="#delModal">Удалить</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="EditNews(${myObj[2].news[j].newsId}, '${myObj[2].news[j].title}', 
                \`${escapeHtml(myObj[2].news[j].content)}\`, '${myObj[2].news[j].image}', '${myObj[2].news[j].date}', 
                  ${myObj[2].news[j].sectionId})" data-toggle="modal" data-target="#myModal">Редактировать</button>
        `;
        flag = 1; LikeCntr = 0;
        for (i in allLikes) if (allLikes[i].newsId === myObj[2].news[j].newsId) LikeCntr++;
        if (crrntUsr !== "guest")
            for (i in allLikes) {
                if (allLikes[i].newsId === myObj[2].news[j].newsId && allLikes[i].userId === crrntUsr) {
                    x += `<button type="button" class="btn btn-sm btn-outline-secondary active" role="button" aria-pressed="true"
                       onclick="DeleteLike(${myObj[2].news[j].newsId})">Нравится ${LikeCntr}</button>
                    </div>`;
                    flag = 0;
                }
            }
        if (flag)
            x += `<button type="button" class="btn btn-sm btn-outline-secondary" onclick="LikeNews(${myObj[2].news[j].newsId})">Нравится ${LikeCntr}</button>
              </div>`;
    }
    document.getElementById("sectionComics").innerHTML = x;
}

function GetLikes() {
    var myObj = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/api/UserLikes/", false);
    request.send();
    return myObj = JSON.parse(request.responseText);
}

function LikeNews(NewsId) {
    var user = crrntUsr;
    if (user !== "guest") {
        var xmlhttp = new XMLHttpRequest();    
        xmlhttp.open("POST", "/api/UserLikes");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ newsId: NewsId, userId: user }));
        LoadSections();
    }
    else alert("Данная функция недоступна гостям");
}

function DeleteLike(NewsId) {
    var allLikes = GetLikes(), LikeId = 0;
    for (i in allLikes) {
        if (allLikes[i].newsId === NewsId && allLikes[i].userId === crrntUsr) {
            LikeId = allLikes[i].id;
            break;
        }
    }
    var request = new XMLHttpRequest();
    url = "/api/UserLikes/" + LikeId;
    request.open("DELETE", url, false);
    request.send();
    LoadSections();
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function DeleteNews(NewsId) {
    var request = new XMLHttpRequest();

    request.onload = function (ev) {
        var msg = "";
        if (request.status === 401) {
            msg = "У вас не хватает прав для удаления";
        } else if (request.status === 200) {
            msg = "Запись удалена, обновите страницу";
        } else {
            msg = "Неизвестная ошибка";
        }
        document.getElementById("msgDel").innerHTML = msg;
    };

    url = "/api/News/" + NewsId;
    request.open("DELETE", url, false);
    request.send();
}

function CreateNew() {
    titleText = document.getElementById("createTitle").value;
    if (document.getElementById("sectionChoose").value === "Игры") idNum = 25;
    else if (document.getElementById("sectionChoose").value === "Фильмы") idNum = 26;
    else idNum = 1025;
    contentText = document.getElementById("contentAdd").value;
    imgUrl = document.getElementById("img").value;
    dateText = document.getElementById("createDate").value;
    if (imgUrl.indexOf('://') > 0 && titleText !== "" && contentText !== "" && dateText !== "") {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/api/News");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ sectionId: idNum, content: contentText, title: titleText, image: imgUrl, date: dateText }));
    }
}

function EditNews(NewsId, Title, Content, Imge, Date, Section) {
    editedId = NewsId;
    document.getElementById("editTitle").value = Title;
    document.getElementById("contentEdit").value = Content;
    document.getElementById("imgEdit").value = Imge;
    document.getElementById("editDate").value = Date;
    if (Section === 26) document.getElementById("sectionEdit").value = "Фильмы";
    if (Section === 1025) document.getElementById("sectionEdit").value = "Комиксы";
}

function EditNewsAfterModal() {
    titleText = document.getElementById("editTitle").value;
    if (document.getElementById("sectionEdit").value === "Игры") idNum = 25;
    else if (document.getElementById("sectionEdit").value === "Фильмы") idNum = 26;
    else idNum = 1025;
    contentText = document.getElementById("contentEdit").value;
    imgUrl = document.getElementById("imgEdit").value;
    dateText = document.getElementById("editDate").value;
    if (imgUrl.indexOf('://') > 0 && titleText !== "" && contentText !== "" && dateText !== "")
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
            myObj = xmlhttp.responseText !== "" ? JSON.parse(xmlhttp.responseText) : {};
            document.getElementById("msgLogoff").innerHTML = myObj.message;
            
        }
        location.reload();
    };
    xmlhttp.send();
}
document.getElementById("logoutBtn").addEventListener("click", ParseResponseMsg);

function ParseResponseReg() {
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    passwordConfirm = document.getElementById("PasswordConfirm").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/account/Register");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        document.getElementById("msgR").innerHTML = "";
        var mydiv = document.getElementById('formErrorR');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        myObj = JSON.parse(this.responseText);
        document.getElementById("msgR").innerHTML = myObj.message;
        if (typeof myObj.error !== "undefined" && myObj.error.length > 0) {
            for (var i = 0; i < myObj.error.length; i++) {
                var ul = document.getElementsByTagName("ul");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(myObj.error[i]));
                ul[0].appendChild(li);
            }
        }
        else location.reload();
        document.getElementById("Password").value = "";
        document.getElementById("PasswordConfirm").value = "";
    };
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }));
}
document.getElementById("registerBtn").addEventListener("click", ParseResponseReg);

function ParseResponseLog() {
    email = document.getElementById("EmailL").value;
    password = document.getElementById("PasswordL").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/Login");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        document.getElementById("msgL").innerHTML = "";
        var mydiv = document.getElementById('formErrorL');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        myObj = JSON.parse(this.responseText);
        document.getElementById("msgL").innerHTML = myObj.message;
        if (typeof myObj.error !== "undefined" && myObj.error.length > 0) {
            for (var i = 0; i < myObj.error.length; i++) {
                var ul = document.getElementsByTagName("ol");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(myObj.error[i]));
                ul[0].appendChild(li);
            }
        }
        else location.reload();
        document.getElementById("PasswordL").value = "";
    };
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password
    }));
}
document.getElementById("loginBtn").addEventListener("click", ParseResponseLog);
