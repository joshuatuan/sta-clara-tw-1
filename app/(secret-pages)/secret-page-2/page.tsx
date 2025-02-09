import SecretMessage from "@/components/SecretMessage";

import { getSecretMessage } from "@/lib/data-service";

export default async function Page() {
  const secretMessage = await getSecretMessage();

  return <SecretMessage secretMessage={secretMessage?.message ?? ""} />;
}
