/**
 * @fileoverview RevenueCat Cache Buster (Header Modifier)
 * @version 1.1.0
 * @author Hoang Khanh Nam
 * @credits DinhDuyVinh (Original Concept)
 * @description Intercepts and modifies HTTP headers to bypass RevenueCat caching, 
 * forcing the application to fetch the updated VIP receipt from the local script.
 */

'use strict';

(() => {
    try {
        const headers = $request.headers;

        /**
         * Mutates the headers object to set or overwrite a specific key.
         * Uses case-insensitive validation for HTTP header compliance.
         * 
         * @param {Object} targetHeaders - Request headers object.
         * @param {string} key - Header key to target.
         * @param {string} value - Value to overwrite.
         */
        const setHeader = (targetHeaders, key, value) => {
            const lowerKey = key.toLowerCase();
            if (lowerKey in targetHeaders) {
                targetHeaders[lowerKey] = value;
            } else {
                targetHeaders[key] = value;
            }
        };

        const cacheBusterHeaders = {
            "X-RevenueCat-ETag": "",
            "If-None-Match": "",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
        };

        // Duyệt qua danh sách và ghi đè header
        Object.entries(cacheBusterHeaders).forEach(([key, value]) => {
            setHeader(headers, key, value);
        });

        // Trả về request đã được dọn sạch cache
        $done({ headers });

    } catch (error) {
        // Hệ thống dự phòng: Trả về header gốc nếu xảy ra sự cố ngoài ý muốn
        console.log(`[KhanhNam Error] Cache Buster Failed: ${error.message}`);
        $done({ headers: $request.headers });
    }
})();
