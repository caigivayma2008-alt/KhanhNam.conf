// =======================================================
// Locket Gold Unlocker
// Original Source by: DinhDuyVinh
// Refactored & Maintained by: Hoang Khanh Nam
// =======================================================

var mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Thông báo cá nhân hóa - Tôn trọng tác giả gốc
obj.Attention = "Locket Gold - Tự host bởi Hoàng Khánh Nam (Credit: DinhDuyVinh)";

var premiumSubscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2026-10-28T08:00:00Z",
  purchase_date: "2026-10-28T08:00:00Z",
  store: "app_store"
};

var entitlementData = {
  grace_period_expires_date: null,
  purchase_date: "2026-10-28T08:00:00Z",
  product_identifier: "locket_1600_1y",
  expires_date: "2099-12-31T23:59:59Z"
};

var match = Object.keys(mapping).find(function(e) { return ua.includes(e); });

if (match) {
  var e = mapping[match][0];
  var s = mapping[match][1];
  
  if (s) {
    entitlementData.product_identifier = s;
    obj.subscriber.subscriptions[s] = premiumSubscription;
  } else {
    obj.subscriber.subscriptions["locket_1600_1y"] = premiumSubscription;
  }
  
  obj.subscriber.entitlements[e] = entitlementData;
} else {
  obj.subscriber.subscriptions["locket_1600_1y"] = premiumSubscription;
  obj.subscriber.entitlements.pro = entitlementData;
}

$done({ body: JSON.stringify(obj) });
