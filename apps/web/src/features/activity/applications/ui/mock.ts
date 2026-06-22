export type ApplicationStatus = 'progress' | 'accepted' | 'rejected';

export type ApplicationItem = {
  id: number;
  type: 'crew' | 'squad';
  targetName: string;
  ownerName: string;
  imageUrl?: string;
  status: ApplicationStatus;
};
