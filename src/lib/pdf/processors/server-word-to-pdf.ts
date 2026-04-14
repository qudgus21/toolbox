import { createPdfServerProcessor } from "@/lib/server/create-server-processor";

export default createPdfServerProcessor({ tool: "word-to-pdf", group: "office" });
