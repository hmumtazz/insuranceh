export function Footer() {
  return (
    <footer className="border-t bg-neutral-50/60">
      <div
        id="resources"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-neutral-700 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8"
      >
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 font-bold text-white">
              R
            </span>
            <span className="font-semibold text-neutral-900">RateNextDoor</span>
          </div>
          <p className="max-w-xs text-neutral-600">
            Transparent home insurance pricing for every neighborhood.
          </p>
        </div>
        <FooterColumn
          title="Product"
          links={['Rate Map', 'Submit a Rate', 'Broker Network', 'Pricing']}
        />
        <FooterColumn title="Company" links={['About', 'Careers', 'Forum', 'Contact']} />
        <FooterColumn
          title="Resources"
          links={['Knowledge Base', 'Blog', 'Privacy', 'Terms']}
        />
      </div>
      <div className="border-t py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} RateNextDoor, Inc. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-2 font-medium text-neutral-900">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="transition hover:text-black">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
