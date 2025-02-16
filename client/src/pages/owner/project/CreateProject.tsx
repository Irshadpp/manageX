import { ScrollArea } from '@radix-ui/react-scroll-area';
import CreateForm from './CreateForm';
import BackButton from '@/components/common/BackButton';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/services/api/commonRequest';
import SubscriptionWarning from '@/components/subscription/SubscriptionWarning';

const CreateProject = () => {
  const [IslimitExceed, setIsLimitExceed] = useState(false);

  const projectResource = async () => {
    const res = await apiRequest({
      method: "GET",
      url: import.meta.env.VITE_PROJECT_URL,
      route: "/api/v1/project/subscription-limit",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.success) {
      setIsLimitExceed(false);
    } else {
      setIsLimitExceed(true);
    }
  };
  useEffect(() => {
    projectResource();
  }, []);

  if(IslimitExceed){
    return (
      <div className='h-full p-5'>
        <SubscriptionWarning resource="Projects"/>
      </div>
    )
  }
    return (
        <ScrollArea className="w-full h-screen">
          <div className="flex items-center justify-between p-5">
            <h1 className="text-2xl font-bold">Create Project</h1>
            <BackButton />
          </div>
          <CreateForm />
        </ScrollArea>
      );
}

export default CreateProject
