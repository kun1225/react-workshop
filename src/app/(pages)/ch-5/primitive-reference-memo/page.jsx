'use client';

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

export default function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);

  console.log('UserProfile re-render');

  const requestOptions = useMemo(() => {
    return {
      source: 'profile-component',
      timestamp: Date.now(),
    };
  }, []);

  const loadUserData = useCallback(
    async (options) => {
      const data = await fetchUserDetails(userId, options);
      setUserData(data);
    },
    [userId],
  );

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
