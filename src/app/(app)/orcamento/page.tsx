import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getBudgetList } from '@/data'
import { MONEY } from '@/format'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orçamento',
}

export default async function BudgetList() {
  let budgetList = await getBudgetList()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Orçamento</Heading>
        <Button className="-my-0.5" href="/orcamento/criar">Criar orçamento</Button>
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
          {budgetList.map((budget) => (
            <TableRow key={budget.id} href={`/orcamento/${budget.id}`} title={`Orçamento #${budget.id}`}>
              <TableCell>{budget.id}</TableCell>
              <TableCell className="text-zinc-500">{budget.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{budget.category.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{MONEY.format(budget.budgetAmount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
