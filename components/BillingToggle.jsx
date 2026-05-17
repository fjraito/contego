'use client'

export function BillingToggle({ billing, setBilling }) {
  const isQuarterly = billing === 'quarterly'
  const left = isQuarterly ? 'calc(50% + 1px)' : '5px'
  const width = 'calc(50% - 6px)'

  return (
    <div className="billing-toggle" role="tablist" aria-label="Billing cycle">
      <span className="billing-slider" style={{ left, width }} />
      <button
        role="tab"
        className={billing === 'monthly' ? 'active' : ''}
        onClick={() => setBilling('monthly')}
      >
        Monthly
      </button>
      <button
        role="tab"
        className={billing === 'quarterly' ? 'active' : ''}
        onClick={() => setBilling('quarterly')}
      >
        Quarterly <span className="save-chip">Save 15%</span>
      </button>
    </div>
  )
}
