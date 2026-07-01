import { site } from "@/lib/config";

export function Footer({ brand, rights }: { brand: string; rights: string }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <span className="fm">ID</span>
            <div>
              <div className="fn">{brand}</div>
              <div className="fa">{site.location.address}</div>
            </div>
          </div>
          <div className="foot-meta">
            © {new Date().getFullYear()} {brand}
            <br />
            {rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
