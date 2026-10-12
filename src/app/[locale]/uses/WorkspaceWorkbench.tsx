'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { workspaceInventory, type WorkspaceModuleId, type WorkspaceToolGroup } from '@/content/data/uses'
import styles from './uses.module.css'

type WorkspaceModule = { id: WorkspaceModuleId; label: string; groups: WorkspaceToolGroup[]; path: string; node: [number, number] }

const modules: WorkspaceModule[] = [
  {
    id: 'development', label: 'Development', groups: workspaceInventory.development,
    path: 'M 44 45 V 19 H 38', node: [38, 19],
  },
  {
    id: 'ai', label: 'AI & Agents', groups: workspaceInventory.ai,
    path: 'M 56 45 V 19 H 62', node: [62, 19],
  },
  {
    id: 'infrastructure', label: 'Infrastructure', groups: workspaceInventory.infrastructure,
    path: 'M 44 55 V 81 H 38', node: [38, 81],
  },
  {
    id: 'hardware', label: 'Hardware', groups: workspaceInventory.hardware,
    path: 'M 56 55 V 81 H 62', node: [62, 81],
  },
]

export function WorkspaceWorkbench() {
  const workbenchRef = useRef<HTMLElement>(null)
  const pendingScrollRef = useRef(false)
  const [selectedId, setSelectedId] = useState<WorkspaceModuleId>('development')
  const selected = modules.find((module) => module.id === selectedId) ?? modules[0]

  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return
    pendingScrollRef.current = false

    const frame = requestAnimationFrame(() => {
      const section = workbenchRef.current
      if (!section) return

      const navbarHeight = document.querySelector<HTMLElement>('.header-blur')?.getBoundingClientRect().height ?? 64
      const top = window.scrollY + section.getBoundingClientRect().top - navbarHeight - 24
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [selectedId])

  const button = (module: WorkspaceModule, className: string) => (
    <button
      key={module.id}
      type="button"
      className={className}
      aria-pressed={selectedId === module.id}
      aria-controls="workspace-detail"
      onClick={() => {
        if (module.id === selectedId) return
        pendingScrollRef.current = true
        setSelectedId(module.id)
      }}
    >
      <span className={styles.moduleName}>{module.label}</span>
      <span className={styles.moduleArrow} aria-hidden="true">↗</span>
    </button>
  )

  return (
    <section ref={workbenchRef} className={styles.workbench} aria-label="Interactive workbench">
      <div className={styles.workbenchTopline}>
        <span>Workbench</span>
        <span>Explore modules</span>
      </div>
      <div className={styles.workbenchLayout}>
        <div className={styles.diagram} aria-label="Workspace modules">
          <svg className={styles.connectors} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {modules.map((module) => (
              <g key={module.id} className={selectedId === module.id ? styles.activeConnector : undefined}>
                <path d={module.path} />
                <circle cx={module.node[0]} cy={module.node[1]} r="0.7" />
              </g>
            ))}
          </svg>
          <div className={styles.workspaceCore} aria-hidden="true">
            <span>Workspace</span>
            <small>Tools / systems / process</small>
          </div>
          {modules.map((module) => button(module, `${styles.diagramModule} ${styles[module.id]}`))}
        </div>

        <div className={styles.mobileModules} aria-label="Workspace modules">
          {modules.map((module) => button(module, styles.mobileModule))}
        </div>

        <div className={styles.detail} id="workspace-detail">
          <div className={styles.detailHeading}>
            <span>Active module</span>
            <h2>{selected.label}</h2>
          </div>
          <span className={styles.srOnly} role="status">Showing {selected.label} tools</span>
          <div className={styles.toolGroups}>
            {selected.groups.map((group) => (
              <section key={`${selected.id}-${group.label}`} className={styles.toolGroupSection}>
                <h3 className={styles.toolGroup}>{group.label}</h3>
                <ul className={styles.toolList}>
                  {group.tools.map((tool) => (
                    <li key={tool.name} className={styles.toolRow}>
                      <h4>{tool.name}</h4>
                      <p>{tool.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
