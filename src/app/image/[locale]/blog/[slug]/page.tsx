import { redirect } from "next/navigation";

export default async function BlogArticleRedirect({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  redirect(`/${locale}/blog/${slug}`);
}
