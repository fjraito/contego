import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, hasSanity } from "@/sanity/env";

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
