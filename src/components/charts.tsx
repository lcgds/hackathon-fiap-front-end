'use client'

import { MONEY } from '@/format.ts'
import { ArcElement, Chart, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register([ArcElement, Tooltip])

export function TransactionsChart({ data, labels, type }) {
  let dataset = {
    datasets: [
      {
        label: 'Total',
        data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(54, 255, 86)',
          'rgb(54, 30, 86)',
          'rgb(54, 162, 235)',
        ],
        borderColor: 'invisible',
        hoverOffset: 4,
      },
    ],
    labels,
  }
  let options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed !== null) {
              label += MONEY.format(context.parsed)
            }
            return label
          },
        },
      },
    },
  }

  return <Doughnut data={dataset} options={options} />
}
