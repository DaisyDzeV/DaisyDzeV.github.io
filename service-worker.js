var CACHE_VERSION = 'myapp-v1';
var CACHE_FILES = [
        'Icons/iOS/Icon-48.png',
	'Icons/iOS/Icon-100.png',
	'Icons/iOS/Icon-196.png',
	'hw4_IMGs/lightblue.jpg',
	'hw4_IMGs/lightgold.jpg',
        'app.js',
        'styles.css'
	'script.js',
	'manifest.json'
];

self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches
        .open(CACHE_VERSION)
        .then(cache => {
            console.log('SW caching files');
            cache.addAll(CACHE_FILES)
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('SW activated');
    event.waitUntil(
        caches.keys().then(keyNames => {
            return Promise.all(
                keyNames.map(key => {
                    if(key !== CACHE_VERSION) {
                        console.log('SW clearing old caches');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('SW fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
