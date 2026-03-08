import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

export default async function Budget({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orcamento" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orçamentos
        </Link>
      </div>

      <form action="" method="POST" className="mt-4 grid w-full max-w-sm grid-cols-1 gap-8 lg:mt-8">
        <Heading>Registrar orçamento</Heading>
        <Field>
          <Label>Agência</Label>
          <Input name="agency" />
        </Field>
        <Field>
          <Label>Conta</Label>
          <Input name="account" />
        </Field>
        <Field>
          <Label>Categoria</Label>
          <Input name="category" />
        </Field>
        <Field>
          <Label>Valor</Label>
          <Input type="number" step="0.01" min="0.01" name="budgetAmount" />
        </Field>
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </>
  )
}
