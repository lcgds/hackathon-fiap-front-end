import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { TransactionsChart } from '@/components/charts'
import { Heading, Subheading } from '@/components/heading'
import { Text } from '@/components/text'
import { getRecentTransactions, getTransactionsGroupByCategory } from '@/data'

export default async function Home() {
  const transactions = await getRecentTransactions()
  const transactionsByCategory = await getTransactionsGroupByCategory()

  return (
    <>
      <Heading>Finanças com IA</Heading>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
          <div className="relative lg:col-span-6">
            <div className="absolute inset-0 rounded-lg max-lg:rounded-t-4xl lg:rounded-t-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-t-4xl lg:rounded-t-4xl">
              <div className="mx-auto flex flex-col p-10">
                <div className="mr-4 flex shrink-0 flex-row gap-x-2">
                  <Avatar initials="ia" className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black" />{' '}
                  <Subheading>Conselho financeiro</Subheading>
                </div>
                <div>
                  <Text className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta vehicula ipsum sed faucibus.
                    Etiam tempor hendrerit odio sed hendrerit. Curabitur molestie condimentum enim, ac dapibus mauris
                    blandit non. Fusce viverra ipsum sed sapien auctor quam.
                  </Text>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-t-4xl dark:outline-white/15"></div>
          </div>

          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg max-lg:rounded-bl-4xl lg:rounded-bl-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-bl-4xl lg:rounded-bl-4xl">
              <div className="p-10 pt-4">
                <Subheading>Gastos por categoria</Subheading>
              </div>
              <div className="align-center flex h-96 justify-center pb-6">
                <TransactionsChart
                  data={transactionsByCategory.data}
                  labels={transactionsByCategory.labels}
                  type={'category'}
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:outline-white/15"></div>
          </div>

          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg lg:rounded-br-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-br-4xl">
              <div className="p-10 pt-4">
                <Subheading>Gastos por dia</Subheading>
              </div>
              <div className="flex h-full items-center justify-center pb-6">
                <Badge color="yellow">Em construção</Badge>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-br-4xl dark:outline-white/15"></div>
          </div>
        </div>
      </div>
    </>
  )
}
