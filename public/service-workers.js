const FilesToCache = [
    "/",
    "/db",
    "/index.html",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "/manifest.json",
]

const Cache_Name = "static-cache-v1";
const Data_CACHE_Name = "data-cache-v1"

self.addEventListener("install", (evt) => {
    evt.waitUntil(
        evt.waitUntil(
            caches.open(Cache_Name).then(cache => {
                console.log("Your files were pre-cached successfully!");
                return cache.addAll(FilesToCache);
            })
        )
    )
})


self.addEventListener("fetch", (evt) => {
    if (evt.request.url.includes("/api/")) {
        evt.respondWith(
            caches.open(Data_CACHE_Name).then(cache => {
                return fetch(evt.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    return response
                
                })
                .catch(err => {
                    return cache.match(evt.request);
                });
            }).catch(err => console.log(err))
        );
        return;
    }
    evt.respondWith(
        fetch(evt.request).catch(()=> {
            return caches.match(evt.request)
            .then((res)=> {
                if(res){
                    return res
                }
                else if (evt.request.headers.get("accept").includes("text/html")){
                    return caches.match("/")
                }
            })
        })
    )
})
