import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Link } from '@/components/link'
import { getCategories, getCategory } from '@/data'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  let { id } = await params
  let category = await getCategory(id)

  return {
    title: category && `Categoria #${category.id}`,
  }
}

export default async function Category({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let category = await getCategory(id)

  if (!category) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orcamento" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Categoria
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Categoria #{category.id}</Heading>
          <Badge color="lime">Concluída</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex gap-4">
            <Button color="rose">Remover</Button>
          </div>
        </div>
      </div>
      <div className="mt-12 max-w-xl">
        <Subheading>Dados</Subheading>
        <Divider className="mt-4" />
        <form action="">
          <DescriptionList>
            <DescriptionTerm>Nome</DescriptionTerm>
            <DescriptionDetails>
              <Input name="categoryName" defaultValue={category.name} />
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

