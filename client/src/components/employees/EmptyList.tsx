import { Button } from '@/components/ui/button'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const EmptyList = () => {
  const {user} = useSelector((state: RootState) => state.auth)
  return (
    <>
    <div className="flex items-center">
    <h1 className="text-lg font-semibold md:text-2xl">Employees</h1>
  </div>
  <div
    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
  >
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">
        No employees were created
      </h3>
      <p className="text-sm text-muted-foreground">
        Please create an employee.
      </p>
      <Link to={`/${user?.role}/employees/create`}>
      <Button className="mt-4">Create Employee</Button>
      </Link>
    </div>
  </div>
    </>
  )
}

export default EmptyList
