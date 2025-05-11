import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Landmark, Smartphone } from "lucide-react"; 

// For bKash, Nagad, Rocket, specific icons are usually SVGs or Images.
// Using Lucide Smartphone as a generic mobile wallet icon.
// In a real app, these would be Image components with actual logos.

const BkashIconPlaceholder = () => <span className="font-bold text-pink-600 mr-1">b</span>; // Highly simplified placeholder
const NagadIconPlaceholder = () => <span className="font-bold text-orange-500 mr-1">N</span>; // Highly simplified placeholder
const RocketIconPlaceholder = () => <span className="font-bold text-purple-600 mr-1">R</span>; // Highly simplified placeholder


const paymentMethods = [
  { id: "bkash", name: "bKash", IconComp: BkashIconPlaceholder, type: "মোবাইল ওয়ালেট (Mobile Wallet)" },
  { id: "nagad", name: "Nagad", IconComp: NagadIconPlaceholder, type: "মোবাইল ওয়ালেট (Mobile Wallet)" },
  { id: "rocket", name: "Rocket", IconComp: RocketIconPlaceholder, type: "মোবাইল ওয়ালেট (Mobile Wallet)" },
  { id: "bank", name: "ব্যাংক ট্রান্সফার (Bank Transfer)", IconComp: Landmark, type: "ব্যাংক (Bank)" },
];

export default function PaymentOptions() {
  return (
    <div className="space-y-3">
      <Label>পেমেন্ট মাধ্যম নির্বাচন করুন (Select Payment Method)</Label>
      <RadioGroup defaultValue="bkash" className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <Label
            key={method.id}
            htmlFor={method.id}
            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
          >
            <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
            <div className="flex items-center mb-1">
              <method.IconComp /> 
              <span className="font-semibold ml-1">{method.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{method.type}</span>
          </Label>
        ))}
      </RadioGroup>
       <p className="text-xs text-muted-foreground text-center pt-2">(প্রতীকী আইকন ব্যবহার করা হয়েছে)</p>
    </div>
  );
}
