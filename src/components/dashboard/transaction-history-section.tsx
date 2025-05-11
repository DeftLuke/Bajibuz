import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Placeholder data
const transactions = [
  { id: "txn_1", date: "2023-10-26", type: "Deposit", method: "bKash", amount: 500, currency: "BDT", status: "Completed" },
  { id: "txn_2", date: "2023-10-25", type: "Withdrawal", method: "Nagad", amount: 200, currency: "BDT", status: "Pending" },
  { id: "txn_3", date: "2023-10-24", type: "Game Win", method: "Crazy Time", amount: 150, currency: "BDT", status: "Completed" },
  { id: "txn_4", date: "2023-10-23", type: "Game Bet", method: "Roulette", amount: -50, currency: "BDT", status: "Completed" },
  { id: "txn_5", date: "2023-10-22", type: "Deposit", method: "Rocket", amount: 1000, currency: "BDT", status: "Failed" },
  { id: "txn_6", date: "2023-10-21", type: "Bonus", method: "Welcome Bonus", amount: 100, currency: "BDT", status: "Completed" },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed": return "default"; // Will use primary color
    case "pending": return "secondary";
    case "failed": return "destructive";
    default: return "outline";
  }
};


export default function TransactionHistorySection() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Transaction History</CardTitle>
        <CardDescription>View all your past deposits, withdrawals, and game activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border border-border">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-primary' : 'text-destructive'}`}>
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {transaction.currency}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(transaction.status) as any} className="capitalize">
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No transactions found.
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
