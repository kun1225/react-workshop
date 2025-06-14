import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarHeader,
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
    label: 'Ch 2: State 與 Effect',
    icon: Folder,
    sections: [
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
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <p>React Workshop</p>
      </SidebarHeader>

      <SidebarContent>
        <Accordion
          type="multiple"
          collapsible="true"
          defaultValue={chapters.map(({ label }) => label)}
        >
          {chapters.map(
            ({ label, icon: Icon, sections }) => (
              <AccordionItem key={label} value={label}>
                <SidebarGroup>
                  <AccordionTrigger>
                    <SidebarChapterLabel
                      label={label}
                      icon={Icon}
                    />
                  </AccordionTrigger>

                  <AccordionContent>
                    <SidebarGroupContent>
                      <SidebarSections
                        sections={sections}
                      />
                    </SidebarGroupContent>
                  </AccordionContent>
                </SidebarGroup>
              </AccordionItem>
            ),
          )}
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
    <Accordion
      type="multiple"
      collapsible="true"
      defaultValue={sections.map(({ label }) => label)}
    >
      {sections.map(({ label, icon: Icon, pages }) => (
        <AccordionItem value={label} key={label}>
          <SidebarGroup>
            <AccordionTrigger>
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
    <SidebarMenuButton
      asChild
      key={label}
      className="text-xs"
    >
      <Link href={href} className="flex items-center">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  ));
}
