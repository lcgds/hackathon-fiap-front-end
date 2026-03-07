import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Select } from '@/components/select'
import { Strong, Text, TextLink } from '@/components/text'
import { getCategories } from '@/data'
import { MONEY } from '@/format'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export default async function Budget({ params }: { params: Promise<{ id: string }> }) {
  let categories = await getCategories()

  return (
    <form action="" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Heading>Orçamento</Heading>
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
        <Select name="categoryName" required>
          <option></option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>{category.name}</option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label>Valor</Label>
        <Input type="number" step="0.01" min="0.01" name="budgetAmount" />
      </Field>
      <Button type="submit" className="w-full">
        Salvar
      </Button>
    </form>
  )
}

