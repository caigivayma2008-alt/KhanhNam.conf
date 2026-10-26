var version = 'V1.0.3';

function setHeaderValue(headers, key, value) {
    var lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

var modifiedHeaders = $request.headers;

var headersToModify = {
    "X-RevenueCat-ETag": "",
    "If-None-Match": "",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
};

for (var key in headersToModify) {
    setHeaderValue(modifiedHeaders, key, headersToModify[key]);
}

$done({ headers: modifiedHeaders });
