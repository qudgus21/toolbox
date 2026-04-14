import { createPdfServerProcessor } from "@/lib/server/create-server-processor";

export default createPdfServerProcessor({ tool: "pdf-to-word", group: "office" });
