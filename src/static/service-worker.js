"use strict";"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(function(r){var t=!0,n=!1,e=void 0;try{for(var i,a=r[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){i.value.unregister().then(function(){return self.clients.matchAll()}).then(function(r){r.forEach(function(r){r.url&&"navigate"in r&&r.navigate(r.url)})})}}catch(r){n=!0,e=r}finally{try{t||null==a.return||a.return()}finally{if(n)throw e}}});