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
