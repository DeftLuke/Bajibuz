
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/language-context";

// Placeholder data
const transactionsData = [
  { id: "txn_1", date: "2023-10-26", typeEn: "Deposit", typeBn: "জমা", methodEn: "bKash", methodBn: "বিকাশ", amount: 500, currency: "BDT", statusEn: "Completed", statusBn: "সম্পন্ন" },
  { id: "txn_2", date: "2023-10-25", typeEn: "Withdrawal", typeBn: "উত্তোলন", methodEn: "Nagad", methodBn: "নগদ", amount: 200, currency: "BDT", statusEn: "Pending", statusBn: "অমীমাংসিত" },
  { id: "txn_3", date: "2023-10-24", typeEn: "Game Win", typeBn: "গেম জয়", methodEn: "Crazy Time", methodBn: "ক্রেজি টাইম", amount: 150, currency: "BDT", statusEn: "Completed", statusBn: "সম্পন্ন" },
  { id: "txn_4", date: "2023-10-23", typeEn: "Game Bet", typeBn: "গেম বাজি", methodEn: "Roulette", methodBn: "রুলেট", amount: -50, currency: "BDT", statusEn: "Completed", statusBn: "সম্পন্ন" },
  { id: "txn_5", date: "2023-10-22", typeEn: "Deposit", typeBn: "জমা", methodEn: "Rocket", methodBn: "রকেট", amount: 1000, currency: "BDT", statusEn: "Failed", statusBn: "ব্যর্থ" },
  { id: "txn_6", date: "2023-10-21", typeEn: "Bonus", typeBn: "বোনাস", methodEn: "Welcome Bonus", methodBn: "স্বাগতম বোনাস", amount: 100, currency: "BDT", statusEn: "Completed", statusBn: "সম্পন্ন" },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed": 
    case "সম্পন্ন":
      return "default";
    case "pending": 
    case "অমীমাংসিত":
      return "secondary";
    case "failed": 
    case "ব্যর্থ":
      return "destructive";
    default: return "outline";
  }
};


export default function TransactionHistorySection() {
  const { language } = useLanguage();

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">
          {language === 'bn' ? 'লেনদেনের ইতিহাস' : 'Transaction History'}
        </CardTitle>
        <CardDescription>
          {language === 'bn' ? 'আপনার অতীতের সমস্ত জমা, উত্তোলন এবং গেমের কার্যকলাপ দেখুন।' : 'View all your past deposits, withdrawals, and game activities.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border border-border">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>{language === 'bn' ? 'তারিখ' : 'Date'}</TableHead>
                <TableHead>{language === 'bn' ? 'ধরন' : 'Type'}</TableHead>
                <TableHead>{language === 'bn' ? 'বিবরণ' : 'Details'}</TableHead>
                <TableHead className="text-right">{language === 'bn' ? 'পরিমাণ' : 'Amount'}</TableHead>
                <TableHead className="text-center">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{language === 'bn' ? transaction.typeBn : transaction.typeEn}</TableCell>
                  <TableCell>{language === 'bn' ? transaction.methodBn : transaction.methodEn}</TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-primary' : 'text-destructive'}`}>
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} {transaction.currency}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(language === 'bn' ? transaction.statusBn : transaction.statusEn) as any} className="capitalize">
                      {language === 'bn' ? transaction.statusBn : transaction.statusEn}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {transactionsData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {language === 'bn' ? 'কোনো লেনদেন পাওয়া যায়নি।' : 'No transactions found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
