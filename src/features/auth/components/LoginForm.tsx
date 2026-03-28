import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';


const LoginForm = () => {
    return (
        <div>
            <Input placeholder="Username" />
            <Input placeholder="Password" type="password" />
            <Button>Login</Button>
        </div>
    );
};

export default LoginForm;