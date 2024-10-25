import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = { name: string; href: string; icon: LucideIcon };
const NewButton = ({ name, href, icon: Icon }: Props) => {
  return (
    <Link
      href={href}
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 `}
    >
      <Icon className={`w-5`} />
      {name}
    </Link>
  );
};
export default NewButton;
