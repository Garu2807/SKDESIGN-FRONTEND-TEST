import { useState, useMemo } from 'react';
import { SortKey, User } from '../types/User';

const getNestedValue = (obj: any, path: string) =>
  path.split('.').reduce((acc, part) => acc && acc[part], obj);

const useSort = (
  items: User[],
  config: { key: SortKey; direction: 'ascending' | 'descending' } | null = null
) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    if (!sortConfig) return items;
    const sortableItems = [...items];
    sortableItems.sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (key: SortKey) => {
    if (!sortConfig) return;
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  return { items: sortedItems, requestSort, getClassNamesFor, sortConfig };
};

export default useSort;
