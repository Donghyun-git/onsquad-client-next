import { SquadMembers } from '@/features/squad/members';

interface SquadMembersPageProps {
  squadId: number;
}

const SquadMembersPage = ({ squadId }: SquadMembersPageProps) => {
  return <SquadMembers squadId={squadId} />;
};

export default SquadMembersPage;
