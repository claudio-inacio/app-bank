import { AuthShell } from '../components/auth-shell';
import { LoginCard } from '../components/login-card';
import { LoginForm } from '../components/Login-form';
import { useLogin } from '../hooks/useLogin';


const LoginPage = () => {
  const {
    mutateAsync: loginMutation,
    isPending,
    isError,
    isSuccess,
  } = useLogin();
  const handleLogin = async (values: { document: string; password: string }) => {
    await loginMutation(values);
  };


  return (
    <AuthShell>
      <LoginCard>
        <LoginForm isError={isError} isSuccess={isSuccess} isLoading={isPending} handleFunction={handleLogin} />
      </LoginCard>
    </AuthShell>

  )
}
export default LoginPage;