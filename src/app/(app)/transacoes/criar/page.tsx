import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { budgetService } from '@/services/budgetService'
import { entryService } from '@/services/entryService'

export default async function Transaction({ params }: { params: Promise<{ id: string }> }) {
  let budgets = await budgetService.getBudgetList();

  async function createTransaction(formData: FormData) {
    'use server'
    const categoryId = Number(formData.get('category'));
    const category_name = String(budgets.find((budget) => budget.id === categoryId)?.category_name);

    const data = await entryService.registerEntry(
      String(formData.get('cpf')),
      category_name,
      String(formData.get('entry_name')),
      String(formData.get('entry_type')),
      Number(formData.get('value')),
      String(formData.get('agency')),
      String(formData.get('account'))
    );

    revalidatePath('/transacoes');
    redirect('/transacoes');
  }

  return (
    <>
      <Link href="/transacoes" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
        <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        Transações
      </Link>
      <form action={createTransaction} className="mt-4 grid w-full max-w-sm grid-cols-1 gap-8 lg:mt-8">
        <Heading>Registrar transação</Heading>
        <Field>
          <Label>CPF</Label>
          <Input name="cpf" />
        </Field>
        <Field>
          <Label>Agência</Label>
          <Input name="agency" defaultValue={process.env.NEXT_PUBLIC_AGENCY} disabled/>
        </Field>
        <Field>
          <Label>Conta</Label>
          <Input name="account" defaultValue={process.env.NEXT_PUBLIC_ACCOUNT} disabled/>
        </Field>
        <Field>
          <Label>Descrição</Label>
          <Input name="entry_name" />
        </Field>
        <Field>
          <Label>Tipo de transação</Label>
          <Select name="entry_type" defaultValue="DEBIT" required>
            <option></option>
            <option>DEBIT</option>
            <option>CREDIT</option>
          </Select>
        </Field>
        <Field>
          <Label>Categoria</Label>
          <Select name="category">
            <option></option>
            {budgets.map((budget) => (
              <option value={budget.id} key={budget.id}>
                {budget.category_name}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Valor</Label>
          <Input type="number" step="0.01" min="0.01" name="value" />
        </Field>
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </>
  )
}
