// declaring service workers
const APP_PREFIX = 'Budget-Tracker';
const VERSION = 'version_01';

const CACHE_NAME = APP_PREFIX + VERSION;

// files to cache by service worker logic
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/js/index.js',
    '/js/idb.js',
    '/manifest.json',
    '/css/styles.css',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
];

// install service worker
self.addEventListener('install', function (x) {
    x.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

// activate service worker
self.addEventListener('activate', function (x) {
    x.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheList.push(CACHE_NAME);
            // resolves once all old versions of cache have been updated
            return Promise.all(keyList.map(function (key, i) {
                if (cacheList.indexOf(key) === -1) {
                    console.log('removing cache : ' + keyList[i] );
                    return caches.delete(keyList[i]);
                }
            })
        );
    })
    )
});


// fetch info from cache data
self.addEventListener('fetch', function (x) {
    console.log('fetch request : ' + x.request.url)
    x.respondWith(
        caches.match(x.request).then(function (request) {
            // respond with cache if data is available
            if (request) {
                console.log('getting cache data : ' + x.request.url)
                return request
                // fetch request if there is no cache data
            } else {
                console.log('no files to cache, fetching : ' + x.request.url)
                return fetch(x.request)

            }
        })
    )
});

