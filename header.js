// =======================================================
// RevenueCat Cache Buster
// Original Logic by: DinhDuyVinh
// Maintained by: Hoang Khanh Nam
// =======================================================

var requestHeaders = $request.headers;

function setHeaderValue(headers, key, value) {
    var lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

// Xóa bộ nhớ đệm để ép Locket nhận cấu hình VIP mới
var cacheHeadersToClear = {
    "X-RevenueCat-ETag": "",
    "If-None-Match": "",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
};

for (var key in cacheHeadersToClear) {
    setHeaderValue(requestHeaders, key, cacheHeadersToClear[key]);
}

$done({ headers: requestHeaders });
