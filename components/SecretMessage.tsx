import { createSecretMessageAction } from "@/app/actions/app";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SubmitButton } from "./submit-button";
import { Textarea } from "./ui/textarea";

export default function SecretMessage({
  secretMessage,
}: {
  secretMessage: string;
}) {
  return (
    <form className="flex-1 gap-4 flex flex-col min-w-64" action="">
      <Label className="text-xl">Secret Message</Label>
      <Textarea
        className="w-96 "
        name="message"
        defaultValue={secretMessage || ""}
        placeholder="Enter message here"
        id="secret-message"
        rows={4}
      />
      <div className="flex justify-start">
        <SubmitButton
          pendingText="Submitting..."
          formAction={createSecretMessageAction}
        >
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
