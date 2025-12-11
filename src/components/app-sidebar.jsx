import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { Book, Folder, FileText } from 'lucide-react';

const chapters = [
  {
    label: 'Ch 1: 基本概念',
    icon: Folder,
    sections: [
      {
        label: 'Ch 1-1: 基本概念',
        icon: Book,
        pages: [
          {
            label: 'Re-render',
            icon: FileText,
            href: '/ch-1/re-render',
          },
        ],
      },
    ],
  },
  {
    label: 'Ch 2: State 與 Effect',
    icon: Folder,
    sections: [
      {
        label: 'Ch 2-1',
        icon: Book,
        pages: [
          {
            label: 'Countdown',
            href: '/ch-2/countdown',
            icon: FileText,
          },
        ],
      },
      {
        label: 'Ch 2-2: 如何正確管理 State',
        icon: Book,
        pages: [
          {
            label: 'Form 表單 錯誤示範',
            href: '/ch-2/form-data-error-1',
            icon: FileText,
          },
          {
            label: 'Form 表單 錯誤示範 2',
            href: '/ch-2/form-data-error-2',
            icon: FileText,
          },
          {
            label: 'Form 表單 更好的寫法',
            href: '/ch-2/form-data-better',
            icon: FileText,
          },
          {
            label: 'Form 表單 - action',
            href: '/ch-2/form-without-state',
            icon: FileText,
          },
          {
            label: 'State 範例 - undo',
            href: '/ch-2/state-example-undo',
            icon: FileText,
          },
          {
            label: 'Ref 範例 - undo',
            href: '/ch-2/ref-example-undo',
            icon: FileText,
          },
          {
            label: 'Ref 範例 - undo/redo',
            href: '/ch-2/ref-example-undo-redo',
            icon: FileText,
          },
        ],
      },
      {
        label: 'Ch 2-3: 如何正確使用 Effect',
        icon: Book,
        pages: [
          {
            label: 'Effect Timing',
            icon: FileText,
            href: '/ch-2/effect-timing',
          },
          {
            label: 'Effect Search without init',
            icon: FileText,
            href: '/ch-2/effect-search-without-init',
          },
          {
            label: 'Effect Search 錯誤示範',
            icon: FileText,
            href: '/ch-2/effect-search-error',
          },
          {
            label: 'Effect Search 更好的寫法',
            icon: FileText,
            href: '/ch-2/effect-search-better',
          },
          {
            label: 'Effect Toast 錯誤示範',
            icon: FileText,
            href: '/ch-2/effect-toast-error',
          },
          {
            label: 'Effect Toast 更好的寫法',
            icon: FileText,
            href: '/ch-2/effect-toast-better',
          },
          {
            label: 'Autofocus 錯誤示範',
            icon: FileText,
            href: '/ch-2/search-autofocus-error',
          },
          {
            label: 'Autofocus 更好的寫法',
            icon: FileText,
            href: '/ch-2/search-autofocus-better',
          },
        ],
      },
    ],
  },
  {
    label: 'Ch 3: 效能優化',
    icon: Folder,
    sections: [
      {
        label: 'Ch 3-1: 效能優化',
        icon: Book,
        pages: [
          {
            label: 'State 設為相同值時不會 re-render',
            icon: FileText,
            href: '/ch-3/re-render-with-same-value',
          },
          {
            label: 'Does Prop Render',
            icon: FileText,
            href: '/ch-3/does-prop-render',
          },
          {
            label: 'Context',
            icon: FileText,
            href: '/ch-3/context',
          },
        ],
      },
    ],
  },
  {
    label: 'Ch 4: 觀察 re-render',
    icon: Folder,
    sections: [
      {
        label: 'Ch 4-1: 觀察 re-render',
        icon: Book,
        pages: [
          {
            label: '二分除錯法',
            icon: FileText,
            href: '/ch-4/binary-debugging',
          },
          {
            label: 'Developer Tool',
            icon: FileText,
            href: '/ch-4/developer-tool',
          },
        ],
      },
    ],
  },
  {
    label: 'Ch 5: 效能優化',
    icon: Folder,
    sections: [
      {
        label: '5-1 狀態下移',
        icon: Book,
        pages: [
          {
            label: 'State Down Error',
            icon: FileText,
            href: '/ch-5/state-down-error',
          },
          {
            label: 'State Down Better',
            icon: FileText,
            href: '/ch-5/state-down-better',
          },
        ],
      },
      {
        label: '5-2 內容上移',
        icon: Book,
        pages: [
          {
            label: 'Content Lifting 錯誤示範',
            icon: FileText,
            href: '/ch-5/content-lifting-wrong',
          },
          {
            label: 'Content Lifting 更好的寫法',
            icon: FileText,
            href: '/ch-5/content-lifting-better',
          },
          {
            label: 'Content Lifting Demo',
            icon: FileText,
            href: '/ch-5/content-lifting-demo',
          },
        ],
      },
      {
        label: '5-3 狀態保留',
        icon: Book,
        pages: [
          {
            label: 'Activity Problem 1',
            icon: FileText,
            href: '/ch-5/activity-problem-1',
          },
          {
            label: 'Activity Problem 2',
            icon: FileText,
            href: '/ch-5/activity-problem-2',
          },
          {
            label: 'Activity Problem 3',
            icon: FileText,
            href: '/ch-5/activity-problem-3',
          },
          {
            label: 'Activity Better',
            icon: FileText,
            href: '/ch-5/activity-better',
          },
        ],
      },
      {
        label: '5-4 Hook 記憶化',
        icon: Book,
        pages: [
          {
            label: 'Primitive Reference',
            icon: FileText,
            href: '/ch-5/primitive-reference',
          },
          {
            label: 'Primitive Reference - memo',
            icon: FileText,
            href: '/ch-5/primitive-reference-memo',
          },
          {
            label: "don't need useMemo",
            icon: FileText,
            href: '/ch-5/dont-need-useMemo',
          },
          {
            label: 'memo error',
            icon: FileText,
            href: '/ch-5/memo-error',
          },
        ],
      },
      {
        label: '5-5 React.memo',
        icon: Book,
        pages: [
          {
            label: 'memo-1',
            icon: FileText,
            href: '/ch-5/memo-1',
          },
          {
            label: 'memo-2',
            icon: FileText,
            href: '/ch-5/memo-2',
          },
          {
            label: 'memo-3',
            icon: FileText,
            href: '/ch-5/memo-3',
          },
          {
            label: 'memo-4',
            icon: FileText,
            href: '/ch-5/memo-4',
          },
          {
            label: 'memo-5',
            icon: FileText,
            href: '/ch-5/memo-5',
          },
        ],
      },
      {
        label: '5-6 Context',
        icon: Book,
        pages: [
          {
            label: 'Context Problem',
            icon: FileText,
            href: '/ch-5/context-problem',
          },
          {
            label: 'Context Menu',
            icon: FileText,
            href: '/ch-5/context-menu',
          },
        ],
      },
      {
        label: '5-7 Compiler',
        icon: Book,
        pages: [
          {
            label: 'Compiler 1',
            icon: FileText,
            href: '/ch-5/compiler-1',
          },
          {
            label: 'Compiler 狀態下移',
            icon: FileText,
            href: '/ch-5/compiler-state-down',
          },
          {
            label: 'Compiler 內容上移',
            icon: FileText,
            href: '/ch-5/compiler-content-lifting',
          },
          {
            label: 'Compiler Primitive Reference',
            icon: FileText,
            href: '/ch-5/compiler-primitive-reference',
          },
          {
            label: 'inline function',
            icon: FileText,
            href: '/ch-5/compiler-memo-with-inline-function',
          },
          {
            label: 'compiler memo children',
            icon: FileText,
            href: '/ch-5/compiler-memo-children',
          },
          {
            label: 'compiler context',
            icon: FileText,
            href: '/ch-5/compiler-context',
          },
        ],
      },
    ],
  },
  {
    label: 'Ch 6: 效能優化',
    icon: Folder,
    sections: [
      {
        label: 'Ch 6-1: 效能優化',
        icon: Book,
        pages: [
          {
            label: 'Demo 1',
            icon: FileText,
            href: '/ch-6/demo-1',
          },
        ],
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex flex-row items-center justify-between">
        <p>React Workshop</p>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <Accordion
          type="multiple"
          collapsible="true"
          defaultValue={chapters.map(({ label }) => label)}
        >
          {chapters.map(({ label, icon: Icon, sections }) => (
            <AccordionItem key={label} value={label} className="border-none">
              <SidebarGroup>
                <AccordionTrigger>
                  <SidebarChapterLabel label={label} icon={Icon} />
                </AccordionTrigger>

                <AccordionContent>
                  <SidebarGroupContent>
                    <SidebarSections sections={sections} />
                  </SidebarGroupContent>
                </AccordionContent>
              </SidebarGroup>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarChapterLabel({ label, icon: Icon }) {
  return (
    <SidebarGroupLabel>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </SidebarGroupLabel>
  );
}

function SidebarSections({ sections }) {
  return (
    <Accordion type="multiple" collapsible="true">
      {sections.map(({ label, icon: Icon, pages }) => (
        <AccordionItem value={label} key={label} className="border-none">
          <SidebarGroup>
            <AccordionTrigger className="h-4">
              <SidebarGroupLabel>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </SidebarGroupLabel>
            </AccordionTrigger>

            <AccordionContent>
              <SidebarGroupContent className="mt-2 ml-3.5 flex w-auto flex-col gap-1 border-l pl-2">
                <SidebarPages pages={pages} />
              </SidebarGroupContent>
            </AccordionContent>
          </SidebarGroup>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function SidebarPages({ pages }) {
  return pages.map(({ label, href, icon: Icon }) => (
    <SidebarMenuButton asChild key={label} className="text-xs">
      <Link href={href} className="flex items-center">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  ));
}
