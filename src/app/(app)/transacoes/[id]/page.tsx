import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { getCategories, getTransaction } from '@/data'
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  let { id } = await params
  let transaction = await getTransaction(id)

  return {
    title: transaction && `Transação #${transaction.id}`,
  }
}

export default async function Transaction({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let transaction = await getTransaction(id)

  if (!transaction) {
    notFound()
  }

  let categories = await getCategories()

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
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex gap-4">
            <Button color="red">
              <TrashIcon />
              Remover
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 max-w-xl">
        <Subheading>Dados</Subheading>
        <Divider className="mt-4" />
        <form action="" className="grid w-full grid-cols-1 gap-8">
          <DescriptionList>
            <DescriptionTerm>CPF</DescriptionTerm>
            <DescriptionDetails>
              <Input name="cpf" disabled />
            </DescriptionDetails>
            <DescriptionTerm>Agência</DescriptionTerm>
            <DescriptionDetails>
              <Input name="agency" disabled />
            </DescriptionDetails>
            <DescriptionTerm>Conta</DescriptionTerm>
            <DescriptionDetails>
              <Input name="account" disabled />
            </DescriptionDetails>
            <DescriptionTerm>Descrição</DescriptionTerm>
            <DescriptionDetails>
              <Input name="entryName" disabled />
            </DescriptionDetails>
            <DescriptionTerm>Tipo da transação</DescriptionTerm>
            <DescriptionDetails>
              <Select name="entryType" disabled>
                <option></option>
                <option>Débido</option>
                <option>Crédito</option>
              </Select>
            </DescriptionDetails>
            <DescriptionTerm>Categoria</DescriptionTerm>
            <DescriptionDetails>
              <Select name="categoryName" required>
                <option></option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </DescriptionDetails>
            <DescriptionTerm>Valor</DescriptionTerm>
            <DescriptionDetails>
              <Input type="number" step="0.01" min="0.01" name="amount" defaultValue={transaction.amount} disabled />
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
