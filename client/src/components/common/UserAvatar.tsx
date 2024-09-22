import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiUser } from "react-icons/fi";

interface PropsTypes {
  profileURL: string;
  size?: string;
}

const UserAvatar = ({ profileURL, size }: PropsTypes) => {
  return (
    <Avatar className={size ? size : ""}>
      <AvatarImage className="w-full h-full object-cover rounded-full" src={profileURL} alt="@user" />
      <AvatarFallback>
        <AvatarFallback className="bg-background">
          <FiUser />
        </AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
