import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

  return (
    <Button variant="secondary" onClick={() => navigate(-1)}>
      Cancel
    </Button>
  );
};

export default BackButton;