import { createPdfServerProcessor } from "@/lib/server/create-server-processor";

export default createPdfServerProcessor({ tool: "pdf-to-pdfa", group: "pdf" });
