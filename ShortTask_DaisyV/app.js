if (navigator.serviceWorker) {
	   navigator.serviceWorker.register('.sw1/service-worker.js')
	      .then(registration => console.log('service worker registered'))
		  .catch(err => console.log(`SW not registered - Error: ${err}`))
    })
} else {
    console.log('Service Worker is not supported in this browser.')
}