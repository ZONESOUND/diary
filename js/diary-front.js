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

$("#send").click(function() {
    diaryRef.push(toJson($("#textarea").val()));
    $("#textarea").val("");
})

diaryRef.on('value', (snapshot)=>{
    $(".new").remove();
    $('#firstR').text("");
    let diariesVal = snapshot.val();
    let last = "";
    diaries = [];
    Object.entries(diariesVal).forEach((e)=>{
        diaries.push(e[1]);
    })
    if (diaries.length > 0) 
        $('#firstR').html(toTxt(diaries[diaries.length-1]));
    for (let i=diaries.length-2; i>=0; i--) {
        let txt = toTxt(diaries[i]);
        if (last != "") {
          $('#bb-bookblock').append(addPage(last, txt));
          last = "";
        } else {
            last = txt;
        }
    }    
    if (last != "")
        $('#bb-bookblock').append(addPage(last, ""));
    Page.init();
})

function toTxt(obj) {
    return `${obj.text}<br><br><br><span class="date">${new Date(obj.time).toDateString()}</span>`;
}

function addPage(txt1, txt2) {
    return `<div class="bb-item new" style="display: block;">
        <div class="bb-custom-side">
            <p>${txt1}</p>
        </div>
        <div class="bb-custom-side">
            <p>${txt2}</p>
        </div>
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