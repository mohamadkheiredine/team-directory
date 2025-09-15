'use client';

import { ArrowDown, ArrowUpWideNarrow, ArrowUp } from 'lucide-react';
import { DropdownMenu } from './dropdown-menu';
import { Button } from './button';

type Dir = 'asc' | 'desc';

export interface SortColumn {
  id: string;
  label: string;
}

interface SortDropdownProps {
  /** Columns you want to offer in the sort menu */
  columns: SortColumn[]
  /** Current sort (to show the ✓ tick). Pass null if none. */
  value?: { id: string; dir: Dir } | null
  /** Called when the user chooses Asc / Desc */
  onSelect: (columnId: string, dir: Dir) => void
}

export function SortDropdown({
  columns,
  onSelect,
}: Readonly<SortDropdownProps>) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant={'outlinedGhost'} className={'bg-secondary'}>
          <ArrowUpWideNarrow className="h-4 w-4" />
          {'Sort'}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="start" className="bg-gray-50">
        {columns.map(({ id, label }) => (
          <div key={id}>
            <DropdownMenu.Label className='text-xs font-semibold text-muted-foreground'>
              {label}
            </DropdownMenu.Label>
            <DropdownMenu.Item
              onSelect={() => onSelect(id, 'asc')}
              className="ml-2 flex items-center justify-start gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              {'Asc'}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => onSelect(id, 'desc')}
              className="ml-2 flex items-center justify-start gap-2"
            >
              <ArrowDown className="h-4 w-4" />
              {'Desc'}
            </DropdownMenu.Item>
          </div>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}