'use client';

import {Search} from 'lucide-react';
import {Input} from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {SORT_OPTIONS} from '~/constants';
import type {TokenFilters} from '~/types';

interface TokenFiltersProps {
  filters: TokenFilters;
  onFiltersChange: (filters: TokenFilters) => void;
  showPhaseFilter?: boolean;
}

export function TokenFiltersBar({
  filters,
  onFiltersChange,
  showPhaseFilter = true,
}: TokenFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tokens…"
          value={filters.search ?? ''}
          onChange={e => onFiltersChange({...filters, search: e.target.value})}
          className="pl-9 h-9"
        />
      </div>

      <div className="flex gap-2">
        {showPhaseFilter && (
          <Select
            value={filters.phase ?? 'all'}
            onValueChange={value =>
              onFiltersChange({
                ...filters,
                phase: value as TokenFilters['phase'],
              })
            }
          >
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="settling">Settling</SelectItem>
              <SelectItem value="completed">Trading</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Select
          value={filters.sortBy ?? 'trending'}
          onValueChange={value =>
            onFiltersChange({
              ...filters,
              sortBy: value as TokenFilters['sortBy'],
            })
          }
        >
            <SelectTrigger className="w-[130px] h-9" title="Sort by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
