
import { useSessionStore } from '@/app/store/session-store';
import LoginForm from '../components/LoginForm';
import { Button } from '@/shared/components/ui/button';
import { useNavigate } from 'react-router';
import { useUser } from '@/app/store/session-selectors';


const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useSessionStore();
  const user = useSessionStore((state) => state.user);


  const handleTestSetUser = () => {
    login({ user: { id: '22', name: 'Claudio Inácio', document: '094.198.819-89' }, token: '123123', balance: 1000.00 })
  }
  console.log({ user })
  // console.log({user})
  return (
    <div>
      <h1>Login logado ? {isAuthenticated ? 'SIM' : 'NÃO'}</h1>
      <LoginForm />
      <Button onClick={() =>
        // navigate('/dashboard')
        handleTestSetUser()
      }
      >
        DIRECIONAR
      </Button>
    </div>
  )
}

export default LoginPage;