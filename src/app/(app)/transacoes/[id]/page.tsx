import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { entryService } from '@/services/entryService'
import { budgetService } from '@/services/budgetService'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  let { id } = await params
  let transaction = await entryService.getEntryId(Number(id))

  return {
    title: transaction.entry_name && `Transação #${transaction.id}`,
  }
}

export default async function Transaction({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let transaction = await entryService.getEntryId(Number(id));

  if (!transaction) {
    notFound()
  }

  let budgets = await budgetService.getBudgetList();
  const selectedBudget = budgets.find((budget) => budget.category_name === transaction.category);
  const defaultCategoryId = selectedBudget ? selectedBudget.id : "";

  async function updateTransaction(formData: FormData) {
    'use server'
    const categoryId = Number(formData.get('category'));
    const category_name = String(budgets.find((budget) => budget.id === categoryId)?.category_name);

    const data = await entryService.updateEntryCategory(Number(id), category_name, transaction.entry_name, transaction.agency, transaction.account);

    revalidatePath('/transacoes');
    revalidatePath(`/transacoes/${id}`);
    redirect('/transacoes');
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/transacoes" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Transações
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Transação #{transaction.id}</Heading>
        </div>
      </div>
      <div className="mt-12 max-w-xl">
        <Subheading>Dados</Subheading>
        <Divider className="mt-4" />
        <form action={updateTransaction} className="grid w-full grid-cols-1 gap-8">
          <DescriptionList>
            <DescriptionTerm>CPF</DescriptionTerm>
            <DescriptionDetails>
              <Input name="cpf" defaultValue={transaction.cpf} disabled/>
            </DescriptionDetails>
            <DescriptionTerm>Agência</DescriptionTerm>
            <DescriptionDetails>
              <Input name="agency" defaultValue={transaction.agency} disabled />
            </DescriptionDetails>
            <DescriptionTerm>Conta</DescriptionTerm>
            <DescriptionDetails>
              <Input name="account" defaultValue={transaction.account} disabled />
            </DescriptionDetails>
            <DescriptionTerm>Descrição</DescriptionTerm>
            <DescriptionDetails>
              <Input name="entry_name" defaultValue={transaction.entry_name} disabled />
            </DescriptionDetails>
            <DescriptionTerm>Tipo da transação</DescriptionTerm>
            <DescriptionDetails>
              <Select name="entry_type" defaultValue={transaction.entry_type} disabled>
                <option></option>
                <option>DEBIT</option>
                <option>CREDIT</option>
              </Select>
            </DescriptionDetails>
            <DescriptionTerm>Categoria</DescriptionTerm>
            <DescriptionDetails>
              <Select name="category" defaultValue={defaultCategoryId} required>
                <option></option>
                {budgets.map((budget) => (
                  <option value={budget.id} key={budget.id}>
                    {budget.category_name}
                  </option>
                ))}
              </Select>
            </DescriptionDetails>
            <DescriptionTerm>Valor</DescriptionTerm>
            <DescriptionDetails>
              <Input type="number" step="0.01" min="0.01" name="amount" defaultValue={transaction.value} disabled />
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