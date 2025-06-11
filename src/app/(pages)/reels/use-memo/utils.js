const NOTIFICATION_NAMES = [
  '系統更新',
  '新留言',
  '任務完成',
  '密碼變更',
  '好友邀請',
  '活動提醒',
  '付款成功',
  '訂單出貨',
  '安全警告',
  '新公告',
];

const NOTIFICATION_DETAILS = [
  '請盡快查看詳情。',
  '您有一則新訊息。',
  '任務已成功完成。',
  '請確認您的密碼安全。',
  '您收到一個好友邀請。',
  '活動即將開始，請準備。',
  '付款已完成，感謝您的支持。',
  '您的訂單已出貨。',
  '偵測到異常登入，請注意。',
  '有新的公告，請查閱。',
];

const getRandomTime = () => {
  const now = Date.now();
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  const randomTimestamp = now - Math.floor(Math.random() * oneYear);
  return new Date(randomTimestamp).toISOString();
};

export const generateData = (count = 50000) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const name = NOTIFICATION_NAMES[Math.floor(Math.random() * NOTIFICATION_NAMES.length)];
    const detail = NOTIFICATION_DETAILS[Math.floor(Math.random() * NOTIFICATION_DETAILS.length)];
    data.push({
      id: i,
      name,
      time: getRandomTime(),
      detail,
    });
  }
  return data;
};
