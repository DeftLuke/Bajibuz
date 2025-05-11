import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone } from "lucide-react"; // Using generic icons
import Image from "next/image";

// Placeholder simple SVG icons if specific ones are not available or too complex
const BkashIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
); // This is a generic placeholder icon

const paymentMethods = [
  { id: "bkash", name: "bKash", icon: BkashIcon, type: "Mobile Wallet" },
  { id: "nagad", name: "Nagad", icon: BkashIcon, type: "Mobile Wallet" }, // Using same placeholder
  { id: "rocket", name: "Rocket", icon: BkashIcon, type: "Mobile Wallet" }, // Using same placeholder
  { id: "bank", name: "Bank Transfer", icon: CreditCard, type: "Bank" },
];

export default function PaymentOptions() {
  return (
    <div className="space-y-3">
      <Label>Select Payment Method</Label>
      <RadioGroup defaultValue="bkash" className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <Label
            key={method.id}
            htmlFor={method.id}
            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&amp;:has([data-state=checked])]:border-primary cursor-pointer transition-all"
          >
            <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
            <div className="flex items-center mb-1">
              <method.icon />
              <span className="font-semibold">{method.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{method.type}</span>
          </Label>
        ))}
      </RadioGroup>
       {/* Placeholder for image logos - use with caution due to sizing and availability */}
       {/* This is an example if you had actual logo images in /public */}
       {/* 
       <div className="flex space-x-2 mt-2 justify-center">
         <Image src="/path-to-bkash-logo.png" alt="bKash" width={40} height={40} data-ai-hint="bKash logo" />
         <Image src="/path-to-nagad-logo.png" alt="Nagad" width={40} height={40} data-ai-hint="Nagad logo" />
         <Image src="/path-to-rocket-logo.png" alt="Rocket" width={40} height={40} data-ai-hint="Rocket logo" />
       </div>
       */}
    </div>
  );
}
