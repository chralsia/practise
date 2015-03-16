var messageList = [];

var uniqueId = function () {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
};

var theMessage = function (text) {
    return {
        description: text,
        status: true,
        id: uniqueId()
    };
};


function store(listToSave) {
    if (typeof (Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("Chat messageList", JSON.stringify(listToSave));
}

function restore() {
    if (typeof (Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Chat messageList");

    return item && JSON.parse(item);
}

function createAll(allMsg) {
    for (var i = 0; i < allMsg.length; i++) {
        if (allMsg[i].status != false) {
            var message = allMsg[i].description;
            document.getElementById("tableBody").innerHTML += "<tr><td><input type=\"checkbox\" name=\"checkboxes\"></td><td>"
                    + message + "</td></tr>";
            var newMessage = theMessage(message);
            messageList.push(newMessage);
            store(messageList);
        }
    }
}

function restorelogin() {
    if (typeof (Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Name");

    return item && JSON.parse(item);
}

document.addEventListener("DOMContentLoaded", function (event) {
    var login = restorelogin() || "";

    var allMessage = restore() || [];

    if (restorelogin() != "") {
        document.getElementById("btnIn").style.visibility = "visible";
        document.getElementById("btnOut").style.visibility = "hidden";
        document.getElementById("allMessages").style.visibility = "hidden";
        document.getElementById("newMessage").style.visibility = "hidden";
        createAll(allMessage);
    }
   
    document.getElementById("btnIn").onclick = function () {
        login = document.getElementById("login").value;
        localStorage.setItem("Name", JSON.stringify(login));
        document.getElementById("login").value = "";
        document.getElementById("btnIn").style.visibility = "hidden";
        document.getElementById("btnOut").style.visibility = "visible";
        document.getElementById("allMessages").style.visibility = "visible";
        document.getElementById("newMessage").style.visibility = "visible";
        createAll(allMessage);
    }

    document.getElementById("btnOut").onclick = function () {
        document.getElementById("btnIn").style.visibility = "visible";
        document.getElementById("btnOut").style.visibility = "hidden";
        document.getElementById("allMessages").style.visibility = "hidden";
        document.getElementById("newMessage").style.visibility = "hidden";
    }

    document.getElementById("sendMessageBtn").onclick = function () {
        if (document.getElementById("message").value != "") {
            debugger;
            document.getElementById("tableBody").innerHTML += "<tr><td><input type=\"checkbox\" name=\"checkboxes\"></td><td>"
                + document.getElementById("message").value + "</td></tr>";
            var message = document.getElementById("message").value;
            var newMessage = theMessage(message);
            document.getElementById("message").value = "";
            messageList.push(newMessage);
            store(messageList);
        }
    }

    document.getElementById("trash").onclick = function () {
        var boxes = document.getElementsByName("checkboxes");
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].checked) {
                messageList[i].status = false;
                store(messageList);
                boxes[i].parentNode.parentNode.parentNode.removeChild(boxes[i].parentNode.parentNode);
                i--;
            }
        }
    }
    document.getElementById("pencil").onclick = function () {
        var boxes = document.getElementsByName("checkboxes");
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].checked) {                
                var message = boxes[i].parentNode.parentElement.children[1].innerHTML;
                var index = i;
                boxes[i].parentNode.parentElement.children[1].innerHTML = "<input id=\"editMessage\" type=\"text\" value=\""
                    + message + "\"><button onclick='document.getElementsByName(\"checkboxes\")["
                    + index + "].parentNode.parentElement.children[1].innerHTML = document.getElementById(\"editMessage\").value;'>OK";                
            }
        }
    }
}); 