var CACHE='kru-v2';
var URLS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(URLS)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){if(r)return r;return fetch(e.request).then(function(nr){if(nr&&nr.status===200){var c=nr.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c)})}return nr}).catch(function(){return caches.match('./')})}))});
