import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(1000).fit("max").auto("format").url();
}
