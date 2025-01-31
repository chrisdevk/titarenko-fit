import { Button } from "@/components/ui/button";

interface LogoutCompProps {
  user_name: string;
  button_text: string;
}

export const LogoutComp = ({ user_name, button_text }: LogoutCompProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-purple-custom px-4 py-6">
      <h3 className="uppercase text-white">{user_name}</h3>
      <Button variant="secondary">{button_text}</Button>
    </div>
  );
};
