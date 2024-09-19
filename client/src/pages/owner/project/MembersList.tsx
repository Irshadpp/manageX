import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import UserAvatar from '/useravatar.png';
import { FiSearch } from "react-icons/fi";
import InputWithIcon from "@/components/custome/InputWithIcon";
import MembersSkelton from "@/components/project/MembersSkelton";
import { apiRequest } from "@/services/api/commonRequest";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MembersList({
  setIsModalOpen,
  setMembers,
}: {
  setIsModalOpen: any;
  setMembers: any;
}) {
  const [loading, setLoading] = useState(false);
  const [membersList, setMembersList] = useState<
    (any & { selected?: boolean })[]
  >([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_PROJECT_URL,
        route: "/api/v1/users/members?role=employee",
        headers:{
            "Content-Type":"application/json"
        }
      });
      setLoading(false);
      if (res.success) {
        const membersWithSelection =
          res.data.map((member: any) => ({
            ...member,
            selected: false,
          }));
        setMembersList(membersWithSelection);
      }
    };
    fetchMembers();
  }, []);

  const handleCheckboxChange = (id: string) => {
    const updatedMembers = membersList.map((member) =>
      member.id === id ? { ...member, selected: !member.selected } : member
    );
    setMembersList(updatedMembers);
  };

  const handleAddMembers = () => {
    const selectedMembers = membersList.filter((member) => member.selected);

    const selectedMembersId = selectedMembers.map((member) => {
      let mem = member.selected;
      return mem && member.id;
    });

    setValue("members", selectedMembersId);

    setMembers(selectedMembers);
    setIsModalOpen(false);
  };
  return (
    <div>
      <InputWithIcon icon={<FiSearch />} placeholder="Search..." />
      <ScrollArea className="h-52 py-2">
        {loading ? (
          <MembersSkelton />
        ) : (
          membersList.map((member, index: number) => (
            <label
              htmlFor={`member_${member.id}`}
              className="cursor-pointer"
              key={index}
            >
              <div
                key={member._id}
                className="flex items-center space-x-4 p-2 hover:bg-backgroundAccent active:opacity-80"
              >
                <Checkbox
                  id={`member_${member.id}`}
                  checked={member.selected}
                  onCheckedChange={() => handleCheckboxChange(member.id)}
                />
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-clip">
                    <img
                      src={member.profileURL || UserAvatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>
                    <p>
                      {member.fName} {member.lName}
                    </p>
                    <p>{member.email}</p>
                  </div>
                </div>
              </div>
            </label>
          ))
        )}
      </ScrollArea>
      <Button className="w-full mt-5" onClick={handleAddMembers}>
        Add Members
      </Button>
    </div>
  );
}
