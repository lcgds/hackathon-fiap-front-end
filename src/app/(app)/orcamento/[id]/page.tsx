import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { budgetService } from '@/services/budgetService'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  let { id } = await params
  let budgets = await budgetService.getBudgetList()
  let budget = budgets.find((b) => b.id === Number(id))

  return {
    title: budget && `Orçamento #${budget.id}`,
  }
}

export default async function Budget({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let budgets = await budgetService.getBudgetList()
  let budget = budgets.find((b) => b.id === Number(id))

  if (!budget) {
    notFound()
  }

  async function updateBudget(formData: FormData) {
      'use server'
  
      const data = await budgetService.updateBudget(
        Number(id),
        String(formData.get('category_name')),
        Number(formData.get('budget_amount'))
      );
  
      revalidatePath('/orcamento');
      redirect('/orcamento');
  }

  async function deleteBudget(formData: FormData) {
      'use server'
  
      const data = await budgetService.deleteBudget(
        Number(id)
      );
  
      revalidatePath('/orcamento');
      redirect('/orcamento');
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orcamento" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orçamentos
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Orçamento #{budget.id}</Heading>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex gap-4">
            <form action={deleteBudget}>
              <Button color="red" type="submit">
                <TrashIcon />
                Remover
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-12 max-w-xl">
        <Subheading>Dados</Subheading>
        <Divider className="mt-4" />
        <form action={updateBudget} className="grid w-full grid-cols-1 gap-8">
          <DescriptionList>
            <DescriptionTerm>Agência</DescriptionTerm>
            <DescriptionDetails>
              <Input name="agency" defaultValue={process.env.NEXT_PUBLIC_AGENCY} disabled />
            </DescriptionDetails>
            <DescriptionTerm>Conta</DescriptionTerm>
            <DescriptionDetails>
              <Input name="account" defaultValue={process.env.NEXT_PUBLIC_AGENCY} disabled />
            </DescriptionDetails>
            <DescriptionTerm>Categoria</DescriptionTerm>
            <DescriptionDetails>
              <Input name="category_name" defaultValue={budget.category_name} required />
            </DescriptionDetails>
            <DescriptionTerm>Valor de Orçamento</DescriptionTerm>
            <DescriptionDetails>
              <Input type="number" step="0.01" min="0.01" name="budget_amount" defaultValue={budget.budget_amount} />
            </DescriptionDetails>
          </DescriptionList>
          <Button type="submit" className="w-full">
            Salvar
          </Button>
        </form>
      </div>
    </>
  )
}
