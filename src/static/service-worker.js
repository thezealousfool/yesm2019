if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        console.log("Registrations", registrations);
        for(let registration of registrations) {
            registration.unregister().then(function(unreg_status) {
                console.log(registration, unreg_status);
                return self.clients.matchAll();
            }).then(function(clients) {
                console.log(clients);
                clients.forEach(client => {
                    if (client.url && "navigate" in client){
                        client.navigate(client.url);
                    }
                });
            });
        }
    });
} else {
    console.log("Service worker not found", navigator);
}
