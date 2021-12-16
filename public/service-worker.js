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