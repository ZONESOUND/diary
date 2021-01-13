var firebaseConfig = {
    apiKey: "AIzaSyAaC9S_oxnRqw26RkC8zHVhUr301i4zdxo",
    authDomain: "webvr-d8be3.firebaseapp.com",
    databaseURL: "https://webvr-d8be3.firebaseio.com",
    projectId: "webvr-d8be3",
    storageBucket: "webvr-d8be3.appspot.com",
    messagingSenderId: "811779735110",
    appId: "1:811779735110:web:80c44fca5c6a292d2c1447",
    measurementId: "G-72D78QGCTY"
  };
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
const diaryRef = databaseRef.child('diary');
let diaries = [];



diaryRef.on('value', (snapshot)=>{
    $(".new").remove();
    let diariesVal = snapshot.val();
    let last = "";
    diaries = [];
    Object.entries(diariesVal).forEach((e)=>{
        diaries.push(e[1]);
    })
    let i=0;
    let txt = "";
    if (diaries.length > 0) {
        txt = toTxt(diaries[diaries.length-1]);
    }
    $('#bb-bookblock').append(addPage(`<p>${txt}</p>`, addTextArea(), 'last'));
    for (i=diaries.length-2; i>=0; i--) {
        txt = toTxt(diaries[i]);
        if (last != "") {
          $('#bb-bookblock').append(addPage(`<p>${txt}</p>`, `<p>${last}</p>`));
          last = "";
        } else {
            last = txt;
        }
    }
    if (last != "")
        $('#bb-bookblock').append(addPage("<p></p>", `<p>${last}</p>`,));
    
    textareaInit();
    $("#send").click(function() {
        if ($("#textarea").val() == "") return;
        diaryRef.push(toJson($("#textarea").val()));
        $("#textarea").val("");
    })
    Page.init();
    // $(".new").css('display', 'none');
    // $(".last").css('display', 'block');
    
})

function toTxt(obj) {
    return `${obj.text}<br><br><br><br>
    <span class="diarysmall">${obj.name}</span>
    <span class="diarysmall">${new Date(obj.time).toDateString()}</span>`;
}

function addPage(side1, side2, classname="") {
    return `<div class="bb-item new ${classname}" style="display: block;">
        <div class="bb-custom-side">
            ${side1}
        </div>
        <div class="bb-custom-side">
            ${side2}
        </div>
    </div>`;
}

function addTextArea() {
    return `<div>
    <textarea id="textarea"
    placeholder="write something..."></textarea>
    <a id="send" href="#" class="bb-custom-icon"><i class="fa fa-floppy-o"></i></a>
    </div>`;
}

function generateId() {
    return String.fromCharCode(Math.floor(Math.random()*25+ 65)) + Math.random().toString(10).substr(2, 3);
};

function toJson(text, name=generateId(), time=Date.now()) {
    return {
      name: name,
      time: time,
      text: text
    }    
}