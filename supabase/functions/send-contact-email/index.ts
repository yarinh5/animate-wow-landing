import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone });

    // Send email to owner
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["yarinhazan395@gmail.com"],
      subject: `פנייה חדשה מ-${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #00ffff; border-bottom: 2px solid #00ffff; padding-bottom: 10px;">פנייה חדשה מהאתר</h1>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>שם:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>אימייל:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>טלפון:</strong> ${phone}</p>
          </div>
          
          <h3 style="color: #333;">הודעה:</h3>
          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            הודעה זו נשלחה מטופס יצירת הקשר באתר
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
