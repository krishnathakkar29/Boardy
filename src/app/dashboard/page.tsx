import BoardList from "@/components/dashboard/board-list";
import EmptyOrg from "@/components/dashboard/empty-org";
import { auth } from "@clerk/nextjs/server";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const page = async ({ searchParams }: DashboardPageProps) => {
  const { orgId } = await auth();
  return (
    <div className="flex-1 p-6">
      {orgId ? (
        <>
          <BoardList orgId={orgId!} query={searchParams} />
        </>
      ) : (
        <>
          <EmptyOrg />
        </>
      )}
    </div>
  );
};

export default page;
