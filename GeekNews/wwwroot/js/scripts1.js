var editedId = "";

function LoadSections() {
    var myObj, i, j, x = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/api/Connect/", false);
    request.send();

    myObj = JSON.parse(request.responseText);
    for (i in myObj) {
        x += `
            <hr>
            <h4> Раздел: <a href="${myObj[i].url}">${myObj[i].url}</a></h4><br>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="DeleteSection(${myObj[i].sectionId})">Удалить</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="NewSection(${myObj[i].sectionId})" data-toggle="modal" data-target="#myModal">Редактировать</button>
        `;

        for (j in myObj[i].news) {
            x += `
                <div class='col-10'><br>
                <h4>${myObj[i].news[j].title}</h4>
                <p>${myObj[i].news[j].content}</p><br>
                </div>
            `;
        }
    }
    document.getElementById("sectionsDiv").innerHTML = x;
}

function DeleteSection(SectionId) {
    var request = new XMLHttpRequest();

    request.onload = function (ev) {
        var msg = ""
        if (request.status == 401) {
            msg = "У вас не хватает прав для удаления";
        } else if (request.status == 200) {
            msg = "Запись удалена";
        } else {
            msg = "Неизвестная ошибка";
        }
        document.getElementById("msgDel").innerHTML = msg;
    }

    url = "/api/Sections/" + SectionId;
    request.open("DELETE", url, false);
    request.send();
    location.reload();
}

function CreateSection() {
    urlText = document.getElementById("createDiv").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Connect/");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ url: urlText }));
}

function EditSection() {
    urlText = document.getElementById("newSectionUrl").value;
    var xmlhttp = new XMLHttpRequest();
    url1 = "/api/Sections/" + editedId;
    xmlhttp.open("PUT", url1);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ url: urlText, sectionId: editedId }));
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
};

function NewSection(SectionId) {
    editedId = SectionId;
}

LoadSections();
document.getElementById("logoutBtn").addEventListener("click", ParseResponseMsg);