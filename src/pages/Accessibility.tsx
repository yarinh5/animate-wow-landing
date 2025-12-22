import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="container px-4 py-16 max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לעמוד הראשי
          </Button>
        </Link>

        <h1 className="text-4xl font-display font-bold mb-8 text-gradient">הצהרת נגישות</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            אתר זה מחויב לספק חוויית גלישה נגישה לכלל המשתמשים, כולל אנשים עם מוגבלויות.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">מאמצי הנגישות שלנו</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>האתר נבנה בהתאם להנחיות WCAG 2.1 ברמה AA</li>
            <li>תמיכה בניווט באמצעות מקלדת</li>
            <li>תמיכה בקוראי מסך</li>
            <li>ניגודיות צבעים מספקת</li>
            <li>טקסט חלופי לתמונות</li>
            <li>מבנה כותרות היררכי ונכון</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">טכנולוגיות נגישות</h2>
          <p>
            האתר תומך בטכנולוגיות מסייעות כגון קוראי מסך (NVDA, JAWS, VoiceOver), 
            תוכנות הגדלה, וניווט באמצעות מקלדת בלבד.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">דפדפנים נתמכים</h2>
          <p>
            האתר תומך בגרסאות העדכניות של Chrome, Firefox, Safari ו-Edge.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">יצירת קשר בנושא נגישות</h2>
          <p>
            אם נתקלתם בבעיית נגישות באתר או שיש לכם הצעות לשיפור, 
            אנא צרו איתי קשר בכתובת: <a href="mailto:yarinhazan395@gmail.com" className="text-primary hover:underline">yarinhazan395@gmail.com</a>
          </p>

          <p className="text-sm mt-8">
            עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;