import { useStoreLogout } from "@/store-auth/hooks/useStoreLogout"
import Button from '@/components/ui/Button'

export default function Home() {
    const { mutate: logout, isPending } = useStoreLogout()
  
  return<><h1>Home Page</h1><Button onClick={logout} disabled={isPending} className="flex-center py-2">
  {isPending ? 'Logging out...' : 'Logout'}
</Button></> 
}

