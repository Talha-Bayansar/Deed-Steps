"use client";
import { ListTile } from "@/components/ListTile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteGroup } from "@/groups/service";
import { routes } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const DeleteGroup = () => {
  const t = useTranslations("global");
  const tGroupSettingsPage = useTranslations("GroupSettingsPage");
  const { groupId } = useParams<{ groupId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => await deleteGroup(Number(groupId)),
    onSuccess: () => {
      setIsOpen(false);
      router.push(routes.groups.root);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <ListTile className="text-destructive">
          {tGroupSettingsPage("delete_group")}
        </ListTile>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {tGroupSettingsPage("delete_group_modal_title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {tGroupSettingsPage("delete_group_modal_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
