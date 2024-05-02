"use client";

import { EmptyView } from "@/components/EmptyView";
import { ListTile, ListTileSkeleton } from "@/components/ListTile";
import { Title, TitleSkeleton } from "@/components/layout/Title";
import { View } from "@/components/layout/View";
import { useDeedTemplatesByGroupId } from "@/deeds/hooks/useDeedTemplatesByGroupId";
import { useGroupById } from "@/groups/hooks/useGroupById";
import { routes } from "@/lib/routes";
import { generateArray, isArrayEmpty } from "@/lib/utils";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CreateDeedTemplate } from "./CreateDeedTemplate";

export const DeedTemplatesView = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: group, isLoading: isLoadingGroup } = useGroupById(groupId);
  const { data: deedTemplates, isLoading: isLoadingDeedTemplates } =
    useDeedTemplatesByGroupId(groupId);

  if (isLoadingDeedTemplates || isLoadingGroup)
    return <DeedTemplatesViewSkeleton />;

  if (!deedTemplates || isArrayEmpty(deedTemplates) || !group)
    return (
      <EmptyView
        Icon={ListChecks}
        message="It looks like this group does not have any deed templates yet."
      />
    );

  return (
    <>
      <div className="flex justify-between items-start">
        <Title>
          Deed templates: <span className="text-primary">{group.name}</span>
        </Title>
        <CreateDeedTemplate />
      </div>
      <View className="gap-0">
        {deedTemplates.map((deedTemplate) => (
          <Link
            key={deedTemplate.id}
            href={
              routes.groups
                .id(groupId)
                .deedTemplates.id(deedTemplate.id.toString()).edit.root
            }
          >
            <ListTile>{deedTemplate.name}</ListTile>
          </Link>
        ))}
      </View>
    </>
  );
};

const DeedTemplatesViewSkeleton = () => {
  return (
    <>
      <TitleSkeleton />
      <View className="gap-0">
        {generateArray().map((i) => {
          return <ListTileSkeleton key={i} />;
        })}
      </View>
    </>
  );
};