export type CardProps={
    children: React.ReactNode; 
    className?: string; 
}
export type StatusType = 'secure' | 'warning' | 'danger' | 'neutral';

export type StatusDefaultProps = {
  status: StatusType;  // En lugar de string
  text: string;
};