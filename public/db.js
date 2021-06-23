let db;
const request = indexedDB.open("budget",1);

request.onupgradeneeded = ((evt)=> {
    let db = evt.target.result;
    db.createObjectStore("Pending", {autoIncrement: true});
})