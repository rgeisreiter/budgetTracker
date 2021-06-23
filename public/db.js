let db;
const request = indexedDB.open("budget",1);

request.onupgradeneeded = ((evt)=> {
    let db = evt.target.result;
    db.createObjectStore("Pending", {autoIncrement: true});
})

request.onsuccess = ((evt)=> {
    db = evt.target.result;
    if (navigator.onLine) {
        checkDB();
    }
})

request.onerror =  ((evt) => {
    console.log("Error")
});

const saveRecord = ((record) => {
    console.log("Started to save record")
    const transaction = db.transaction(["Pending"], "readwrite");
    const store = transaction.objectStore("Pending");
    store.add(record)
})

const checkDB = () => {
    const transaction = db.transaction(["Pending"], "readwrite");
    const store = transaction.objectStore("Pending");
    const getAll = store.getAll();

    getAll.onsuccess(()=> {
        if(getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers:{
                    Accept: "application/json , text/plain, */*", 
                "Content-Type":"application/json"}
            })
            .then(res => {
                return res.json
            })
            .then(()=> {
                const transaction = db.transaction(["Pending"], "readwrite");
                const store = transaction.objectStore("Pending");
                store.clear() //this will delete from index.db
            })
        }
    })
}

window.addEventListener("online", checkDB)