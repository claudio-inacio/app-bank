import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import CustomButton from './components/CustomButton'


function App() {
  const handleToast = () => {
  toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => toast.warning("Event has been created", { position: "top-left" }),
          },
        })
  }

  return (
    <>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>
            Track progress and recent activity for your Vite app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Your design system is ready. Start building your next component.
          <CustomButton onClick={() => handleToast()}>Click mewer</CustomButton>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
         
        </CardContent>
      </Card>
    </>
  )
}

export default App
