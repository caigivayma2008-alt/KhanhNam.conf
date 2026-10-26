// =======================================================
// Locket Gold Unlocker
// Maintained by Hoang Khanh Nam (Credit: DinhDuyVinh)
// =======================================================

var mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

obj.Attention = "Locket Gold - Tự host bởi Hoàng Khánh Nam";

var subData = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-10-26T01:00:00Z",
  purchase_date: "2024-10-26T01:00:00Z",
  store: "app_store"
};

var entData = {
  grace_period_expires_date: null,
  purchase_date: "2024-10-26T01:00:00Z",
  product_identifier: "locket_1600_1y",
  expires_date: "2099-12-31T23:59:59Z"
};

var match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    entData.product_identifier = s;
    obj.subscriber.subscriptions[s] = subData;
  } else {
    obj.subscriber.subscriptions["locket_1600_1y"] = subData;
  }
  obj.subscriber.entitlements[e] = entData;
} else {
  obj.subscriber.subscriptions["locket_1600_1y"] = subData;
  obj.subscriber.entitlements.pro = entData;
}

$done({ body: JSON.stringify(obj) });
