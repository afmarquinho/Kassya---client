
import { MenuButton } from "@/src/components";
import { BriefcaseBusiness, ChartNoAxesCombined } from "lucide-react";

const page = () => {
  return (
    <div className={`flex gap-5`}>
      <MenuButton href="purchase/analytics" icon={ChartNoAxesCombined} name="Analytics" />
      <MenuButton href="purchase/management" icon={BriefcaseBusiness} name="Management"/>
    </div>
  );
};
export default page;
