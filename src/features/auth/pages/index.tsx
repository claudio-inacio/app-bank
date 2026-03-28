
import { useSessionstore } from '@/app/store/session-store';
import LoginForm from '../components/LoginForm';
import { Button } from '@/shared/components/ui/button';
import { useNavigate } from 'react-router';



const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSessionstore();
  return (
    <div>
      <h1>Login logado ? {isAuthenticated ? 'SIM' : 'NÃO'}</h1>
      <LoginForm />
      <Button onClick={() => navigate('/dashboard')}>DIRECIONAR</Button>
    </div>
  );
};

export default LoginPage;