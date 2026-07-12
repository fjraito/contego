import { NextStudio } from "next-sanity/studio";
import { hasSanity } from "@/sanity/env";
import config from "../../../sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!hasSanity) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0d0c", color: "#AEB5AF", fontFamily: "system-ui", padding: 24, textAlign: "center" }}>
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ color: "#F4F1EA", fontSize: 22, marginBottom: 12 }}>Studio not configured</h1>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>
            Create a Sanity project, then set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in
            <code> .env.local</code> and restart the dev server. The blog will keep using
            placeholder content until then.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
