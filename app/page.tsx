import Hero from "@/components/hero";
import { getSecretMessage, getUser } from "@/lib/data-service";

import Home from "@/components/Home";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    return <Hero />;
  }

  const secretMessage = await getSecretMessage();

  return (
    <>
      <Home secretMessage={secretMessage?.message ?? ""} user={user} />
    </>
  );
}
