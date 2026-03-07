import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getCategories } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categorias',
}

export default async function Categories() {
  let categories = await getCategories()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Categoria</Heading>
        <Button className="-my-0.5" href="/categorias/criar">Criar categoria</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Código</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Nome</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} href={`/categorias/${category.id}`} title={`Categoria #${category.id}`}>
              <TableCell>{category.id}</TableCell>
              <TableCell className="text-zinc-500">{category.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{category.name}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
