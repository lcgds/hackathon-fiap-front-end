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

export default async function Transaction({ params }: { params: Promise<{ id: string }> }) {
  let categories = await getCategories()

  return (
    <form action="" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Heading>Transação</Heading>
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
            <option value={category.id} key={category.id}>{category.name}</option>
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
  )
}

