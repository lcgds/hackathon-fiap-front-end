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
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export default async function Category({ params }: { params: Promise<{ id: string }> }) {
  return (
    <form action="" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Field>
        <Label>Nome</Label>
        <Input name="categoryName" />
      </Field>
      <Button type="submit" className="w-full">
        Salvar
      </Button>
    </form>
  )
}

