import { User } from "@supabase/supabase-js";
import TextExpander from "./textExpander";
import AlertButton from "./alertButton";
import { Button } from "./ui/button";
import { deleteAccountAction, signOutAction } from "@/app/actions/auth";

type HomeProps = {
  secretMessage: string | null;
  user: User;
};

export default function Home({ secretMessage, user }: HomeProps) {
  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-12">
        {secretMessage && (
          <div className="bg-accent max-w-2xl text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
            <TextExpander maxWords={30}>
              {`Secret Message: ${secretMessage}`}
            </TextExpander>
          </div>
        )}
        <div className="flex flex-col gap-10 items-start">
          <div>
            <h2 className="font-medium text-xl mb-4">
              Logged in as <span className="font-semibold">{user.email}</span>
            </h2>
            <p>Account details:</p>
            <pre className="text-xs font-mono p-3 rounded border max-h-48 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>

          <div className="flex gap-4">
            <AlertButton>
              <form action={deleteAccountAction}>
                <Button type="submit">Delete Account</Button>
              </form>
            </AlertButton>
            <form action={signOutAction}>
              <Button type="submit" variant={"outline"}>
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
