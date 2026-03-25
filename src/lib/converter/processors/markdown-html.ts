import type { ConverterResult } from "../types";

function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const htmlLines: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeContent: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let inBlockquote = false;

  function closeList() {
    if (inList) {
      htmlLines.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
    }
  }

  function closeBlockquote() {
    if (inBlockquote) {
      htmlLines.push("</blockquote>");
      inBlockquote = false;
    }
  }

  function processInline(text: string): string {
    // Images before links
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Bold + italic
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
    // Italic
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
    text = text.replace(/_(.+?)_/g, "<em>$1</em>");
    // Inline code
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    return text;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        htmlLines.push(
          codeLanguage
            ? `<pre><code class="language-${codeLanguage}">${escapeHtml(codeContent.join("\n"))}</code></pre>`
            : `<pre><code>${escapeHtml(codeContent.join("\n"))}</code></pre>`,
        );
        inCodeBlock = false;
        codeContent = [];
        codeLanguage = "";
      } else {
        closeList();
        closeBlockquote();
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    const trimmed = line.trim();

    // Horizontal rule
    if (/^(---+|\*\*\*+|___+)$/.test(trimmed)) {
      closeList();
      closeBlockquote();
      htmlLines.push("<hr />");
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      closeBlockquote();
      const level = headingMatch[1].length;
      htmlLines.push(`<h${level}>${processInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      closeList();
      if (!inBlockquote) {
        htmlLines.push("<blockquote>");
        inBlockquote = true;
      }
      htmlLines.push(`<p>${processInline(trimmed.slice(2))}</p>`);
      continue;
    } else if (inBlockquote) {
      closeBlockquote();
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || listType !== "ul") {
        closeList();
        htmlLines.push("<ul>");
        inList = true;
        listType = "ul";
      }
      htmlLines.push(`<li>${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        closeList();
        htmlLines.push("<ol>");
        inList = true;
        listType = "ol";
      }
      htmlLines.push(`<li>${processInline(olMatch[1])}</li>`);
      continue;
    }

    closeList();

    // Empty line
    if (trimmed === "") {
      closeBlockquote();
      continue;
    }

    // Paragraph
    htmlLines.push(`<p>${processInline(trimmed)}</p>`);
  }

  closeList();
  closeBlockquote();

  return htmlLines.join("\n");
}

function htmlToMd(html: string): string {
  let md = html;

  // Code blocks
  md = md.replace(/<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g, (_, lang, code) => {
    return "\n```" + (lang || "") + "\n" + unescapeHtml(code) + "\n```\n";
  });

  // Headings
  md = md.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_, level, content) => {
    return "#".repeat(Number(level)) + " " + stripTags(content).trim() + "\n";
  });

  // Horizontal rule
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n");

  // Blockquote
  md = md.replace(/<blockquote>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    return stripTags(content)
      .trim()
      .split("\n")
      .map((l: string) => "> " + l.trim())
      .filter((l: string) => l.trim() !== ">")
      .join("\n") + "\n";
  });

  // Lists
  md = md.replace(/<ul>([\s\S]*?)<\/ul>/gi, (_, content) => {
    const items = content.match(/<li>([\s\S]*?)<\/li>/gi) || [];
    return items.map((item: string) => "- " + stripTags(item.replace(/<\/?li>/gi, "")).trim()).join("\n") + "\n";
  });

  md = md.replace(/<ol>([\s\S]*?)<\/ol>/gi, (_, content) => {
    const items = content.match(/<li>([\s\S]*?)<\/li>/gi) || [];
    return items.map((item: string, idx: number) => `${idx + 1}. ` + stripTags(item.replace(/<\/?li>/gi, "")).trim()).join("\n") + "\n";
  });

  // Images
  md = md.replace(/<img\s+[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img\s+[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");

  // Links
  md = md.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Bold
  md = md.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**");

  // Italic
  md = md.replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*");

  // Inline code
  md = md.replace(/<code>([\s\S]*?)<\/code>/gi, "`$1`");

  // Paragraphs
  md = md.replace(/<p>([\s\S]*?)<\/p>/gi, "$1\n");

  // Clean up remaining tags
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = stripTags(md);
  md = unescapeHtml(md);

  // Clean up multiple blank lines
  md = md.replace(/\n{3,}/g, "\n\n");

  return md.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(str: string): string {
  return str.replace(/<[^>]+>/g, "");
}

function detectDirection(input: string): "mdToHtml" | "htmlToMd" {
  return input.trim().startsWith("<") ? "htmlToMd" : "mdToHtml";
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const direction =
    (options?.direction as string) || detectDirection(trimmed);

  try {
    const output =
      direction === "mdToHtml" ? mdToHtml(trimmed) : htmlToMd(trimmed);

    return {
      output,
      stats: {
        lines: output.split("\n").length,
        characters: output.length,
      },
    };
  } catch {
    return { output: "" };
  }
}
