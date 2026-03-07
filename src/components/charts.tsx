'use client'

import clsx from 'clsx'
import type React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip } from 'chart.js'
import { MONEY } from '@/format.ts'

Chart.register([ArcElement, Tooltip])

export function TransactionsChart({ data, labels }) {
  let dataset = {
    datasets: [{
      label: 'Total',
      data,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)',
        'rgb(54, 255, 86)',
        'rgb(54, 30, 86)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4,
    }],
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
          }
        }
      }
    }
  }

  return (
    <Pie data={dataset} options={options} />
  )
}
