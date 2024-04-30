"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyGroupInvitations } from "../service";

export const useMyGroupInvitations = () => {
  const query = useQuery({
    queryKey: ["groupInvitations"],
    queryFn: async () => await getMyGroupInvitations(),
  });

  return query;
};