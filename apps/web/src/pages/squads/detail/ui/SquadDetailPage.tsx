import { SquadDetail } from '@/features/squad/detail';

interface SquadDetailPageProps {
  id: string;
}

const SquadDetailPage = ({ id }: SquadDetailPageProps) => {
  return <SquadDetail id={id} />;
};

export default SquadDetailPage;
