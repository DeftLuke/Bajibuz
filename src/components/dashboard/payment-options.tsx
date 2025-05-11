
"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Landmark } from "lucide-react"; 
import { useLanguage } from "@/context/language-context";

const BkashIconPlaceholder = () => <span className="font-bold text-pink-600 mr-1">b</span>;
const NagadIconPlaceholder = () => <span className="font-bold text-orange-500 mr-1">N</span>;
const RocketIconPlaceholder = () => <span className="font-bold text-purple-600 mr-1">R</span>;

const paymentMethodsData = [
  { id: "bkash", nameEn: "bKash", nameBn: "বিকাশ", IconComp: BkashIconPlaceholder, typeEn: "Mobile Wallet", typeBn: "মোবাইল ওয়ালেট" },
  { id: "nagad", nameEn: "Nagad", nameBn: "নগদ", IconComp: NagadIconPlaceholder, typeEn: "Mobile Wallet", typeBn: "মোবাইল ওয়ালেট" },
  { id: "rocket", nameEn: "Rocket", nameBn: "রকেট", IconComp: RocketIconPlaceholder, typeEn: "Mobile Wallet", typeBn: "মোবাইল ওয়ালেট" },
  { id: "bank", nameEn: "Bank Transfer", nameBn: "ব্যাংক ট্রান্সফার", IconComp: Landmark, typeEn: "Bank", typeBn: "ব্যাংক" },
];

export default function PaymentOptions() {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      <Label>
        {language === 'bn' ? 'পেমেন্ট মাধ্যম নির্বাচন করুন' : 'Select Payment Method'}
      </Label>
      <RadioGroup defaultValue="bkash" className="grid grid-cols-2 gap-3">
        {paymentMethodsData.map((method) => (
          <Label
            key={method.id}
            htmlFor={method.id}
            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
          >
            <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
            <div className="flex items-center mb-1">
              <method.IconComp /> 
              <span className="font-semibold ml-1">
                {language === 'bn' ? method.nameBn : method.nameEn}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {language === 'bn' ? method.typeBn : method.typeEn}
            </span>
          </Label>
        ))}
      </RadioGroup>
       <p className="text-xs text-muted-foreground text-center pt-2">
         {language === 'bn' ? '(প্রতীকী আইকন ব্যবহার করা হয়েছে)' : '(Symbolic icons used)'}
       </p>
    </div>
  );
}
