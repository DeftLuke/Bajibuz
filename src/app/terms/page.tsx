import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - DeshiSpin",
  description: "Read the Terms of Service for DeshiSpin.",
};

export default function TermsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-xl text-muted-foreground mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">1. Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Welcome to DeshiSpin ("Platform", "we", "us", "our"). These Terms of Service ("Terms") govern your use of our online gaming platform and services. By accessing or using DeshiSpin, you agree to be bound by these Terms.</p>
          <p>If you do not agree to these Terms, please do not use our Platform.</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">2. Eligibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>You must be at least 18 years old and a resident of Bangladesh to use DeshiSpin. By using our Platform, you represent and warrant that you meet these eligibility requirements.</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">3. Account Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>To access certain features of DeshiSpin, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
          <p>You are responsible for safeguarding your account password and for any activities or actions under your account. We encourage you to use a "strong" password (passwords that use a combination of upper and lower case letters, numbers and symbols) with your account.</p>
        </CardContent>
      </Card>
      
      {/* Add more sections as needed: Prohibited Conduct, Deposits and Withdrawals, Intellectual Property, Disclaimers, Limitation of Liability, Governing Law, Changes to Terms, Contact Information etc. */}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">X. Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>If you have any questions about these Terms, please contact us at support@deshispin.com.</p>
          <p className="italic mt-6">This is a placeholder document. For a real application, consult with a legal professional to draft comprehensive Terms of Service.</p>
        </CardContent>
      </Card>
    </div>
  );
}
