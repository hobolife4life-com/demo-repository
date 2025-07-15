function FindProxyForURL(url, host) {
   var DIRECT = "DIRECT";
   var AZURE_PROXY = "PROXY 10.137.131.146:443";
   var LOCAL_P4S = "PROXY 10.4.103.69:8080";

   // Define a constant array for special domains that require LOCAL_P4S
   var LOCAL_P4S_DOMAINS = [
       "login.microsoftonline.com",
       "stfs.<domain2.com"
   ];

   // Helper function to determine if the host matches any of the LOCAL_P4S_DOMAINS
   function requiresLocalP4S(host) {
       return LOCAL_P4S_DOMAINS.some(function(domain) {
           return dnsDomainIs(host, domain);
       });
   }

   // Decide the proxy setting based on the host
   if (dnsResolve(host) == "127.0.0.1") {
       return DIRECT;
   } else if (isPlainHostName(host)) {
       return DIRECT;
   } else if (requiresLocalP4S(host)) {
       return LOCAL_P4S;
   } else {
       return AZURE_PROXY;
   }
}