
import { useSessionStore } from '@/app/store/use-session-store';
import LoginForm from '../components/LoginForm';
import { Button } from '@/shared/components/ui/button';
import { useNavigate } from 'react-router';
import { useLogin } from '../hooks/useLogin';


const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useSessionStore();
  const user = useSessionStore((state) => state.user);
  const { mutateAsync: loginMutation, isPending, isSuccess, isError } = useLogin();


  const handleTestSetUser = () => {
    login({ user: { id: '22', name: 'Claudio Inácio', document: '234.120.130-05' }, token: '123123', balance: 1000.00 })
  }
  const handleLogin = async () => {
    const response = await loginMutation({ document: '234.120.130-05', password: '123123' });
    console.log({ response })
  }

  console.log({isPending})
  return (
    <div>
      <h1>Login logado ? {isAuthenticated ? 'SIM' : 'NÃO'}</h1>
      <LoginForm />
      <Button onClick={() => {

        // navigate('/dashboard')
        // if (!isAuthenticated) {
        //   handleTestSetUser()
        // } else {
        //   console.log('aqui')
        //   logout();
        // }
        handleLogin();
      }
      }
      >
        DIRECIONAR
      </Button>
    </div>
  )
}

export default LoginPage;