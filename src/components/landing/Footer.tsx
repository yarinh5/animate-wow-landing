import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-3xl font-display font-bold text-gradient mb-4">
              YH
            </div>
            <p className="text-sm text-muted-foreground">
              פיתוח אתרים, דפי נחיתה ואוטומציות
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">שירותים</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">אודות</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">תיק עבודות</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">צור קשר</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">מידע משפטי</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/accessibility" className="hover:text-primary transition-colors">הצהרת נגישות</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">מדיניות פרטיות</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">תנאי שימוש</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ירין חזן. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
};

export default Footer;