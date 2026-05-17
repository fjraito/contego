import Image from 'next/image'

export function Footer() {
  return (
    <footer>
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-col foot-brand">
            <Image src="/assets/contego-logo.png" alt="Contego" width={160} height={52} />
            <p>A prop firm marketing agency helping trading brands grow through SEO, social media, and AI UGC video built around trust, clarity, and qualified trader demand.</p>
          </div>
          <div className="foot-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">SEO</a></li>
              <li><a href="#services">Social media</a></li>
              <li><a href="#services">AI UGC video</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/#process">Process</a></li>
              <li><a href="/#pricing">Pricing</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">hello@contego.co</a></li>
              <li><a href="#">Twitter / X</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Contego. All rights reserved.</span>
          <div className="foot-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
