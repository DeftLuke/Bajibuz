import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - DeshiSpin",
  description: "Read the Privacy Policy for DeshiSpin.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">1. Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>DeshiSpin ("Platform", "we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online gaming platform and services.</p>
          <p>By using DeshiSpin, you consent to the data practices described in this policy.</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">2. Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>We may collect personal information that you provide directly to us, such as when you create an account, make a deposit, or contact customer support. This information may include:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Name, email address, phone number</li>
            <li>Date of birth, government-issued ID (for verification)</li>
            <li>Payment information (e.g., bKash, Nagad, Rocket details)</li>
            <li>Transaction history</li>
          </ul>
          <p>We also collect information automatically when you use our Platform, such as IP address, device information, browser type, and usage data.</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">3. How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Provide, operate, and maintain our Platform</li>
            <li>Process transactions and manage your account</li>
            <li>Improve, personalize, and expand our Platform</li>
            <li>Communicate with you, including for customer service and promotional purposes</li>
            <li>Comply with legal obligations and prevent fraud</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Add more sections as needed: Information Sharing, Data Security, Cookies and Tracking, Your Rights, Children's Privacy, Changes to Policy, Contact Information etc. */}
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">X. Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@deshispin.com.</p>
          <p className="italic mt-6">This is a placeholder document. For a real application, consult with a legal professional to draft a comprehensive Privacy Policy.</p>
        </CardContent>
      </Card>
    </div>
  );
}
