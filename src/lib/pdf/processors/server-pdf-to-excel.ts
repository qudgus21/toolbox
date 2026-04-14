import { createPdfServerProcessor } from "@/lib/server/create-server-processor";

export default createPdfServerProcessor({ tool: "pdf-to-excel", group: "office" });
