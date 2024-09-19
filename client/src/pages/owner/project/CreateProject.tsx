import { ScrollArea } from '@radix-ui/react-scroll-area';
import CreateForm from './CreateForm';
import BackButton from '@/components/common/BackButton';

const CreateProject = () => {
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
