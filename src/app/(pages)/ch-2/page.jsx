'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

export default function UseEffectExamples() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isListening, setIsListening] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const [titleCount, setTitleCount] = useState(0);

  const [windowSize, setWindowSize] = useState({
    width:
      typeof window !== 'undefined' ? window.innerWidth : 0,
    height:
      typeof window !== 'undefined'
        ? window.innerHeight
        : 0,
  });

  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        if (!response.ok)
          throw new Error('Failed to fetch');
        const data = await response.json();
        setUsers(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isListening) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      );
    };
  }, [isListening]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      const mockResults = [
        `結果 1: ${debouncedTerm}`,
        `結果 2: ${debouncedTerm} 相關`,
        `結果 3: ${debouncedTerm} 推薦`,
      ];
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const message = `訊息 ${Date.now()}`;
      setMessages((prev) => [...prev.slice(-4), message]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isConnected]);

  useEffect(() => {
    document.title = `計數器: ${titleCount}`;

    return () => {
      document.title = 'React Workshop';
    };
  }, [titleCount]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  useEffect(() => {
    if (name) {
      localStorage.setItem('userName', name);
    }
  }, [name]);

  useEffect(() => {
    console.log('📊 useEffect 9: 綜合狀態監控', {
      users: users.length,
      seconds,
      isRunning,
      isListening,
      searchTerm,
      isConnected,
      titleCount,
      windowSize,
      name,
    });
  });

  const handleTimerReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        useEffect 實務場景應用 - 單一組件版
      </h1>

      <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h2 className="mb-2 text-lg font-semibold">
          🔍 開發者提示
        </h2>
        <p className="text-sm text-gray-700">
          開啟瀏覽器控制台查看 useEffect
          的執行順序和清理過程！
        </p>
      </div>

      <div className="grid gap-8">
        {/* 1. 資料獲取 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            1. 資料獲取 (Data Fetching)
          </h2>
          {loading && (
            <p className="text-blue-600">載入中...</p>
          )}
          {error && (
            <p className="text-red-600">錯誤: {error}</p>
          )}
          {users.length > 0 && (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="rounded bg-gray-50 p-2"
                >
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 2. 計時器 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            2. 計時器 (Timer)
          </h2>
          <div className="mb-4 font-mono text-2xl">
            {seconds} 秒
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {isRunning ? '暫停' : '開始'}
            </button>
            <button
              onClick={handleTimerReset}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              重設
            </button>
          </div>
        </div>

        {/* 3. 事件監聽器 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            3. 事件監聽器 (Event Listener)
          </h2>
          <button
            onClick={() => setIsListening(!isListening)}
            className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            {isListening ? '停止追蹤' : '開始追蹤滑鼠'}
          </button>
          {isListening && (
            <p className="text-gray-700">
              滑鼠位置: X: {mousePosition.x}, Y:{' '}
              {mousePosition.y}
            </p>
          )}
        </div>

        {/* 4. 防抖搜尋 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            4. 防抖搜尋 (Debounce Search)
          </h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="輸入搜尋關鍵字..."
            className="mb-4 w-full rounded border p-2"
          />
          <p className="mb-2 text-sm text-gray-600">
            防抖關鍵字: {debouncedTerm || '無'}
          </p>
          {searchResults.length > 0 && (
            <ul className="space-y-1">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="rounded bg-yellow-50 p-2"
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 5. WebSocket 模擬 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            5. WebSocket 連接模擬
          </h2>
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`mb-4 rounded px-4 py-2 text-white ${
              isConnected
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isConnected ? '斷開連接' : '建立連接'}
          </button>
          <div className="mb-2 text-sm">
            狀態: {isConnected ? '已連接' : '未連接'}
          </div>
          {messages.length > 0 && (
            <div className="max-h-32 overflow-y-auto rounded bg-gray-50 p-3">
              {messages.map((message, index) => (
                <div key={index} className="text-sm">
                  {message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. 文檔標題更新 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            6. 文檔標題更新
          </h2>
          <p className="mb-4">點擊按鈕會更新瀏覽器標題</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTitleCount(titleCount - 1)}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              -
            </button>
            <span className="text-xl font-bold">
              {titleCount}
            </span>
            <button
              onClick={() => setTitleCount(titleCount + 1)}
              className="rounded bg-blue-500 px-3 py-1 text-white"
            >
              +
            </button>
          </div>
        </div>

        {/* 7. 視窗大小監聽 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            7. 視窗大小監聽
          </h2>
          <p>調整瀏覽器視窗大小來看效果</p>
          <div className="mt-2 rounded bg-blue-50 p-3">
            寬度: {windowSize.width}px, 高度:{' '}
            {windowSize.height}px
          </div>
        </div>

        {/* 8. localStorage 同步 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            8. localStorage 同步
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="輸入你的名字..."
            className="mb-2 w-full rounded border p-2"
          />
          <p className="text-sm text-gray-600">
            名字會自動保存到
            localStorage，重新整理頁面後仍會保留
          </p>
        </div>
      </div>

      {/* useEffect 執行統計 */}
      <div className="mt-8 rounded-lg border bg-gray-50 p-4">
        <h2 className="mb-2 text-lg font-semibold">
          📊 useEffect 執行統計
        </h2>
        <div className="space-y-1 text-sm text-gray-700">
          <p>• 總共有 11 個 useEffect</p>
          <p>• 2 個只在掛載時執行 (空依賴陣列)</p>
          <p>• 8 個依賴特定狀態變化執行</p>
          <p>• 1 個每次渲染都執行 (無依賴陣列)</p>
          <p>• 6 個有清理函數</p>
        </div>
      </div>
    </div>
  );
}
