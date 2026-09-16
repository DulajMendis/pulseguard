export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function formatColomboTime(date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

export function getColomboDayTimeStatus(date = new Date()): {
  isBusinessHours: boolean;
  statusLabel: string;
} {
  const colomboHourStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo',
    hour: 'numeric',
    hour12: false,
  }).format(date);
  
  const hour = parseInt(colomboHourStr, 10);
  const isBusinessHours = hour >= 8 && hour < 19;

  return {
    isBusinessHours,
    statusLabel: isBusinessHours ? 'Active · Colombo (UTC+5:30)' : 'Off-Hours · Async Monitored',
  };
}
