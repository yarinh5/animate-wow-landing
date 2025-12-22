import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-display font-bold text-gradient">
            YH
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>נבנה עם</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>על ידי יארין חזן</span>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
