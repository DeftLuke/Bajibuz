import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Responsible Gaming - DeshiSpin",
  description: "Learn about responsible gaming practices at DeshiSpin.",
};

export default function ResponsibleGamingPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <HeartHandshake className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Responsible Gaming</h1>
        <p className="text-xl text-muted-foreground mt-2">Play Smart. Play Safe. Enjoy the Game.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Our Commitment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>DeshiSpin is committed to promoting responsible gaming as a part of our customer care policy. We believe that gaming should be an enjoyable form of entertainment. For a small minority, however, gambling can stop being fun and can become a problem.</p>
          <p>We aim to provide a safe and supportive environment where players can manage their gaming habits responsibly.</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Understanding Problem Gambling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Problem gambling can affect anyone. It's important to recognize the signs. Ask yourself:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Do you spend more money or time gambling than you intend to?</li>
            <li>Do you chase losses?</li>
            <li>Has gambling caused problems in your personal or professional life?</li>
            <li>Do you feel restless or irritable when trying to cut down on gambling?</li>
          </ul>
          <p>If you answered yes to any of these, you might benefit from seeking help.</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Tools to Help You Play Responsibly</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>DeshiSpin offers several tools to help you stay in control:</p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Deposit Limits:</strong> Set daily, weekly, or monthly limits on how much you can deposit.</li>
            <li><strong>Session Reminders:</strong> Get notified about how long you've been playing.</li>
            <li><strong>Self-Exclusion:</strong> Take a break from gaming for a set period or permanently.</li>
            <li><strong>Account History:</strong> Track your gaming activity, deposits, and withdrawals.</li>
          </ul>
          <p>You can access these tools in your <Link href="/dashboard" className="text-primary hover:underline">dashboard settings</Link> or by contacting our support team.</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-destructive/10 border-destructive/30">
        <CardHeader className="flex flex-row items-center">
            <AlertTriangle className="h-8 w-8 text-destructive mr-4" />
            <CardTitle className="text-2xl text-destructive-foreground">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-destructive-foreground/80">
          <p>If you feel that gambling is negatively impacting your life, confidential help and support are available. Please consider reaching out to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Local support groups in Bangladesh (placeholder - real resources would be listed here).</li>
            <li>International helplines like Gamblers Anonymous.</li>
          </ul>
          <p className="font-semibold">Remember, you are not alone, and help is available.</p>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground mt-12">
        For more information or assistance, please contact our support team via the <Link href="/support" className="text-primary hover:underline">Support Page</Link>.
      </p>
    </div>
  );
}
