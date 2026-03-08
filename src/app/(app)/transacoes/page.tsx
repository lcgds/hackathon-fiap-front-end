import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getTransactions } from '@/data'
import { MONEY } from '@/format'
import { PlusIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transações',
}

export default async function Transactions() {
  let transactions = await getTransactions()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Transações</Heading>
        <Button color="green" className="-my-0.5" href="/transacoes/criar">
          <PlusIcon />
          Registrar transação
        </Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
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
            <TableRow
              key={transaction.id}
              href={`/transacoes/${transaction.id}`}
              title={`Transação #${transaction.id}`}
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell className="text-zinc-500">{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
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
