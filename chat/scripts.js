document.addEventListener("DOMContentLoaded", function (event) {
    var login = "";

    document.getElementById("btnIn").onclick = function () {
        login = document.getElementById("login").value;
        document.getElementById("login").value = "";
        document.getElementById("btnIn").style.display = "none";
        document.getElementById("btnOut").style.display = "block";
        document.getElementById("allMessages").style.display = "block";
        document.getElementById("sendMessage").style.display = "block";
    }

    document.getElementById("btnOut").onclick = function () {
        document.getElementById("btnIn").style.display = "block";
        document.getElementById("btnOut").style.display = "none";
        document.getElementsById("allMessages").style.display = "none";
        document.getElementById("sendMessage").style.display = "none";
    }

    document.getElementById("sendMessageBtn").onclick = function () {
        if (document.getElementById("email").value == "") {
            alert("Сообщение невозможно отправить! Введите получателя!");
        }
        else if (document.getElementById("message").value == "") {
            alert("Сообщение невозможно отправить!Введите текст сообщения!")
        }
        else {
            document.getElementById("tableBody").innerHTML += "<tr><td><input type=\"checkbox\" name=\"checkboxes\"</td><td>"
                + document.getElementById("message").value + "</td><td>" + login + "</td></tr>";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        }
    }

    document.getElementById("deleteMessageBtn").onclick = function () {
        var boxes = document.getElementsByName("checkboxes");
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].checked) {
                boxes[i].parentNode.parentNode.parentNode.removeChild(boxes[i].parentNode.parentNode);
                i--;
            }
        }
    }

    document.getElementById("receivedMessage").onclick = function () {
        var boxes = document.getElementsByName("checkboxes");
        if (document.getElementById("receivedMessage").checked) {            
            for (var i = 0; i < boxes.length; i++) {
                if (document.getElementsByName("checkboxes")[0].parentNode.parentNode.lastChild.lastChild === login) {
                    boxes[i].parentNode.parentNode.style.visibility = "visible";
                }
                else {
                    boxes[i].parentNode.parentNode.style.visibility = "hidden";
                }
            }
        }
        else {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].parentNode.parentNode.style.visibility = "visible";
            }
        }
    }

    document.getElementById("sentMessage").onclick = function () {
        var boxes = document.getElementsByName("checkboxes");
        if (document.getElementById("sentMessage").checked) {
            for (var i = 0; i < boxes.length; i++) {
                if (document.getElementsByName("checkboxes")[0].parentNode.parentNode.lastChild.lastChild === login) {
                    boxes[i].parentNode.parentNode.style.visibility = "visible";
                }
                else {
                    boxes[i].parentNode.parentNode.style.visibility = "hidden";
                }
            }
        }
        else {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].parentNode.parentNode.style.visibility = "visible";
            }
        }
    }
});


