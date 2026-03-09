import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { MONEY } from '@/format'
import { PlusIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { budgetService } from '@/services/budgetService'

export const metadata: Metadata = {
  title: 'Orçamentos',
}

export default async function BudgetList() {
  let budgetList = await budgetService.getBudgetList()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Orçamentos</Heading>
        <Button color="green" className="-my-0.5" href="/orcamento/criar">
          <PlusIcon />
          Registrar orçamento
        </Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Código</TableHeader>
            <TableHeader>Categoria</TableHeader>
            <TableHeader className="text-right">Orçado</TableHeader>
            <TableHeader className="text-right">Realizado</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetList.map((budget) => (
            <TableRow key={budget.id} href={`/orcamento/${budget.id}`} title={`Orçamento #${budget.id}`}>
              <TableCell>{budget.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{budget.category_name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{MONEY.format(budget.budget_amount)}</TableCell>
              <TableCell className="text-right">{MONEY.format(budget.actual_amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
