"use client";

import { useQuery } from "@tanstack/react-query";
import { getDeedTemplateById } from "../actions/deeds";

export const useDeedTemplateById = (id: number) => {
  const query = useQuery({
    queryKey: ["deedTemplate", id],
    queryFn: async () => await getDeedTemplateById(id),
  });

  return query;
};
