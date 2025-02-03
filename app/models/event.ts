export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'SERVICE' | 'MEETING' | 'SPECIAL';
  participants: {
    role: string;
    userId?: string;
  }[];
  mediaLinks?: string[];
  department?: string;
}