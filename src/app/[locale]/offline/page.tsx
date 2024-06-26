import { Main } from "@/components/layout/Main";
import { WifiOff } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("OfflinePage");
  return (
    <Main className="grid h-screen place-content-center place-items-center gap-8 p-8">
      <WifiOff className="text-destructive" size={60} />
      <p className="text-center">{t("description")}</p>
    </Main>
  );
};

export default Page;
