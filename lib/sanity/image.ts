import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: unknown): string | null {
  if (!builder || !source) return null;
  return builder
    .image(source as Parameters<typeof builder.image>[0])
    .width(1000)
    .fit("max")
    .auto("format")
    .url();
}
