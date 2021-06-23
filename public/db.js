let db;
const request = indexedDB.open("budget",1);

request.onupgradeneeded = ((evt)=> {
    let db = evt.target.result;
    db.createObjectStore("Pending", {autoIncrement: true});
})

request.onsuccess = ((evt)=> {
    db = evt.target.result;
    if (navigator.onLine) {
        checkDatabase();
      }
})