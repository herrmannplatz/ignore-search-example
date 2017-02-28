self.addEventListener('install', (event) => {
	event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
	self.clients.claim()
})

self.addEventListener('fetch', (event) => {
	if (event.request.url.includes('forceCaching=true')) {
		event.respondWith(
			caches.open('asset-cache').then((cache) =>
				cache.match(event.request, {ignoreSearch: true}).then((response) => {
					return response || fetch(event.request).then((response) => {
						cache.put(event.request, response.clone())
						return response
					})
				})
			)
		)
	}
})
