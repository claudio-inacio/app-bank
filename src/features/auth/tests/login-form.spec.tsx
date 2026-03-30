import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { LoginForm } from '../components/Login-form';



const mockedHandleLogin = vi.fn()
const mockedMutateAsync = vi.fn()

vi.mock("../hooks/use-login", () => ({
  useLogin: () => ({
    handleLogin: mockedHandleLogin,
    status: "idle",
    error: null,
    isLoading: false,
  }),
}))

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve renderizar os campos e botão", () => {
    render(<LoginForm handleFunction={mockedHandleLogin} isError={false} isSuccess={false} isLoading={false} />)

    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /entrar/i })
    ).toBeInTheDocument()
  })

  it("não deve permitir envio com campos vazios", async () => {
    render(<LoginForm handleFunction={mockedHandleLogin} isError={false} isSuccess={false} isLoading={false} />)

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => {
      expect(mockedHandleLogin).not.toHaveBeenCalled()
    })
  })

  it("deve chamar handleLogin com payload válido", async () => {
    const user = userEvent.setup()
    mockedMutateAsync.mockResolvedValueOnce(undefined)

    render(<LoginForm handleFunction={mockedMutateAsync} isError={false} isSuccess={false} isLoading={false} />)

    await user.type(screen.getByLabelText(/CPF/i), "234.120.130-05")
    await user.type(screen.getByLabelText(/senha/i), "123123")
    await user.click(screen.getByRole("button", { name: /entrar/i }))

    
    await waitFor(() => {
      expect(mockedMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          document: "234.120.130-05",
          password: "123123",
        }),
        expect.anything()
      )
    })
  })
})