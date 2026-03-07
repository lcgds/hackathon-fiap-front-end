'use client'

import { Navbar, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { getEvents } from '@/data'
import {
  CalculatorIcon,
  HomeIcon,
  TagIcon,
  BanknotesIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>
  children: React.ReactNode
}) {
  let pathname = usePathname()

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <p>Finanças</p>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Página inicial</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/categorias" current={pathname.startsWith('/categorias')}>
                <TagIcon />
                <SidebarLabel>Categorias</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/transacoes" current={pathname.startsWith('/transacoes')}>
                <BanknotesIcon />
                <SidebarLabel>Transações</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/orcamento" current={pathname.startsWith('/orcamento')}>
                <CalculatorIcon />
                <SidebarLabel>Orçamento</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            
          </SidebarBody>

        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
