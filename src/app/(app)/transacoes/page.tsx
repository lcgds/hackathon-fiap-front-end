import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { MONEY } from '@/format'
import { PlusIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { entryService } from '@/services/entryService'

export const metadata: Metadata = {
  title: 'Transações',
}

export default async function Transactions() {
  let transactions = await entryService.getEntries();
  transactions = transactions.sort((a, b) => {
    const dateA = new Date(a.entry_ts)
    const dateB = new Date(b.entry_ts)

    return dateA - dateB
  })

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
              <TableCell className="text-zinc-500">{new Date(transaction.entry_ts).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{transaction.category}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{MONEY.format(transaction.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
