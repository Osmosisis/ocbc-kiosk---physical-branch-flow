
export type Region = 'CENTRAL' | 'EAST' | 'WEST' | 'NORTH' | 'ALL';

export interface Branch {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  isPremier: boolean;
  region: Region;
}

export interface User {
  name: string;
  tier: 'PREMIER BANKING' | 'PERSONAL BANKING';
  initials: string;
}

export interface QueueTicket {
  number: string;
  branchName: string;
  counterRange: string;
  validUntil: string;
}

export type AppStep = 
  | 'DASHBOARD'
  | 'RESOLUTION_PATH'
  | 'CONSULTATION_MODE'
  | 'INITIAL_QUEUE'
  | 'BRANCH_SELECTION'
  | 'TICKET_DISPLAY';
