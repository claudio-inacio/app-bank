
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
    <div className="container relative mx-auto flex min-h-screen items-center justify-center px-4 py-10">
      <LoginCard>
        <LoginForm isError={isError} isSuccess={isSuccess} isLoading={isPending} handleFunction={handleLogin} />
      </LoginCard>
    </div>

  )
}
export default LoginPage;