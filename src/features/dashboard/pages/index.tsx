
import { useSessionStore } from '@/app/store/use-session-store';
import { DashboardOverview } from '@/features/dashboard';
import { Button } from '@/shared/components/ui/button';

const DashboardPage = () => {

    const { logout } = useSessionStore();

    return (
        <div>
            <h1>Dashboard</h1>
            <DashboardOverview />

            <Button onClick={() => {
                logout();
            }}
            >
                DIRECIONAR
            </Button>
        </div>
    );
};

export default DashboardPage;