const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Assistente de Redes Sociais",
    url: siteUrl,
    description: "Plataforma de promocao de nome profissional com compliance, site e templates multicanal."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
