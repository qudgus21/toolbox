import Link from "next/link";

interface FooterServiceInfoProps {
  locale: string;
  labels: {
    company: string;
    about: string;
    contact: string;
    faq: string;
    privacy: string;
    terms: string;
  };
  blogTitle: string;
}

export function FooterServiceInfo({ locale, labels, blogTitle }: FooterServiceInfoProps) {
  const base = `/${locale}`;
  const linkClass = "text-xs text-foreground-muted hover:text-foreground transition-colors";

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-3">
        {labels.company}
      </p>
      <ul className="space-y-1.5">
        <li><Link href={`${base}/blog`} className={linkClass}>{blogTitle}</Link></li>
        <li><Link href={`${base}/about`} className={linkClass}>{labels.about}</Link></li>
        <li><Link href={`${base}/contact`} className={linkClass}>{labels.contact}</Link></li>
        <li><Link href={`${base}/faq`} className={linkClass}>{labels.faq}</Link></li>
        <li><Link href={`${base}/privacy`} className={linkClass}>{labels.privacy}</Link></li>
        <li><Link href={`${base}/terms`} className={linkClass}>{labels.terms}</Link></li>
      </ul>
    </div>
  );
}
