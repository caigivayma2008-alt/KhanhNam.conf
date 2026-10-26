// =======================================================
// Locket Gold Unlocker
// Core Logic by @duyvinh09 | Refactored by Hoang Khanh Nam
// =======================================================

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
let obj = JSON.parse($response.body);

// JUSTHKN
obj.Attention = "Locket Gold - Tự host bởi Hoàng Khánh Nam (Credit: DinhDuyVinh)";

const subData = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2026-10-25T01:04:18Z",
  purchase_date: "2026-10-25T01:04:17Z",
  store: "app_store"
};

const entData = {
  grace_period_expires_date: null,
  purchase_date: "2026-10-25T01:04:17Z",
  product_identifier: "locket_1600_1y",
  expires_date: "2099-12-31T23:59:59Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

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
