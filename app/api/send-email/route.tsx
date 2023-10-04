import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const email = await resend.emails.send({
    from: "...",
    to: "d.rotari@gmail.com",
    subject: "...",
    react: <WelcomeTemplate name="Denis" />,
  });

  return NextResponse.json(email);
}
