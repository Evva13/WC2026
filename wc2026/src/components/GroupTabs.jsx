import { GROUPS } from '../data'

export default function GroupTabs({ active, onSelect, completedGroups = [] }) {
  return (
    <div className="grp-flex">
      {Object.keys(GROUPS).map(g => {
        const done = completedGroups.includes(g)
        return (
          <button
            key={g}
            className={`grp-btn${active === g ? ' active' : ''}${done ? ' done' : ''}`}
            onClick={() => onSelect(g)}
          >
            {g}{done && active !== g ? ' ✓' : ''}
          </button>
        )
      })}
    </div>
  )
}
