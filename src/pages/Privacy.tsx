import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="container px-4 py-16 max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לעמוד הראשי
          </Button>
        </Link>

        <h1 className="text-4xl font-display font-bold mb-8 text-gradient">מדיניות פרטיות</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">איסוף מידע</h2>
          <p>
            אנו אוספים מידע שאתם מספקים לנו ישירות דרך טופס יצירת הקשר באתר, 
            כולל שם, כתובת אימייל, מספר טלפון ותוכן ההודעה.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">שימוש במידע</h2>
          <p>המידע שנאסף משמש אותנו למטרות הבאות:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>יצירת קשר חוזרת בתגובה לפנייתכם</li>
            <li>מתן שירותים מותאמים אישית</li>
            <li>שיפור השירותים שלנו</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">שמירת המידע</h2>
          <p>
            המידע נשמר באופן מאובטח ואינו מועבר לצדדים שלישיים, 
            למעט במקרים הנדרשים על פי חוק.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">עוגיות (Cookies)</h2>
          <p>
            האתר עשוי להשתמש בעוגיות לצורך שיפור חוויית המשתמש. 
            ניתן לשלוט בהגדרות העוגיות דרך הדפדפן שלכם.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">זכויותיכם</h2>
          <p>
            על פי חוק הגנת הפרטיות, יש לכם זכות לבקש גישה למידע האישי שלכם, 
            לתקן אותו או למחוק אותו.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">יצירת קשר</h2>
          <p>
            לשאלות בנושא פרטיות, ניתן לפנות אלינו: <a href="mailto:yarinhazan395@gmail.com" className="text-primary hover:underline">yarinhazan395@gmail.com</a>
          </p>

          <p className="text-sm mt-8">
            עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;