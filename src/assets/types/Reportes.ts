export type CardProps={
    children: React.ReactNode; // permite string, JSX, componentes, etc.
    className?: string; 
  }
export type Status = 'online'|'warning'|'critical'|'offline'
export interface StatusBadgeProps {
  status: Status;
}