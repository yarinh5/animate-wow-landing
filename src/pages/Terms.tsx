import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="container px-4 py-16 max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לעמוד הראשי
          </Button>
        </Link>

        <h1 className="text-4xl font-display font-bold mb-8 text-gradient">תנאי שימוש</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">כללי</h2>
          <p>
            השימוש באתר זה כפוף לתנאי השימוש המפורטים להלן. 
            גלישה באתר מהווה הסכמה לתנאים אלה.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">זכויות יוצרים</h2>
          <p>
            כל התכנים באתר, לרבות טקסטים, עיצובים, גרפיקה וקוד, 
            הינם קניינו הבלעדי של ירין חזן ומוגנים בזכויות יוצרים.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">שימוש מותר</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>צפייה בתכני האתר לצרכים אישיים</li>
            <li>יצירת קשר דרך הטפסים המיועדים לכך</li>
            <li>שיתוף קישורים לאתר</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">שימוש אסור</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>העתקה או שכפול של תכני האתר ללא אישור</li>
            <li>שימוש מסחרי בתכנים ללא הסכמה בכתב</li>
            <li>ניסיון לפרוץ או לשבש את פעילות האתר</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">הגבלת אחריות</h2>
          <p>
            האתר והתכנים בו מוצעים "כמות שהם" (AS IS). 
            איננו אחראים לנזקים ישירים או עקיפים הנובעים מהשימוש באתר.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">שינויים בתנאים</h2>
          <p>
            אנו שומרים לעצמנו את הזכות לעדכן תנאים אלה מעת לעת. 
            המשך השימוש באתר לאחר עדכון מהווה הסכמה לתנאים המעודכנים.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">יצירת קשר</h2>
          <p>
            לשאלות בנושא תנאי השימוש: <a href="mailto:yarinhazan395@gmail.com" className="text-primary hover:underline">yarinhazan395@gmail.com</a>
          </p>

          <p className="text-sm mt-8">
            עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;