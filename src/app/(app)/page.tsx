import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { TransactionsChart } from '@/components/charts'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentTransactions, getTransactions, getTransactionsGroupByCategory } from '@/data'
import { MONEY } from '@/format'

export default async function Home() {
  let transactions = await getRecentTransactions()
  let transactionsByCategory = await getTransactionsGroupByCategory()

  return (
    <>
      <Heading>Boa tarde, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Visão geral</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Última semana</option>
            <option value="last_two">Últimas duas semanas</option>
            <option value="last_month">Último mês</option>
            <option value="last_quarter">Último trimestre</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>
      <div className="mt-16 h-[255px] flex align-center justify-center">
        <TransactionsChart data={transactionsByCategory.data} labels={transactionsByCategory.labels} />
      </div>
      <Subheading className="mt-14">Transações recentes</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Código</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Categoria</TableHeader>
            <TableHeader className="text-right">Valor</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} href={`/transacoes/${transaction.id}`} title={`Transação #${transaction.id}`}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell className="text-zinc-500">{transaction.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{transaction.category.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{MONEY.format(transaction.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
