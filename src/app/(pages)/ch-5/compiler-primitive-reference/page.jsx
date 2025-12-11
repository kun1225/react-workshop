'use client';

import { useState, useEffect } from 'react';

export default function UserProfile({ userId }) {
  'use memo';

  const [userData, setUserData] = useState(null);

  console.log('UserProfile re-render');

  const requestOptions = {
    source: 'profile-component',
    timestamp: Date.now(), // 透過 timestamp 可以發現不斷在 re-render
  };

  const loadUserData = async (options) => {
    const data = await fetchUserDetails(userId, options);
    setUserData(data);
  };

  useEffect(() => {
    loadUserData(requestOptions);
  }, [requestOptions, loadUserData]);

  return (
    <div>
      {userData && (
        <pre className="bg-gray-100 p-4">
          {JSON.stringify(userData, null, 2)}
        </pre>
      )}

      {/* 其他程式碼 */}
    </div>
  );
}

function fetchUserDetails(userId, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId, ...options });
    }, 1000);
  });
}
