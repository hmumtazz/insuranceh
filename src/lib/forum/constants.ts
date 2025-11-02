export const FORUM_CATEGORIES = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Open discussions about insurance',
  },
  {
    id: 'rates',
    name: 'Rate Discussions',
    description: 'Compare and discuss premium rates',
  },
  {
    id: 'claims',
    name: 'Claims Help',
    description: 'Get help with filing and managing claims',
  },
  {
    id: 'brokers',
    name: 'Broker Reviews',
    description: 'Share experiences with insurance brokers',
  },
  {
    id: 'tips',
    name: 'Money Saving Tips',
    description: 'Strategies to lower your premiums',
  },
  {
    id: 'news',
    name: 'Insurance News',
    description: 'Latest industry updates and changes',
  },
  {
    id: 'questions',
    name: 'Q&A',
    description: 'Ask and answer insurance questions',
  },
] as const;

export type ForumCategory = (typeof FORUM_CATEGORIES)[number]['id'];

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest Activity' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'new', label: 'Newest' },
] as const;
