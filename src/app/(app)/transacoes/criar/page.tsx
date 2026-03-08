import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { getCategories } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

export default async function Transaction({ params }: { params: Promise<{ id: string }> }) {
  let categories = await getCategories()

  return (
    <>
      <Link href="/transacoes" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
        <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        Transações
      </Link>
      <form action="" method="POST" className="mt-4 grid w-full max-w-sm grid-cols-1 gap-8 lg:mt-8">
        <Heading>Registrar transação</Heading>
        <Field>
          <Label>CPF</Label>
          <Input name="cpf" />
        </Field>
        <Field>
          <Label>Agência</Label>
          <Input name="agency" />
        </Field>
        <Field>
          <Label>Conta</Label>
          <Input name="account" />
        </Field>
        <Field>
          <Label>Descrição</Label>
          <Input name="entryName" />
        </Field>
        <Field>
          <Label>Tipo de transação</Label>
          <Select name="entryType" required>
            <option></option>
            <option>Débito</option>
            <option>Crédito</option>
          </Select>
        </Field>
        <Field>
          <Label>Categoria</Label>
          <Select name="categoryName" required>
            <option></option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Valor</Label>
          <Input type="number" step="0.01" min="0.01" name="amount" />
        </Field>
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </>
  )
}
