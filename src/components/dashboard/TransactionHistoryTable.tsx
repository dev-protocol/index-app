import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'

import TransactionHistoryRow from './TransactionHistoryRow'

export interface TransactionHistoryItem {
  hash: string
  type: 'Send' | 'Receive'
  date: string
  from?: string
  to?: string
  value: number
  explorerUrl: string
}

interface TransactionHistoryTableProps {
  items: TransactionHistoryItem[]
}

const TransactionHistoryTable = ({ items }: TransactionHistoryTableProps) => {
  return (
    <Table colorScheme='whiteAlpha'>
      <TableHeader />
      <Tbody>
        {items.map((item) => (
          <TransactionHistoryRow key={item.hash} item={item} />
        ))}
      </Tbody>
    </Table>
  )
}

const TableHeader = () => (
  <Thead>
    <Tr>
      <Th>From</Th>
      <Th>To</Th>
      <Th>Transaction</Th>
      <Th>Action</Th>
      <Th></Th>
    </Tr>
  </Thead>
)

export default TransactionHistoryTable
