'use client';

import {
  useState,
  useRef,
  useEffect,
  Children,
} from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { wait } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import {
  Share2,
  FileDown,
  Plus,
  RefreshCw,
  Maximize,
  Minimize,
  Moon,
  Sun,
} from 'lucide-react';

export default function Page() {
  return (
    <FloatingBarControl>
      <HeavyDashboard />
      <HeavyChart />
      <HeavyTable />
    </FloatingBarControl>
  );
}

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // This is a synchronous block to simulate a slow component.
  }
}

function HeavyDashboard() {
  console.log(
    'Rendering HeavyDashboard... (This should only happen once)',
  );

  wait(500);

  const recentDeployments = [
    {
      id: 'dpl_1',
      project: 'acme-corp-website',
      status: 'Ready',
      time: '2m ago',
    },
    {
      id: 'dpl_2',
      project: 'internal-tools',
      status: 'Ready',
      time: '1h ago',
    },
    {
      id: 'dpl_3',
      project: 'docs-site',
      status: 'Error',
      time: '3h ago',
    },
    {
      id: 'dpl_4',
      project: 'marketing-campaign',
      status: 'Ready',
      time: '5h ago',
    },
  ];

  return (
    <section id="dashboard" className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold">10,482</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold">$84,392</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-gray-500">New Orders</h2>
          <p className="text-3xl font-bold">1,204</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-gray-500">Conversion Rate</h2>
          <p className="text-3xl font-bold">2.4%</p>
        </div>
      </div>
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="p-4">
          <h2 className="font-semibold">
            Recent Deployments
          </h2>
        </div>
        <ul className="divide-y border-t">
          {recentDeployments.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    'mr-3 h-2 w-2 rounded-full',
                    {
                      'bg-green-500': d.status === 'Ready',
                      'bg-red-500': d.status === 'Error',
                    },
                  )}
                ></div>
                <span className="font-mono text-sm">
                  {d.project}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {d.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HeavyChart() {
  console.log(
    'Rendering HeavyChart... (This should only happen once)',
  );

  wait(500);

  const salesData = [
    65, 59, 80, 81, 56, 55, 40, 30, 70, 90, 45, 62,
  ];

  const trafficData = [
    { source: 'Direct', value: 38.5, color: 'bg-blue-500' },
    {
      source: 'Referral',
      value: 22.5,
      color: 'bg-indigo-500',
    },
    { source: 'Social', value: 18.5, color: 'bg-sky-500' },
    {
      source: 'Organic',
      value: 20.5,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <section id="charts" className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
          <h2 className="mb-2 text-lg font-semibold">
            Monthly Sales
          </h2>
          <div className="flex h-64 justify-between space-x-2">
            {salesData.map((value, index) => (
              <div
                key={index}
                className="grid flex-1 items-end"
              >
                <div
                  className="bg-gray-200"
                  style={{
                    height: `${(value / 100) * 100}%`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">
          <h2 className="mb-2 text-lg font-semibold">
            Traffic Source
          </h2>
          <div className="space-y-4">
            {trafficData.map((data) => (
              <div key={data.source}>
                <div className="flex justify-between text-sm">
                  <span>{data.source}</span>
                  <span>{data.value}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={cn(
                      'h-2 rounded-full',
                      data.color,
                    )}
                    style={{ width: `${data.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeavyTable() {
  console.log(
    'Rendering HeavyTable... (This should only happen once)',
  );

  wait(500);

  const tableData = Array.from({ length: 100 }, (_, i) => ({
    id: `prj_${'a' + (i * 7).toString(16).padStart(5, '0')}`,
    name: `project-${i + 1}`,
    status: ['Production', 'Building', 'Error', 'Queued'][
      i % 4
    ],
    lastUpdated: `${i + 1}h ago`,
    domain: `app-${i + 1}.vercel.app`,
  }));

  const statusColors = {
    Production: 'green',
    Building: 'yellow',
    Error: 'red',
    Queued: 'gray',
  };

  return (
    <section id="tables" className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="max-h-[85vh] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10 border-b bg-gray-50/80 backdrop-blur-sm">
              <tr>
                <th className="p-4 font-semibold">
                  Project Name
                </th>
                <th className="p-4 font-semibold">
                  Status
                </th>
                <th className="p-4 font-semibold">
                  Last Updated
                </th>
                <th className="p-4 font-semibold">
                  Domain
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-4 font-mono">
                    {row.name}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={statusColors[row.status]}
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-500">
                    {row.lastUpdated}
                  </td>
                  <td className="p-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                    >
                      {row.domain}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FloatingBarControl({ children }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const showBarPosition = 200;
      setIsBarVisible(window.scrollY > showBarPosition);

      const sections =
        containerRef.current.querySelectorAll('section');
      let currentSectionId = '';

      sections.forEach((section) => {
        const sectionTop =
          section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          currentSectionId = section.id;
        }
      });

      if (activeSection !== currentSectionId) {
        setActiveSection(currentSectionId);
      }

      // Calculate scroll progress
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const currentProgress =
        maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <div ref={containerRef}>
      {children}
      <FloatingBar
        isVisible={isBarVisible}
        currentSection={activeSection}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}

function FloatingBar({
  isVisible,
  currentSection,
  scrollProgress,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  console.log(
    `FloatingBar re-rendering. Section: ${currentSection}`,
  );

  const sections = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'charts', label: 'Analytics' },
    { id: 'tables', label: 'Projects' },
  ];

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // 監聽 ESC 鍵退出全螢幕的事件
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    );
    return () =>
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      );
  }, []);

  return (
    <div
      className={cn(
        'bg-background/80 fixed bottom-8 left-1/2 z-50 w-auto -translate-x-1/2 overflow-hidden rounded-full border text-sm shadow-lg backdrop-blur-sm transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-24',
      )}
    >
      <div className="flex h-14 items-center gap-2 p-2">
        {/* 1. 導覽按鈕 */}
        <div className="flex items-center gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={
                currentSection === section.id
                  ? 'secondary'
                  : 'ghost'
              }
              size="sm"
              className="rounded-full"
              onClick={() => handleScrollTo(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 2. 畫面與資料控制按鈕 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => console.log('Refresh clicked!')}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 3. 主要操作按鈕 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <FileDown className="h-4 w-4" />
          </Button>
          <Button size="icon" className="rounded-full">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="bg-primary/20 absolute bottom-0 left-0 h-1 w-full">
        <div
          className="bg-primary h-full w-full origin-left transition-transform duration-150 ease-linear"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </div>
  );
}
