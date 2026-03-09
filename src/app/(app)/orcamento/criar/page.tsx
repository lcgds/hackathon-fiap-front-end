import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { budgetService } from '@/services/budgetService'

export default async function Budget({ params }: { params: Promise<{ id: string }> }) {

  async function createBudget(formData: FormData) {
      'use server'
  
      const data = await budgetService.createBudget(
        String(formData.get('category_name')),
        Number(formData.get('budget_amount'))
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

      <form action={createBudget} className="mt-4 grid w-full max-w-sm grid-cols-1 gap-8 lg:mt-8">
        <Heading>Registrar orçamento</Heading>
        <Field>
          <Label>Agência</Label>
          <Input name="agency" defaultValue={process.env.NEXT_PUBLIC_AGENCY} disabled/>
        </Field>
        <Field>
          <Label>Conta</Label>
          <Input name="account" defaultValue={process.env.NEXT_PUBLIC_ACCOUNT} disabled/>
        </Field>
        <Field>
          <Label>Categoria</Label>
          <Input name="category_name" required/>
        </Field>
        <Field>
          <Label>Valor para Orçamento</Label>
          <Input type="number" step="0.01" min="0.01" name="budget_amount" required/>
        </Field>
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </>
  )
}
